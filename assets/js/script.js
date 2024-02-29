// Array of questions and answered which are either assigned true or false
const questions = [
    {
        question: "Which is the capital city of Spain?",
        answers: [
            { text: "Barcelona", correct: false},
            { text: "Madrid", correct: true},
            { text: "Sevilla", correct: false},
            { text: "Valencia", correct: false},
        ]
    },
    { 
        question: "Which is the capital city of Australia?",
        answers: [
            { text: "Sydney", correct: false},
            { text: "Melbourne", correct: false},
            { text: "Brisbane", correct: false},
            { text: "Canberra", correct: true},
        ]
    },
    {
        question: "Which is the capital city of Nigeria?", 
        answers: [
            { text: "Abuja", correct: true},
            { text: "Accra", correct: false},
            { text: "Durban", correct: false},
            { text: "Lagos", correct: false},
        ]
    },
    {
        question: "Which is the capital city of Canada?",
        answers: [
            { text: "Toronto", correct: false},
            { text: "Montreal", correct: false},
            { text: "Ottawa", correct: true},
            { text: "Vancouver", correct: false},
        ]
    },
    {
        question: "Which is the capital city of China?",
        answers: [
            { text: "Beijing", correct: true},
            { text: "Shanghai", correct: false},
            { text: "Wuhan", correct: false},
            { text: "Hong Kong", correct: false},
        ]
    },
    {
        question: "Which is the capital city of India?",
        answers: [
            { text: "Kolkata", correct: false},
            { text: "Mumbai", correct: false},
            { text: "Karachi", correct: false},
            { text: "New Delhi", correct: true},
        ]
    },
    {
        question: "Which is the capital city of Brazil?",
        answers: [
            { text: "Sao Paulo", correct: false},
            { text: "Brasilia", correct: true},
            { text: "Rio de Janeiro", correct: false},
            { text: "Belo Horizonte", correct: false},
        ]
    },
    {
        question: "Which is the capital city of Switzerland?",
        answers: [
            { text: "Lucerne", correct: false},
            { text: "Basel", correct: false},
            { text: "Zurich", correct: false},
            { text: "Bern", correct: true},
        ]
    } 
];

// Assigning the on page text that we want to change depending on the question
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

// variables depending on where user is up to on quiz and their score
let currentQuestionNumber = 0;
let score = 0;

// This function will capture all of the data for the start of the quiz
function startQuiz(){
    currentQuestionNumber = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// This function will pull the question that the user needs to be shown and the question Number.
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionNumber];
    let questionNo = currentQuestionNumber+ 1;
    questionElement.innerHTML = questionNo + ")  " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);   
    });
}

// This function aims to reset the overall state of the Game. This is done by removing the next button and removing the firstchild.
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

// This is an event function that will add 1 to the user's score if they get the answer correct
function selectAnswer(e){
    const selectedBtn = e.target;
    // This adds the class "correct" to the button with the correct answer
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    // This pulls the array of options that the user will have to choose from and it distinguishes the correct answers from icorrect.
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// This function resets the state, erasing the next button and sets the question element to have text giving the user a score
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

// Adds 1 to the question number when the next button is clicked and checks if the final question has been reached.
function handleNextButton(){
    currentQuestionNumber++;
    if(currentQuestionNumber < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
// This event listener will respond once clicked. The if statement asks if we are on the final question. If not, the next button appears, else the quiz starts again.
nextButton.addEventListener("click", ()=>{
    if(currentQuestionNumber < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
// Starts the program
startQuiz();





    
