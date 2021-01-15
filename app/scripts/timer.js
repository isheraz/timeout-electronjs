const { ipcRenderer } = require('electron');

let timeout = null;
let minutes = 0;
let seconds = 0;
let time = null;
let display = '00:00';
let intervalId = null;

const timer = document.getElementById('timer');

const haltWindow = async () => {
  ipcRenderer.send('ShowHaltWindow', `Time's up!! It's time for a short break`);
};

const stopTimer = () => {
  clearInterval(intervalId);
};

const startTimer = async () => {
  clearInterval(intervalId);

  if (time <= 0) time = timeout;

  intervalId = setInterval(() => {
    time -= 1;
    if (time < 0) time = 0;
    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);

    if (!minutes && !seconds) {
      console.log(`Time's up`);
      stopTimer();
      haltWindow();
    }

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    display = `${minutes}:${seconds}`;
    timer.innerHTML = display;
  }, 1000);
};

const pauseTimer = async (pauseSeconds) => {
  if (!time) console.log(`Timout is not initialized yet!`);
  else {
    clearInterval(intervalId);

    let pauseTime = pauseSeconds;
    timer.innerHTML = `${display} (Paused)`;
    intervalId = setInterval(() => {
      pauseTime -= 1;
      if (!pauseTime) {
        console.log('Resuming the Timer!');
        clearInterval(intervalId);
        startTimer();
      }
    }, 1000);
  }
};

const resetTimer = () => {
  time = 0;
  clearInterval(intervalId);
};

ipcRenderer.on('StartMinutes', (event, data) => {
  console.log(`Start the timer for ${data} minute(s)`);
  timeout = data * 60;
  startTimer();
});

ipcRenderer.on('PauseForMinutes', (event, data) => {
  console.log(`Pause the timer for ${data} minute(s)`);
  pauseTimer(data * 60);
});

ipcRenderer.on('Stop', (event, data) => {
  console.log(`Pause the timer for ${data} minute(s)`);
  stopTimer();
});

ipcRenderer.on('Reset', (event, data) => {
  console.log(data);
  resetTimer();
});
