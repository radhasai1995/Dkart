const path = require("path");
const fs = require("fs");

const pkg = require("../package.json");
const { app, BrowserWindow } = require("electron");
const { log } = require('electron-log');
const isDev = require("electron-is-dev");
const { default: axios } = require("axios");
const { spawnSync } = require("child_process");
const { ipcMain } = require("electron");

let newVersion = false;
let downloadUrl;
let mainWindow;

function updateChecker() {
  if(newVersion) {
    log(`New version already found ignoring check..........`)
    return;
  }

 axios(pkg.repositoryApi, {
    headers: {
      Authorization: `Bearer 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`
    }
  }).then(res => res.data).then((res) => {
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
function spawnSyncLog(cmd, args = [], env = {}) {
  log(`Executing: ${cmd} with args: ${args}`)
  const response = spawnSync(cmd, args, {
    env: { ...process.env, ...env },
    encoding: "utf-8",
    shell: true,
  })
  return response.stdout.trim()
}

function wrapSudo() {
  const name = pkg.name;
  const installComment = `${name} would like to update`
  const sudo = spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu")
  const command = [sudo]
  if (/kdesudo/i.test(sudo)) {
    command.push("--comment", installComment)
    command.push("-c")
  } else if (/gksudo/i.test(sudo)) {
    command.push("--message", installComment)
  } else if (/pkexec/i.test(sudo)) {
    command.push("--disable-internal-agent")
  }
  return command.join(" ")
}

ipcMain.on('downloadNInstall', async (event, message) => {
  console.log('=dfdfdf==', downloadUrl)
  const tempDir = app.getPath('temp'); // Get the system's temporary directory
  const tempFilePath = path.join(tempDir, 'elec_latest.deb'); // Create a unique file path
  try {
    const response = await axios({
      method: 'GET',
      url: downloadUrl,
      responseType: 'stream',
      onDownloadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        log(`Progress ${progress} of 100%`)
        event.sender.send('download-progress', progress);
      }
    });

    const writer = fs.createWriteStream(tempFilePath);
    response.data.pipe(writer);

    writer.on('finish', () => {
      event.sender.send('download-complete', tempFilePath);

      event.sender.send('update_downloaded')
      app.quit();
      doInstall(tempFilePath)
    });

  } catch (error) {
    event.sender.send('download-error', error.message);
  }
});

function doInstall(installerPath) {
  const sudo = wrapSudo()
    // pkexec doesn't want the command to be wrapped in " quotes
  const wrapper = /pkexec/i.test(sudo) ? "" : `"`
  const cmd = ["dpkg", "-i", installerPath, "||", "apt-get", "install", "-f", "-y"]
  spawnSyncLog(sudo, [`${wrapper}/bin/bash, "-c", '${cmd.join(" ")}'${wrapper}`])
  return true
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    backgroundColor: "#050505",
    icon: __dirname + "/icon.png",
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
  });

  // mainWindow.maximize();
  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);
app.on('ready', () => {
  setInterval(() => {
    updateChecker();
  }, 30 * 1000)
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
