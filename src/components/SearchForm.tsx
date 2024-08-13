import React from "react";

const SearchForm = ({ query, setQuery, handleSearch }) => (
  <form className="search__form" onSubmit={handleSearch}>
    <label className="search__label">
      Klíčové slovo:
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search__input"
        placeholder="Enter search term..."
      />
    </label>
    <button type="submit" className="search__button">
      Vyhledat
    </button>
  </form>
);

export default SearchForm;
