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

// Display quiz logic, also replaced start button with submit button
var displayQuestion = document.querySelector("#questions");
var displayAnswers = document.querySelector("#answers");
var startButton = document.querySelector("#start-btn");
var submitButton = document.querySelector("#submit-btn");

function startQuiz() {
    displayQuestion.setAttribute("style", "visibility:visible;");
    displayAnswers.setAttribute("style", "visibility:visible;");
    startButton.setAttribute("style", "display:none;");
    submitButton.setAttribute("style", "display:block;")
};

// Start button event listener for timer countdown and display quiz
startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", startQuiz);