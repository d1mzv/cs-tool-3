import logo from './smoke.webp';
import data from './data/test.json';
import MUIDataTable from "mui-datatables";

const dataArr = [];
var arr = data.Grenades['STEAM_1:0:573413937']
for (var key in arr) {
  if (arr.hasOwnProperty(key)) {
    if (key !== "name") {
      dataArr.push([key, arr[key].grenadeType, arr[key].name]);
    }
  }
}
console.log(dataArr);
const columns = ["Key", "Type", "Name"];

const options = {
  filterType: "checkbox",
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Create and practice your Nades
        </p>
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Nade Playlist
        </a>
        <p></p>
        <MUIDataTable
          title={"Dust2"}
          data={dataArr}
          columns={columns}
          options={options}
        />
      </header>
    </div>
  );
}

export default App;
