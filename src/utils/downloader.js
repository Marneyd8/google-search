// Utility function to clean text
const cleanText = (text) => text.replace(/[\r\n\t]/g, "").trim();

// Utility function to clean results
const cleanResults = (results) =>
  results.map(({ title, link }) => ({
    title: cleanText(title),
    link: cleanText(link),
  }));

// Function to create download
const createDownload = (content, mimeType, fileName) => {
  const dataStr = `data:${mimeType},${encodeURIComponent(content)}`;
  const anchor = document.createElement("a");
  anchor.href = dataStr;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

// JSON download function
export const downloadJson = (results) => {
  const content = JSON.stringify(cleanResults(results));
  createDownload(content, "application/json;charset=utf-8", "results.json");
};

// CSV download function
export const downloadCsv = (results) => {
  const cleanedResults = cleanResults(results);
  let csvContent = '\uFEFF"Title","Link"\n';

  cleanedResults.forEach((result) => {
    const escapedTitle = result.title.replace(/"/g, '""');
    const escapedLink = result.link.replace(/"/g, '""');
    csvContent += `"${escapedTitle}","${escapedLink}"\n`;
  });
  createDownload(csvContent, "text/csv;charset=utf-8", "results.csv");
};
