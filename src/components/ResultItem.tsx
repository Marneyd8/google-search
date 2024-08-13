import React from "react";

const ResultItem = ({ result }) => (
  <div className="result__item">
    <h2 className="result__title">{result.title}</h2>
    <a href={result.link} className="result__link">
      {result.link}
    </a>
  </div>
);

export default ResultItem;
