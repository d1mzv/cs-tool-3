// ./public/electron.js
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const parser = require("./parser");
const isDev = require("electron-is-dev");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

ipcMain.on("toMain", (event, request, input) => {
  console.log(request);
  let result = [];
  if (request === "getFiles") {
    // result = parser.getCfgFiles();
    const steam_path = "C:/Program Files (x86)/Steam/";
    const cfg_path =
      "steamapps/common/Counter-Strike Global Offensive/csgo/addons/sourcemod/data/practicemode/grenades/";
    const cfg_name = "de_dust2.cfg";
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
      result = newFiles;
    }
  }
  win.webContents.send("fromMain", result);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
