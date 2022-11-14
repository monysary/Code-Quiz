// Timer variables
var timerText = document.querySelector("#timer");
var timeAmount = 60;

// High Score variables
var orderedList = document.querySelector("#ordered-list");
var playerScore = 0

// Main element variables
var displayQuestion = document.querySelector("#displayed-questions");
var displayAnswers = document.querySelector("#displayed-answers");
var outcomeText = document.querySelector("#outcome");
var choices1 = document.querySelector("#choice1");
var choices2 = document.querySelector("#choice2");
var choices3 = document.querySelector("#choice3");
var choices4 = document.querySelector("#choice4");
var questionsIndex = 0;

// Button variables
var startButton = document.querySelector("#start-btn");
var submitButton = document.querySelector("#submit-btn");
var logScoreButton = document.querySelector("#log-score-btn");
var startAgainButton = document.querySelector("#start-again-btn");

// Post quiz variables
var scoreNameContainer = document.querySelector("#enter-name-container");
var playerName = document.querySelector("#your-score");
var nameInput = document.querySelector("#name-input");

// Timer countdown logic
function startTimer() {
    var timeInterval = setInterval(function() {
        timeAmount--;
        timerText.textContent = "Time: " + timeAmount + " sec";
        timerText.setAttribute("style", "font-weight:bold;");

        // Timer stops when quiz ends or timer reaches 0
        if (timeAmount < 0) {
            clearInterval(timeInterval);
            timeAmount = 0;
            timerText.textContent = "Time: " + timeAmount + " sec";
            quizEnd();
        } else if (questionsIndex >= questions.length) {
            clearInterval(timeInterval);
            timerText.textContent = "Time: " + timeAmount + " sec";
        }
        if (timeAmount < 30){
            timerText.setAttribute("style", "color:red; font-weight:bold;");
        };
    }, 1000);
}

// Function to display post quiz page, displays score and input to log name
function quizEnd() {
    displayQuestion.textContent = "Great job!";
    outcomeText.setAttribute("style", "display:none");
    displayAnswers.setAttribute("style", "display:none");
    playerName.textContent = "Your score: " + playerScore;
    scoreNameContainer.setAttribute("style", "display:block");
    submitButton.setAttribute("style", "display:none");
    logScoreButton.setAttribute("style", "display:block");
};

// Display quiz logic, replaces start button with submit button, hides outcome text
function startQuiz() {
    // Action when all quiz questions have been asked
    if (questionsIndex >= questions.length) {
        quizEnd();

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
        playerScore -= 5;
        timeAmount -= 5;
        outcomeText.textContent = "Wrong! -5 seconds";
    };
};

// Function for logging player's name and score onto High Score board
var i = 0
function loggingScore(event) {
    event.preventDefault();

    // Store name input and score into object
    highScores.names = nameInput.value;
    highScores.finalScore = playerScore;

    // Add player score and name to highScore array
    highScoreBoard.push(highScores);

    createLi(i);

    // Add name and score to High Score board
    document.querySelector("#name" + i).textContent = highScoreBoard[i].names;
    document.querySelector("#score" + i).textContent = highScoreBoard[i].finalScore;

    i++

    // Replaces Submit button with Play Again button
    logScoreButton.setAttribute("style", "display:none");
    startAgainButton.setAttribute("style", "display:block");
};

// Function for creating list items under ordered list to log player name and score
function createLi (x) {
    if (x < 10) {
        // Creating list item
        var orderedListItem = document.createElement("li");
        orderedListItem.setAttribute("id", "score-entry" + x);
        orderedList.appendChild(orderedListItem);
        
        //Creating div then store name and score 
        var nameDiv = document.createElement("div");
        nameDiv.setAttribute("id", "name" + x);
        var scoreDiv = document.createElement("div");
        scoreDiv.setAttribute("id", "score" + x);
        orderedListItem.appendChild(nameDiv);
        orderedListItem.appendChild(scoreDiv);
    } else {
        return;
    };
};

// Function for starting the quiz over
function startAgain() {
    // Reset player input name, time, questions, and score
    nameInput.value = "";
    timeAmount = 60;
    questionsIndex = 0;
    playerScore = 0;

    // Starts quiz all over
    startQuiz();

    // Hide these things again
    scoreNameContainer.setAttribute("style", "display:none");
    startAgainButton.setAttribute("style", "display:none");
    outcomeText.setAttribute("style", "display:block");
    outcomeText.textContent ="Good luck!";
};

// Start button event listener for timer countdown and display quiz
startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", startTimer);
submitButton.addEventListener("click", submitQuiz);
logScoreButton.addEventListener("click", loggingScore);
startAgainButton.addEventListener("click", startAgain);
startAgainButton.addEventListener("click", startTimer);