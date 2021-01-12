const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

const iconPath = path.join(__dirname, '../assets/images/clock72@4x.png');
let tray = null; // because of a common electron js issue: It hides the tray icon after a bit if not defined here

app.on('ready', () => {
  // console.log(iconPath);

  tray = new Tray(iconPath);
  const trayTemplate = [
    {
      label: 'Timeout: On',
      enabled: false,
    },
    {
      label: 'Start',
    },
    {
      label: 'Stop',
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
  // tray.setTitle('Timeout-Electron');
  tray.setToolTip('Timeout-Electron 1.0\n5 minutes break after 60 minutes');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    // createWindow();
  }
});
