// Timer countdown logic
var timerText = document.querySelector("#timer");
var timeAmount = 120;

function startTimer() {
    var timeInterval = setInterval(function() {
        timeAmount--
        timerText.textContent = "Time: " + timeAmount + " sec"

        if (timeAmount === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
}

// Start/Submit button event listener for timer
var button = document.querySelector("#start-btn");

button.addEventListener("click", startTimer);