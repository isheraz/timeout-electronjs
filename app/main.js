const { app, BrowserWindow, Tray, Menu, screen } = require('electron');
const path = require('path');
const timer = require('./scripts/timer');

const iconPath = path.join(__dirname, '../assets/images/clock72@4x.png');
let tray = null; // because of a common electron js issue: It hides the tray icon after a bit if not defined here
let win = null;

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const { width } = display.bounds;
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    icon: iconPath,
    width: 175,
    height: 50,
    resizable: false,
    alwaysOnTop: false,
    frame: false,
    x: width - 175,
    y: 0,
    opacity: 0.8,
  });
  win.loadFile('app/pages/index.html');
}

app.on('ready', () => {
  createWindow();
  tray = new Tray(iconPath);
  const trayTemplate = [
    {
      label: 'Timeout: On',
      enabled: false,
    },
    {
      label: 'Toggle',
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
      click() {},
    },
    {
      label: 'Pause Timer',
      submenu: [
        {
          label: '1 Hour',
          value: 1,
          click() {},
          checked: false,
        },
        {
          label: '2 Hours',
          value: 2,
          click() {},
          checked: false,
        },
        {
          label: '3 Hours',
          value: 3,
          click() {},
          checked: false,
        },
        {
          label: '4 Hours',
          value: 4,
          click() {},
          checked: false,
        },
      ],
    },
    {
      label: 'Stop',
      click() {
        timer();
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
          click() {},
        },
        {
          label: 'OFF',
          type: 'radio',
          click() {},
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
  const contextMenu = Menu.buildFromTemplate(trayTemplate);
  tray.setContextMenu(contextMenu);
  tray.setToolTip('Timeout-Electron 1.0\n5 minutes break after 60 minutes');
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
