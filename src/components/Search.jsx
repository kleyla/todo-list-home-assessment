import React from "react";

export const Search = ({ handleSearch, path, setPath }) => {
  return (
    <form onSubmit={handleSearch} className="form-inline">
      <div className="mr-2">
        <label htmlFor="path" className="mr-2">
          Path
        </label>
        <input
          type="text"
          name="path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      </div>
      <button className="secondary" type="submit">
        Search
      </button>
    </form>
  );
};
