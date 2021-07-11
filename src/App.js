import React, { useEffect, useState } from "react";
import { SkynetClient } from "skynet-js";
import { ContentRecordDAC } from "@skynetlabs/content-record-library";

import { Search } from "./components/Search";
import { Form } from "./components/Form";
import { Todo } from "./components/Todo";
import { Login } from "./components/Login";
import { useError } from "./hooks/useError";

import "./App.css";

const App = () => {
  const portal =
    window.location.hostname === "localhost" ? "https://siasky.net" : undefined;
  const client = new SkynetClient(portal);
  const contentRecord = new ContentRecordDAC();

  const dataDomain = "karen.hns";

  const [isLoading, setIsLoading] = useState(true);
  const [mySky, setMySky] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userId, setUserId] = useState(null);

  const [todo, setTodo] = useState({
    description: "",
    done: null,
    createdAt: null,
  });

  const [path, setPath] = useState("");
  const [todos, setTodos] = useState([]);

  const [error, setTimeoutError, setError] = useError();

  const handleInput = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const status = await mySky.requestLoginAccess();
      setIsLoggedIn(status);
      if (status) {
        setUserId(await mySky.userID());
      }
    } catch (error) {
      console.log(error);
      setError("Ups!, please try again");
      setTimeoutError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (todo.description === "") {
        setError("Please, description is empty");
        setTimeoutError();
        return;
      }
      setIsLoading(true);
      const currentDate = new Date();
      const { data, dataLink } = await mySky.setJSON(`${dataDomain}/${path}`, {
        todos: [...todos, { ...todo, createdAt: currentDate }],
      });

      setTodos(data.todos);

      setTodo({
        description: "",
        done: null,
        createdAt: null,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data, dataLink } = await mySky.getJSON(`${dataDomain}/${path}`);
      if (data?.todos) {
        setTodos(data.todos);
        setIsLoading(false);
        return;
      }
      setTodos([]);
      setIsLoading(false);
      setError("Nothing found");
      setTimeoutError();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (todo) => {
    try {
      setIsLoading(true);
      const allTodos = todos.filter((curretnTodo) => {
        if (curretnTodo !== todo) return curretnTodo;
      });
      await mySky.setJSON(`${dataDomain}/${path}`, {
        todos: allTodos,
      });
      setTodos(allTodos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await mySky.logout();
      setIsLoggedIn(false);
      setUserId("");
      setPath("");
      setTodos([]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        const mySky = await client.loadMySky(dataDomain);
        await mySky.loadDacs(contentRecord);
        const loggedIn = await mySky.checkLogin();
        // Add button action for login.
        setMySky(mySky);
        setIsLoggedIn(loggedIn);
        if (loggedIn) {
          setUserId(await mySky.userID());
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    init();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div className="container-app">
          {isLoggedIn ? (
            <>
              <div className="header-info">
                <div>
                  <h4>User ID:</h4>
                  <p>{userId}</p>
                </div>
                <button className="secondary" onClick={handleLogout}>
                  logout
                </button>
              </div>

              <main>
                <Search
                  handleSearch={handleSearch}
                  path={path}
                  setPath={setPath}
                />

                <div className="two-columns">
                  <Form
                    handleSubmit={handleSubmit}
                    handleInput={handleInput}
                    todo={todo}
                  />

                  <div className="list">
                    <h3>To Do</h3>
                    <ul>
                      {todos.map((todo) => (
                        <Todo
                          key={todo.createdAt}
                          todo={todo}
                          handleDelete={handleDelete}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
              </main>
            </>
          ) : (
            <Login handleLogin={handleLogin} />
          )}
          {error && (
            <div className="card-error">
              <p>{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
