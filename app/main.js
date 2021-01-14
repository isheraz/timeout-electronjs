const { app, BrowserWindow, Tray, Menu, screen, ipcMain } = require('electron');
const path = require('path');
const AutoLaunch = require('auto-launch');

const autoLauncher = new AutoLaunch({
  name: 'Timeout-ElectronJS',
});

const iconPath = path.join(__dirname, '../assets/images/clock72@4x.png');
let tray = null; // It hides the tray icon after a bit if not defined here
let win = null;
let haltWin = null;
const timer = 60; // In Minutes
const haltTimer = 5; // In Minutes
const quote = 'Do Good Have Good!';

const onAutoLaunch = async () => {
  // Checking if autoLaunch is enabled, if not then enabling it.
  autoLauncher
    .isEnabled()
    .then((isEnabled) => {
      if (isEnabled) return;
      autoLauncher.enable();
    })
    .catch((err) => {
      throw err;
    });
};

const createWindow = async () => {
  try {
    const display = screen.getPrimaryDisplay();
    const { width } = display.bounds;
    win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      icon: iconPath,
      width: 150,
      height: 65,
      resizable: false,
      alwaysOnTop: true,
      frame: false,
      x: width - 150,
      y: 0,
      opacity: 0.9,
    });
    await win.loadFile('app/pages/index.html');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createHaltWindow = async () => {
  try {
    const display = screen.getPrimaryDisplay();
    const { width, height } = display.bounds;
    haltWin = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      icon: iconPath,
      width,
      height,
      resizable: false,
      alwaysOnTop: true,
      frame: false,
      fullscreen: true,
    });
    await haltWin.loadFile('app/pages/quote.html');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const startTimer = async () => {
  win.webContents.send('StartMinutes', timer);
};

const createTray = async () => {
  return [
    {
      label: 'Timeout: On',
      enabled: false,
    },
    {
      label: 'Toggle Hide',
      click() {
        if (win.isFocused()) win.hide();
        else win.show();
      },
    },
    {
      label: 'Minimize',
      accelerator: 'CommandOrControl+M',
      role: 'minimize',
    },
    {
      type: 'separator',
    },
    {
      label: 'Start',
      click() {
        startTimer();
      },
    },
    {
      label: 'Pause Timer',
      submenu: [
        {
          label: '10 Minutes',
          click() {
            win.webContents.send('PauseForMinutes', 10);
          },
          checked: false,
        },
        {
          label: '1 Hour',
          click() {
            win.webContents.send('PauseForMinutes', 60);
          },
          checked: false,
        },
        {
          label: '2 Hours',
          click() {
            win.webContents.send('PauseForMinutes', 120);
          },
          checked: false,
        },
        {
          label: '4 Hours',
          click() {
            win.webContents.send('PauseForMinutes', 240);
          },
          checked: false,
        },
      ],
    },
    {
      label: 'Stop',
      click() {
        win.webContents.send('Stop', 'Stop the timer for me!');
      },
    },
    {
      label: 'Reset',
      click() {
        win.webContents.send('Reset', 'Reset the timer for me!');
        startTimer();
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Settings',
      submenu: [
        {
          label: 'Auto Startup',
          enabled: false,
        },
        {
          type: 'separator',
        },
        {
          label: 'ON',
          type: 'radio',
          checked: 'true',
          click() {
            onAutoLaunch();
          },
        },
        {
          label: 'OFF',
          type: 'radio',
          click() {
            autoLauncher
              .isEnabled()
              .then((isEnabled) => {
                if (isEnabled) autoLauncher.disable();
              })
              .catch((err) => {
                throw err;
              });
          },
        },
      ],
    },
    {
      type: 'separator',
    },
    {
      label: 'Exit',
      click() {
        app.isQuiting = true;
        app.quit();
      },
    },
  ];
};

ipcMain.on('ShowHaltWindow', async (event, data) => {
  console.log(data);

  await createHaltWindow();
  const sendData = { haltTimer: `${haltTimer} Minute(s)`, quote };
  haltWin.webContents.send('ShowHaltTimeAndQuote', sendData);

  setTimeout(() => {
    haltWin.destroy();
    startTimer();
  }, haltTimer * 60 * 1000);
});

app.on('ready', async () => {
  try {
    tray = new Tray(iconPath);
    const trayTemplate = await createTray();
    const contextMenu = Menu.buildFromTemplate(trayTemplate);
    tray.setContextMenu(contextMenu);
    tray.setToolTip(`Timeout-Electron 1.0\n5 minutes break after 60 minutes`);
    onAutoLaunch();
    await createWindow();
    startTimer();
  } catch (error) {
    console.log(error);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
  win.show();
});
