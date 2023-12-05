const path = require("path");
const pkg = require("../package.json");
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const { default: axios } = require("axios");

let newVersion = false;
let downloadUrl;

function updateChecker() {
  if(newVersion) {
    log(`New version already found ignoring check..........`)
    return;
  }

 axios(pkg.repositryApi, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}`
    }
  }).then((res) => {
    const tagName = res.name;
    const tagVersion = tagName.replace('v', "");

    if(pkg.version !== tagVersion) {

      const pkgVersions = pkg.version.split(".");
      const tagVersions = tagVersion.split(".");      

      for(let i = 0; i < pkgVersions.length; i++) {
        if(tagVersions[i] > pkgVersions[i]) {
          newVersion = true
          break;
        }
      }

      log(`Current Verions: ${pkg.version} New Version available: ${tagVersion}`)
    }

    if(newVersion) {
       res.assets.find(r => {
        const urlArr = r.browser_download_url.split(".");
        const ext = urlArr.pop();

        if(ext === 'deb') {
          downloadUrl = r.browser_download_url
        }
      })
      log('Sending response to UI');
      mainWindow.webContents.send('update_available');
    }
  })
}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    backgroundColor: "#050505",
    icon: __dirname + "/icon.png",
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
  });

  win.maximize();
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
app.on('ready', () => {
  setInterval(() => {
    updateChecker();
  }, 10 * 1000)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
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
