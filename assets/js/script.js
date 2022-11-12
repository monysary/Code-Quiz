// Timer variables
var timerText = document.querySelector("#timer");
var timeAmount = 60;

// Start Quiz variables
var displayQuestion = document.querySelector("#displayed-questions");
var displayAnswers = document.querySelector("#displayed-answers");
var startButton = document.querySelector("#start-btn");
var submitButton = document.querySelector("#submit-btn");
var outcomeText = document.querySelector("#outcome");
var choices1 = document.querySelector("#choice1");
var choices2 = document.querySelector("#choice2");
var choices3 = document.querySelector("#choice3");
var choices4 = document.querySelector("#choice4");

// Timer countdown logic
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
function startQuiz() {
    displayQuestion.textContent = questions[0].title
    choices1.textContent = questions[0].choices[0];
    radioInput(choices1);
    choices2.textContent = questions[0].choices[1];
    radioInput(choices2);
    choices3.textContent = questions[0].choices[2];
    radioInput(choices3);
    choices4.textContent = questions[0].choices[3];
    radioInput(choices4);

    displayQuestion.setAttribute("style", "visibility:visible;");
    displayAnswers.setAttribute("style", "visibility:visible;");
    startButton.setAttribute("style", "display:none;");
    submitButton.setAttribute("style", "display:block;");
    outcomeText.setAttribute("style", "display:none;");
};

// Function to create radio button with text for answer choices
function radioInput(someChoice) {
    var radioEl = document.createElement("input");
    radioEl.setAttribute("type", "radio");
    radioEl.setAttribute("name", "radio-group");
    someChoice.appendChild(radioEl);
};

// Start button event listener for timer countdown and display quiz
startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", startQuiz);