import logo from "./smoke.webp";
import data from "./data/test.json";
import { TableExamplePagination } from "./table1";
import { useState, useEffect } from "react";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Create and practice your Nades</p>
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Nade Playlist
        </a>
        <p></p>
      </header>
      <TableExamplePagination />
    </div>
  );
}

export default App;
