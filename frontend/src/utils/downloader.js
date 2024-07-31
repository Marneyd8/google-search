export const downloadJson = (results) => {
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

export const downloadCsv = (results) => {
  let csvContent = "data:text/csv;charset=utf-8,";
  results.forEach((result) => {
    csvContent += `${result.title},${result.link}\n`;
  });
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", encodeURI(csvContent));
  downloadAnchorNode.setAttribute("download", "results.csv");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
