document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const breakLength = document.getElementById('break-length');
    const sessionLength = document.getElementById('session-length');
    const timeLeft = document.getElementById('time-left');
    const timerLabel = document.getElementById('timer-label');
    const startStopBtn = document.getElementById('start_stop');
    const resetBtn = document.getElementById('reset');
    const breakDecrement = document.getElementById('break-decrement');
    const breakIncrement = document.getElementById('break-increment');
    const sessionDecrement = document.getElementById('session-decrement');
    const sessionIncrement = document.getElementById('session-increment');
    const playIcon = startStopBtn.querySelector('.fa-play');
    const pauseIcon = startStopBtn.querySelector('.fa-pause');
    const beep = document.getElementById('beep');
  
    // State
    let breakVal = 5;
    let sessionVal = 25;
    let timeLeftInSeconds = sessionVal * 60;
    let timerInterval = null;
    let isRunning = false;
    let currentTimer = 'Session'; // 'Session' or 'Break'
  
    // Helper Functions
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
  
    const updateDisplay = () => {
      timeLeft.textContent = formatTime(timeLeftInSeconds);
      breakLength.textContent = breakVal;
      sessionLength.textContent = sessionVal;
      timerLabel.textContent = currentTimer;
    };
  
    const startTimer = () => {
      if (isRunning) return;
      
      isRunning = true;
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline';
      
      timerInterval = setInterval(() => {
        timeLeftInSeconds--;
        updateDisplay();
        
        if (timeLeftInSeconds === 0) {
          beep.play();
          
          // Switch between Session and Break
          if (currentTimer === 'Session') {
            currentTimer = 'Break';
            timeLeftInSeconds = breakVal * 60;
          } else {
            currentTimer = 'Session';
            timeLeftInSeconds = sessionVal * 60;
          }
          
          updateDisplay();
        }
      }, 1000);
    };
  
    const pauseTimer = () => {
      if (!isRunning) return;
      
      isRunning = false;
      playIcon.style.display = 'inline';
      pauseIcon.style.display = 'none';
      clearInterval(timerInterval);
    };
  
    const resetTimer = () => {
      pauseTimer();
      beep.pause();
      beep.currentTime = 0;
      
      breakVal = 5;
      sessionVal = 25;
      timeLeftInSeconds = sessionVal * 60;
      currentTimer = 'Session';
      
      updateDisplay();
    };
  
    // Event Listeners
    startStopBtn.addEventListener('click', () => {
      if (isRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    });
  
    resetBtn.addEventListener('click', resetTimer);
  
    breakDecrement.addEventListener('click', () => {
      if (isRunning || breakVal <= 1) return;
      breakVal--;
      updateDisplay();
    });
  
    breakIncrement.addEventListener('click', () => {
      if (isRunning || breakVal >= 60) return;
      breakVal++;
      updateDisplay();
    });
  
    sessionDecrement.addEventListener('click', () => {
      if (isRunning || sessionVal <= 1) return;
      sessionVal--;
      timeLeftInSeconds = sessionVal * 60;
      updateDisplay();
    });
  
    sessionIncrement.addEventListener('click', () => {
      if (isRunning || sessionVal >= 60) return;
      sessionVal++;
      timeLeftInSeconds = sessionVal * 60;
      updateDisplay();
    });
  
    // Initialize display
    updateDisplay();
  });