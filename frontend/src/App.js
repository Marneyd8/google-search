import React, { useState } from "react";
import "./App.css";
import { downloadCsv, downloadJson } from "./utils/downloader";

// Google has a limit for number of API calls
const mockData = [
  { link: "http://example.com/1", title: "Mock Title 1" },
  { link: "http://example.com/2", title: "Mock Title 2" },
  { link: "http://example.com/3", title: "Mock Title 3" },
  { link: "http://example.com/4", title: "Mock Title 4" },
  { link: "http://example.com/5", title: "Mock Title 5" },
  { link: "http://example.com/6", title: "Mock Title 6" },
  { link: "http://example.com/7", title: "Mock Title 7" },
  { link: "http://example.com/8", title: "Mock Title 8" },
];

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMock, setIsMock] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
      console.log(response);
      if (response.status === 418) {
        setResults(mockData);
        setIsMock(true);
      } else {
        const data = await response.json();
        setResults(data);
        setIsMock(false);
      }
    } catch (error) {
      setError("An error occurred while fetching the data.");
    } finally {
      setLoading(false);
    }
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
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {results != null && results.length == 0 && <p>No search results</p>}
      <div className="results__container">
        {results != null &&
          results.map((result, index) => (
            <div key={index} className="result__item">
              <h2 className="result__title">{result.title}</h2>
              <a href={result.link} className="result__link">
                {result.link}
              </a>
            </div>
          ))}
      </div>
      {isMock && (
        <p>Too many API calls, these are just a mock data for testing</p>
      )}
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
