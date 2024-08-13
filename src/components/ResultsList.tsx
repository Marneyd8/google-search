import React from "react";
import ResultItem from "./ResultItem.tsx";

const ResultsList = ({ results }) => (
  <div className="results__container">
    {results && results.length > 0 ? (
      results.map((result, index) => <ResultItem key={index} result={result} />)
    ) : (
      <p>No search results</p>
    )}
  </div>
);

export default ResultsList;
