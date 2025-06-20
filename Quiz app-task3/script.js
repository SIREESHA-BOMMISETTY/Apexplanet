const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false }
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "Mark Twain", correct: false },
            { text: "Leo Tolstoy", correct: false }
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Hydrogen", correct: false }
        ]
    },
    {
        question: "What is the capital city of Japan?",
        answers: [
            { text: "Kyoto", correct: false },
            { text: "Beijing", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Seoul", correct: false }
        ]
    }
];

const question_header = document.getElementById("question_header");
const optionsValues = document.querySelector(".options");
const next_button = document.querySelector(".next");

let questionIndex = 0;
let score = 0;

function startQuiz() {
    questionIndex = 0;
    score = 0;
    next_button.innerHTML = "Next";
    showQuestions();
}

function showQuestions() {
    reSet();

    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    question_header.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        optionsValues.appendChild(button);

    
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
    });
}

function reSet() {
    next_button.style.display = "none";
    while (optionsValues.firstChild) {
        optionsValues.removeChild(optionsValues.firstChild);
    }
}

function selectAnswer(selectedButton, isCorrect) {
    const allButtons = optionsValues.querySelectorAll(".btn");

    allButtons.forEach(button => {
        const answerText = button.innerHTML;
        const correctAnswer = questions[questionIndex].answers.find(ans => ans.text === answerText);
        
        if (correctAnswer.correct) {
            button.style.backgroundColor = "green";
        } else {
            button.style.backgroundColor = "red";
        }

        
        button.disabled = true;
    });

    if (isCorrect) {
        score++;
    }

    next_button.style.display = "block";
}


next_button.addEventListener("click", () => {
    questionIndex++;
    if (questionIndex < questions.length) {
        showQuestions();
    } else {
        showScore();
    }
});

function showScore() {
    reSet();
    question_header.innerHTML = `Quiz Completed! Your score is ${score} out of ${questions.length}.`;
    next_button.innerHTML = "Play Again";
    next_button.style.display = "block";

    next_button.addEventListener("click", startQuiz, { once: true });
}

startQuiz();




const jokeBtn = document.getElementById("joke-button");
const jokeText = document.getElementById("joke-text");

jokeBtn.addEventListener("click", async () => {
    jokeText.innerText = "Loading...";
    try {
        const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
        const data = await res.json();
        jokeText.innerText = data.joke;
    } catch (err) {
        jokeText.innerText = "Oops! Couldn't fetch a joke right now.";
    }
});

