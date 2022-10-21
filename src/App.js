import logo from "./smoke.webp";
import data from "./data/test.json";
import { TableExamplePagination } from "./table1";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Header-block">
          <div className="Header-block-1">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="Header-block-2">
            <p>Create Nade Practice Playlist</p>
          </div>
          <div className="Header-block-3">
            <Button inverted>Sync</Button>
          </div>
          <div className="Header-block-4">
            <Button primary inverted>
              Save
            </Button>
          </div>
        </div>
      </header>
      <TableExamplePagination />
    </div>
  );
}

export default App;
