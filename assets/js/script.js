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
var scoreName = document.querySelector("#enter-name");
var questionsIndex = 0;
var playerScore = 0

// Timer countdown logic
function startTimer() {
    var timeInterval = setInterval(function() {
        timeAmount--;
        timerText.textContent = "Time: " + timeAmount + " sec";
        timerText.setAttribute("style", "font-weight:bold;");

        if (timeAmount === 0) {
            clearInterval(timeInterval);
        } else if (timeAmount < 30){
            timerText.setAttribute("style", "color:red; font-weight:bold;");
        };
    }, 1000);
}

// Display quiz logic, replaces start button with submit button, hides outcome text
function startQuiz() {
    // Action when all quiz questions have been asked
    if (questionsIndex >= questions.length) {
        enterName();
        outcomeText.setAttribute("style", "display:none");
        displayAnswers.setAttribute("style", "display:none");
        scoreName.setAttribute("style", "display:block");
        return;
    } else {

        // Display the question
        displayQuestion.textContent = questions[questionsIndex].title;

        // Display answer options through label tags
        choices1.textContent = questions[questionsIndex].choices[0];
        choices2.textContent = questions[questionsIndex].choices[1];
        choices3.textContent = questions[questionsIndex].choices[2];
        choices4.textContent = questions[questionsIndex].choices[3];

        // Generate radio button input next to answer options
        radioInput(choices1);
        radioInput(choices2);
        radioInput(choices3);
        radioInput(choices4);
        
        // Set value attribute of input to answer choices 
        displayAnswers[0].setAttribute("value", questions[questionsIndex].choices[0]);
        displayAnswers[1].setAttribute("value", questions[questionsIndex].choices[1]);
        displayAnswers[2].setAttribute("value", questions[questionsIndex].choices[2]);
        displayAnswers[3].setAttribute("value", questions[questionsIndex].choices[3]);

        // Display questions, answer, and submit button
        displayQuestion.setAttribute("style", "visibility:visible;");
        displayAnswers.setAttribute("style", "visibility:visible;");
        startButton.setAttribute("style", "display:none;");
        submitButton.setAttribute("style", "display:block;");
    };
};

// Function to create radio button with text for answer choices
function radioInput(someChoice) {
    var radioEl = document.createElement("input");
    radioEl.setAttribute("type", "radio");
    radioEl.setAttribute("name", "answer-choice");
    someChoice.appendChild(radioEl);
};

// Submit button logic, proceeds to the next question
function submitQuiz(event) {
    event.preventDefault();

    // Check answers, proceed if correct, -5 seconds if wrong
    if (document.querySelector("input[name='answer-choice']:checked").value === questions[questionsIndex].answer) {
        playerScore += 20;
        outcomeText.textContent = "Correct!";
        questionsIndex++;
        startQuiz();
    } else {
        if (playerScore > 0) {
            playerScore -= 5
        }
        timeAmount -= 5;
        outcomeText.textContent = "Wrong! -5 seconds";
    }
};

// End of quiz display, asks for user to enter their name to be logged into high score board
function enterName() {
    displayQuestion.textContent = "Thanks for playing!";
    displayAnswers.setAttribute("style", "display:none");

}

// Start button event listener for timer countdown and display quiz
startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitQuiz);