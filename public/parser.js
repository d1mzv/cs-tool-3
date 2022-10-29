// import { readFileSync, readdirSync, statSync } from "fs";

const fs = require("fs");

const steam_path = "C:/Program Files (x86)/Steam/";
const cfg_path =
  "steamapps/common/Counter-Strike Global Offensive/csgo/addons/sourcemod/data/practicemode/grenades/";
const cfg_name = "de_dust2.cfg";

function textToJson(steam_path, cfg_path, cfg_name) {
  let content = fs.readFileSync(steam_path + cfg_path + cfg_name).toString();
  console.log();
  content = content.replace(/\t/g, "");
  content = content.replace(/""/g, '":"');
  content = content.replace(/"\n{/g, '":\n{');
  content = content.replace(/}\n"/g, '},\n"');
  content = content.replace(/"\n"/g, '",\n"');
  content = "{" + content + "}";
  // console.log(content);
  // console.log(cfg_name);
  const obj = JSON.parse(content);
  const newObj = {};
  newObj.fileName = cfg_name;
  newObj.data = obj;
  let result = JSON.stringify(obj);
  return newObj;
}

// TODO avoid sorting
function jsonToText(json) {
  let text = JSON.stringify(json);
  text = text.substring(1, text.length - 1);
  text = text.replace(/}/g, "\n}\n");
  text = text.replace(/{/g, "\n{\n");
  text = text.replace(/","/g, '"\n"');
  text = text.replace(/":"/g, '"\t\t"');
  text = text.replace(/":/g, '"');
  text = text.replace(/,"/g, '"');
  let new_str = "";
  let tabs = "";
  for (var i = 0; i < text.length; i++) {
    new_str += text[i];
    if (text[i] === "{") {
      tabs += "\t";
    } else if (text[i] === "}") {
      tabs = tabs.slice(0, -1);
    }
    if (text[i] === "\n") {
      new_str += tabs;
    }
  }
  new_str = new_str.replace(/\t}/g, "}");
  return new_str;
}

function getCfgFiles(steam_path, cfg_path) {
  // const steam_path = "C:/Program Files (x86)/Steam/";
  // const cfg_path =
  //   "steamapps/common/Counter-Strike Global Offensive/csgo/addons/sourcemod/data/practicemode/grenades/";
  let files = fs.readdirSync(steam_path + cfg_path);
  files = files.filter((name) => name.includes(".cfg"));
  let newFiles = [];
  for (var i = 0; i < files.length; i++) {
    const { mtime } = fs.statSync(steam_path + cfg_path + files[i]);
    const now = mtime;
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    const str = dateLocal
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, "/")
      .replace("T", " ");
    newFiles.push([files[i], str]);
  }
  let json = { ...newFiles };
  let nadefiles = [];
  for (var f in newFiles) {
    console.log(newFiles[f][0]);
    nadefiles.push(textToJson(steam_path, cfg_path, newFiles[f][0]));
  }
  let json2 = { ...nadefiles };
  // let result2 = JSON.stringify(json);
  let result = {};
  result[1] = json;
  result[2] = json2;
  let result1 = JSON.stringify(result);
  return result1;
}

getCfgFiles(steam_path, cfg_path);

// let json = textToJson(steam_path, cfg_path, cfg_name);
// console.log(json);
// let text = jsonToText(json);
// console.log(text);

// console.log(getCfgFiles());

module.exports = { textToJson, jsonToText, getCfgFiles };
