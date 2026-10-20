// Store all questions inside an array.
// Each question is an object containing a question,
// four options, and the correct answer.

const questions = [
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: [
            "var x = 10;",
            "let x = 10;",
            "const x = 10;",
            "All of the above"
        ],
        answer: 3
    },
    {
        question: "Which method is used to display a message in the browser console?",
        options: [
            "console.write()",
            "console.log()",
            "print()",
            "display()"
        ],
        answer: 1
    },
    {
        question: "Which data type represents true or false?",
        options: [
            "String",
            "Number",
            "Boolean",
            "Array"
        ],
        answer: 2
    },
    {
        question: "Which symbol is used for strict equality in JavaScript?",
        options: [
            "=",
            "==",
            "===",
            "!="
        ],
        answer: 2
    },
    {
        question: "Which method adds an item to the end of an array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "slice()"
        ],
        answer: 0
    }
];

const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("score");
const progress = document.getElementById("progress");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");

// Array indexes start at 0.
let currentQuestionIndex = 0;

// Number of correct answers.
let score = 0;

// Prevents the user from answering the same question twice.
let answerSelected = false;


function showQuestion() {

    // Get the current question object from the array.
    const currentQuestion = questions[currentQuestionIndex];

    // Update question number and score.
    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    // Update the progress bar.
    const progressPercentage =
        ((currentQuestionIndex + 1) / questions.length) * 100;

    progress.style.width = `${progressPercentage}%`;

    // Display the question text.
    questionElement.textContent = currentQuestion.question;

    // Remove the previous question's options.
    optionsContainer.innerHTML = "";

    // Reset feedback and answer selection.
    feedback.textContent = "";
    answerSelected = false;

    // Disable Next Question until an answer is selected.
    nextButton.disabled = true;

    // Create a button for each answer option.
    currentQuestion.options.forEach(function(option, index) {

        const optionButton = document.createElement("button");

        optionButton.type = "button";
        optionButton.classList.add("option-button");

        // Create the option letter: A, B, C, or D.
        const optionLetter = document.createElement("span");

        optionLetter.classList.add("option-letter");
        optionLetter.textContent = String.fromCharCode(65 + index);

        // Create the option text.
        const optionText = document.createElement("span");
        optionText.textContent = option;

        // Add the letter and text to the button.
        optionButton.appendChild(optionLetter);
        optionButton.appendChild(optionText);

        // Check the answer when the option is clicked.
        optionButton.addEventListener("click", function() {
            checkAnswer(index, optionButton);
        });

        // Add the button to the options container.
        optionsContainer.appendChild(optionButton);

    });

}

function checkAnswer(selectedIndex, selectedButton) {

    // Do nothing if an answer has already been selected.
    if (answerSelected) {
        return;
    }

    answerSelected = true;

    const currentQuestion = questions[currentQuestionIndex];

    // Get all answer buttons for the current question.
    const optionButtons =
        optionsContainer.querySelectorAll(".option-button");

    // Disable all options after the selection.
    optionButtons.forEach(function(button) {
        button.disabled = true;
    });

    // Check whether the selected answer is correct.
    if (selectedIndex === currentQuestion.answer) {

        score++;

        selectedButton.classList.add("correct");
        feedback.textContent = "Correct! Great job!";

    } else {

        selectedButton.classList.add("incorrect");
        feedback.textContent = "Incorrect! The correct answer is highlighted.";

    }

    // Highlight the correct answer.
    optionButtons[currentQuestion.answer].classList.add("correct");

    // Update the score display.
    scoreDisplay.textContent = `Score: ${score}`;

    // Enable the Next Question button.
    nextButton.disabled = false;

    // Change the button label on the final question.
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "View Result";
    }

}

function nextQuestion() {

    // Do not continue unless the user has answered.
    if (!answerSelected) {
        return;
    }

    // Move to the next question if questions remain.
    if (currentQuestionIndex < questions.length - 1) {

        currentQuestionIndex++;

        showQuestion();

    } else {

        // Display the final result after the last question.
        showResult();

    }

}

function showResult() {

    // Calculate the percentage of correct answers.
    const percentage = Math.round((score / questions.length) * 100);

    // Choose a message based on the final score.
    let resultMessage;

    if (percentage === 100) {
        resultMessage = "Perfect score! Excellent work!";
    } else if (percentage >= 60) {
        resultMessage = "Great job! Keep learning!";
    } else {
        resultMessage = "Keep practicing. You can do it!";
    }

    // Update the quiz card with the result.
    questionNumber.textContent = "Quiz Completed!";
    scoreDisplay.textContent = `Score: ${score} / ${questions.length}`;

    progress.style.width = "100%";

    questionElement.textContent = "Your Final Result";

    optionsContainer.innerHTML = `
        <div class="result-card">
            <h3>${percentage}%</h3>
            <p>${resultMessage}</p>
            <p>You answered ${score} out of ${questions.length} questions correctly.</p>
        </div>
    `;

    feedback.textContent = "";

    // Change the button to allow the user to restart.
    nextButton.textContent = "Restart Quiz";
    nextButton.disabled = false;

    // Mark the quiz as finished.
    answerSelected = false;
}

function restartQuiz() {

    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false;

    nextButton.textContent = "Next Question";

    showQuestion();

}

nextButton.addEventListener("click", function() {

    // If the quiz has finished, restart it.
    if (nextButton.textContent === "Restart Quiz") {

        restartQuiz();

    } else {

        // Otherwise, move forward.
        nextQuestion();

    }

});


// Display the first question when the page loads.
showQuestion();
