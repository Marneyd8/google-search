import React, { useState } from "react";
import "./App.css";
import DownloadButtons from "./components/DownloadButtons.tsx";
import ResultsList from "./components/ResultsList.tsx";
import SearchForm from "./components/SearchForm.tsx";

// Mock data to simulate API response when limits are reached
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
      console.log(query);
      const response = await fetch(`/search?q=${query}`);
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
      <SearchForm
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ResultsList results={results} />
      {isMock && (
        <p>Too many API calls, these are just mock data for testing</p>
      )}
      <DownloadButtons results={results} />
    </div>
  );
}

export default App;
