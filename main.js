// Dark Mode

const main = document.querySelector('.main');
const quizApp = document.querySelector('.quizApp');
const header = document.querySelector('header');
const switchElement = document.querySelector('.switch');
const slider = document.querySelector('.slider');

const toggleSwitch = document.querySelector('.input__check');

toggleSwitch.addEventListener('change', function() {
  if (this.checked) {
    main.classList.toggle('main-dark');
    quizApp.classList.toggle('quizApp-dark');
    header.classList.toggle('header-dark');
    Array.from(answerButtons.children).forEach(button => {
        if (button.classList.contains('btn-dark' && 'correct')){
            button.classList.remove("correct");
            button.classList.add("correct-dark");
        } else if (button.classList.contains('btn-dark' && 'incorrect')){
            button.classList.remove("incorrect");
            button.classList.add("incorrect-dark");
        }
    button.classList.add('btn-dark');
    });
    next.classList.toggle('next-dark');
    switchElement.classList.add('switch-dark');
    slider.classList.toggle('slider-dark');
  } else {
    main.classList.toggle('main-dark');
    quizApp.classList.toggle('quizApp-dark');
    header.classList.toggle('header-dark');
    Array.from(answerButtons.children).forEach(button => {
        if (button.classList.contains('correct-dark')){
            button.classList.remove("correct-dark");
            button.classList.add("correct");
        } else if (button.classList.contains('incorrect-dark')){
            button.classList.remove("incorrect-dark");
            button.classList.add("incorrect");
        }
    button.classList.remove('btn-dark');
    });
    next.classList.toggle('next-dark');
    switchElement.classList.remove('switch-dark');
    slider.classList.toggle('slider-dark');
  };
});

const questions = [
    {
        question: 'What is the purpose of HTML in web development?',
        answers: [
            { text: 'To define the structure and content of web pages.', correct: true},
            { text: 'To style and format web pages.', correct: false},
            { text: 'To create interactive functionality.', correct: false},
            { text: 'To handle server-side operations.', correct: false}
        ]
    },
    {
        question: 'Which programming language is commonly used for adding interactivity to web pages?',
        answers: [
            { text: 'HTML', correct: false},
            { text: 'CSS', correct: false},
            { text: 'JavaScript', correct: true},
            { text: 'Python', correct: false}
        ]
    },
    {
        question: 'What does CSS stand for in web development?',
        answers: [
            { text: 'Creative Styling Sheets', correct: false},
            { text: 'Cascading Style Sheets', correct: true},
            { text: 'Computer System Styles', correct: false},
            { text: 'Complete Scripting Syntax', correct: false}
        ]
    },
    {
        question: 'Which of the following is an example of a back-end programming language?',
        answers: [
            { text: 'Java', correct: true},
            { text: 'HTML', correct: false},
            { text: 'CSS', correct: false},
            { text: 'jQuery', correct: false}
        ]
    },
    {
        question: 'What is the purpose of a responsive web design?',
        answers: [
            { text: 'To optimize a website\'s performance for search engines.', correct: false},
            { text: 'To enhance the security of a website.', correct: false},
            { text: 'To enable real-time communication between the browser and server.', correct: false},
            { text: 'To adapt the layout and design of a website to different screen sizes and devices.', correct: true}
        ]
    },
];

const questionSpace = document.querySelector('.question');
const answerButtons = document.querySelector('.answers');
const next = document.querySelector('.next');
let questionNo = document.querySelector('.questionNo');
let questionsCount = 0;
let score = 0;


function startQuiz(){
    questionsCount = 0;
    score = 0;
    next.innerHTML = 'Next';
    showQuestion();
    questionNo.style.display = 'block';
    questionSpace.style.fontSize = '19px';
}

function showQuestion(){
    resetState();
    currentQuestion = questions[questionsCount];
    let qustionNum = questionsCount + 1;
    questionNo.innerHTML = qustionNum + '.';
    questionSpace.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach((answer, i) => {
        const button = document.createElement('button');
        button.innerHTML = '<span>' + String.fromCharCode(65 + i)+ '.</span><span>' + answer.text + '</span>';
        toggleSwitch.checked ? button.classList.add('btn', 'btn-dark') : button.classList.add('btn');
        answerButtons.appendChild(button);
        answer.correct ? button.dataset.correct = answer.correct : '';
        button.addEventListener('click', selectAnswer)
    })
}

function showScore(){
    resetState();
    questionSpace.innerHTML = `Thank you for taking the Quiz! Your score is ${score} out of ${questions.length}.`;
    questionNo.style.display = 'none';
    questionSpace.style.fontSize = 'clamp(20px, 4vw, 3rem)';
    next.innerHTML = "Play Again";
    next.style.display = 'block'
}

function handleNextBtn(){
    questionsCount++;
    questionsCount < questions.length ? showQuestion() : showScore();
}

next.addEventListener('click', ()=>{
    questionsCount < questions.length ? handleNextBtn() : startQuiz();
})

function resetState(){
    next.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    selectedBtn = e.target.closest('button');
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (selectedBtn.classList.contains('btn-dark')){
        isCorrect ? selectedBtn.classList.add("correct-dark") : selectedBtn.classList.add('incorrect-dark');
        score += isCorrect ? 1 : 0;
    } else {
        isCorrect ? selectedBtn.classList.add("correct") : selectedBtn.classList.add('incorrect');
        score += isCorrect ? 1 : 0;
    };
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            if (button.classList.contains('btn-dark')){
                button.classList.remove("correct");
                button.classList.add("correct-dark");
            } else {
                button.classList.add("correct")
            }
        }
        button.disabled = 'true';
    });
    next.style.display = 'block';
}

startQuiz()