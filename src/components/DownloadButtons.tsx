import React from "react";
import { downloadCsv, downloadJson } from "../utils/downloader";

const DownloadButtons = ({ results }) => (
  <div className="buttons__container">
    <button onClick={() => downloadJson(results)} className="download">
      Stáhnout JSON
    </button>
    <button onClick={() => downloadCsv(results)} className="download">
      Stáhnout CSV
    </button>
  </div>
);

export default DownloadButtons;
