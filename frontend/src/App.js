import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
    console.log(response);
    const data = await response.json();
    setResults(data);
    console.log(data);
  };

  const downloadJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(results));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "results.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const downloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    results.forEach((result) => {
      csvContent += `${result.title},${result.link},${result.snippet}\n`;
    });
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", encodeURI(csvContent));
    downloadAnchorNode.setAttribute("download", "results.csv");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="App">
      <h1>Google Search</h1>
      <form onSubmit={handleSearch}>
        <label>
          Klíčové slovo:
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </label>
        <button type="submit">Vyhledat</button>
      </form>
      <div id="results">
        {results.map((result, index) => (
          <div key={index}>
            <h2>
              <p>{result.title}</p>
            </h2>
            <a href={result.link}>{result.link}</a>
          </div>
        ))}
      </div>
      <button onClick={downloadJson}>Stáhnout JSON</button>
      <button onClick={downloadCsv}>Stáhnout CSV</button>
    </div>
  );
}

export default App;
