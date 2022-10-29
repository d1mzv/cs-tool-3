import { Icon, Label, Menu, Table } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";

const steam_path = "C:/Program Files (x86)/Steam/";
const cfg_path =
  "steamapps/common/Counter-Strike Global Offensive/csgo/addons/sourcemod/data/practicemode/grenades/";
const cfg_name = "de_dust2.cfg";

function getTableData() {
  window.api.send("toMain", ["getFiles", steam_path, cfg_path]);
  window.api.receive("fromMain", (data) => {
    localStorage["data"] = data;
  });
  let data = localStorage["data"];
  let obj0 = JSON.parse(data);
  let obj = obj0[1];
  let lst = [];
  for (var key in obj) {
    lst.push({ name: obj[key][0], modified: obj[key][1] });
  }
  console.log(lst);
  return lst;
}
const tableData = getTableData();

function tableData2(itemId) {
  let text = localStorage["data3"];
  let obj2 = JSON.parse(text);
  console.log(obj2);
  let lst = [];
  for (var key2 in obj2) {
    lst.push(obj2[key2]);
  }
  console.log(lst);
  return lst;
}

function prepTableData2(itemId) {
  let data = localStorage["data"];
  let obj0 = JSON.parse(data);
  let obj = obj0[2];
  let obj3 = {};
  for (var key in obj) {
    // console.log(obj[key].fileName);
    if (obj[key].fileName === itemId) {
      obj3 = obj[key];
      // }
    }
  }
  // console.log(obj3);
  const dataArr = [];
  var arr = obj3["data"].Grenades["STEAM_1:0:573413937"];
  for (var key in arr) {
    if (arr.hasOwnProperty(key)) {
      if (key !== "name") {
        dataArr.push(arr[key]);
      }
    }
  }
  let json = { ...dataArr };
  let result = JSON.stringify(json);
  console.log(result);
  localStorage["data3"] = result;
}

// const text = tableData2();
// console.log(tableData2);

export function TableExamplePagination() {
  const [row, setRow] = useState("");
  function handleClick(itemId) {
    prepTableData2(itemId);
    setRow(itemId);
    // console.log(itemId);
  }

  return (
    <>
      <div className="Table">
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              {/* <Table.HeaderCell>#</Table.HeaderCell> */}
              <Table.HeaderCell>File Name</Table.HeaderCell>
              <Table.HeaderCell>Last Modified</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tableData.map((val, key) => {
              return (
                <Table.Row
                  className="Row1"
                  key={key}
                  positive
                  onClick={() => {
                    handleClick(val.name);
                  }}
                >
                  <Table.Cell>{val.name}</Table.Cell>
                  <Table.Cell>{val.modified}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <div className="Table">
        <TableExamplePagination2 selectedRow={row} />
      </div>
    </>
  );
}

export function TableExamplePagination2(selectedRow) {
  return (
    <DragDropContext>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData2().map((val, key) => {
            return (
              <Table.Row key={key}>
                <Table.Cell>{val.grenadeType}</Table.Cell>
                <Table.Cell>{val.name}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </DragDropContext>
  );
}
