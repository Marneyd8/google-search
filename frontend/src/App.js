import React, { useState } from "react";
import "./App.css";
import { downloadCsv, downloadJson } from "./utils/downloader";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="app">
      <h1 className="app__header">Google Search</h1>
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
      <div className="results__container">
        {results.map((result, index) => (
          <div key={index} className="result__item">
            <h2 className="result__title">{result.title}</h2>
            <a href={result.link} className="result__link">
              {result.link}
            </a>
          </div>
        ))}
      </div>
      <div className="buttons__container">
        <button onClick={() => downloadJson(results)} className="download">
          Stáhnout JSON
        </button>
        <button onClick={() => downloadCsv(results)} className="download">
          Stáhnout CSV
        </button>
      </div>
    </div>
  );
}

export default App;
