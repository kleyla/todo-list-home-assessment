import React from "react";

export const Form = ({ handleSubmit, handleInput, todo }) => {
  return (
    <form onSubmit={handleSubmit} className="form-column">
      <div className="mb-4">
        <h4 className="mb-2">You can create a to do </h4>
        <label htmlFor="description" className="mr-2">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={todo.description}
          onChange={handleInput}
        />
      </div>

      <button className="primary" type="submit">
        Send
      </button>
    </form>
  );
};
