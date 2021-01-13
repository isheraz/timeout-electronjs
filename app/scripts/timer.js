const time = '00:00:00';

const timer = document.getElementById('timer');

const resetTimer = () => {
  timer.innerHtml = time;
};

module.exports = resetTimer();
