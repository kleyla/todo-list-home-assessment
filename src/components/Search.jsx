import React from "react";

export const Search = ({ handleSearch, path, setPath }) => {
  return (
    <form onSubmit={handleSearch}>
      <div>
        <label htmlFor="path">Path</label>
        <input
          type="text"
          name="path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};
