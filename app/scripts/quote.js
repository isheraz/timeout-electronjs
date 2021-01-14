const { ipcRenderer } = require('electron');

const haltTime = document.getElementById('haltTime');
const quote = document.getElementById('quote');

ipcRenderer.on('ShowHaltTimeAndQuote', (event, data) => {
  haltTime.innerHTML = data.haltTimer;
  quote.innerHTML = data.quote;
});
