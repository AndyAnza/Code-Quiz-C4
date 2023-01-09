const quizData = [
    {
        question: 'What does CSS stand for?',
        answers: ['Cascading Style Sheets', 'Central Style Sheet', 'Cascading Simple Sheets'],
        correctAnswer: 'a'
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: ['<js>', '<scripting>', '<script>'],
        correctAnswer: 'c'
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: ['function = myFunction()', 'function myFunction()', 'function:myFunction()'],
        correctAnswer: 'b'
    },
    {
        question: 'Which language runs in a web browser?',
        answers: ['Java', 'javascript', 'Python'],
        correctAnswer: 'b'
    },
    {
        question: 'How can you add a single line comment in a JavaScript?',
        answers: ['<!--This is a comment-->', '/This is a comment', '//This is a comment'],
        correctAnswer: 'c'
    }
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const submitBtn = document.getElementById('submit')
const button = document.getElementById('startButton');
let currentQuiz = 0
let score = 0
var secondsLeft = 60;
var timePenalization = 10;


document.getElementById('showHideQA').style.display = "none";
document.getElementById('question').style.display = "none";
document.getElementById('submit').style.display = "none";


button.addEventListener('click', startTimer);
button.addEventListener('click', loadQuiz);


function startTimer() {
    var timeEl = document.querySelector(".time");
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left.";


        if (secondsLeft <= 0)
            function endQuiz() {
                clearInterval(timerInterval);
                quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                <button onclick="location.reload()">Reload</button>
                `}
        endQuiz();
    }, 1000)
}

function loadQuiz() {
    document.getElementById("title").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById('showHideQA').style.display = "block";
    document.getElementById('question').style.display = "block";
    document.getElementById('submit').style.display = "block";
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.answers[0]
    b_text.innerText = currentQuizData.answers[1]
    c_text.innerText = currentQuizData.answers[2]
}

function deselectAnswers() {
    answerEls.forEach(answerEls => answerEls.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEls => {
        if (answerEls.checked) {
            answer = answerEls.id
        }
    })

    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    console.log(answer)

    if (answer) {
        if (answer === quizData[currentQuiz].correctAnswer) {
            score++
            currentQuiz++
        } else {
            secondsLeft = secondsLeft - timePenalization
        }


        if (currentQuiz < quizData.length) {
            loadQuiz()
        } else {
            quiz.innerHTML = `
            <h2> You answered ${score} /${quizData.length} questions correctly</ >
                <button onclick="location.reload()">Reload</button>
        `
        }
    }
})