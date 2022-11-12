// Timer countdown logic
var timerText = document.querySelector("#timer");
var timeAmount = 120;

function startTimer() {
    var timeInterval = setInterval(function() {
        timeAmount--
        timerText.textContent = "Time: " + timeAmount + " sec"
        timerText.setAttribute("style", "font-weight:bold;")

        if (timeAmount === 0) {
            clearInterval(timeInterval);
        } else if (timeAmount < 30){
            timerText.setAttribute("style", "color:red; font-weight:bold;");
        };
    }, 1000);
}

// Display quiz logic, replaces start button with submit button, hides outcome text
var displayQuestion = document.querySelector("#questions");
var displayAnswers = document.querySelector("#answers");
var startButton = document.querySelector("#start-btn");
var submitButton = document.querySelector("#submit-btn");
var outcomeText = document.querySelector("#outcome");

function startQuiz() {
    displayQuestion.setAttribute("style", "visibility:visible;");
    displayAnswers.setAttribute("style", "visibility:visible;");
    startButton.setAttribute("style", "display:none;");
    submitButton.setAttribute("style", "display:block;");
    outcomeText.setAttribute("style", "display:none;");
};

// Start button event listener for timer countdown and display quiz
startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", startQuiz);