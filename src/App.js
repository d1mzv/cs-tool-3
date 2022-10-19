import logo from "./smoke.webp";
import data from "./data/test.json";
import Example from "./example";

function parseJson() {
  const dataArr = [];
  var arr = data.Grenades["STEAM_1:0:573413937"];
  for (var key in arr) {
    if (arr.hasOwnProperty(key)) {
      if (key !== "name") {
        dataArr.push([key, arr[key].grenadeType, arr[key].name]);
      }
    }
  }
  // console.log(dataArr);
  return dataArr;
}

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
        {/* <MUIDataTable
          title={"Dust2"}
          data={dataArr}
          columns={columns}
          options={options}
        /> */}
      </header>
      <Example />
    </div>
  );
}

export default App;
