const question = document.querySelector('#question');
const answer1 = document.querySelector('#answer1');
const answer2 = document.querySelector('#answer2');
const answer3 = document.querySelector('#answer3');
const answer4 = document.querySelector('#answer4');
const goodAnswersSpan = document.querySelector('#good-answers');
const gameBoard = document.querySelector('#game-board');
const h2 = document.querySelector('h2');

//// SHOW QUESTIONS AND ANSWERS ON DISPLAY
function fillQuestionElements(data) {
    if (data.winner === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'wygrana!';
        return;
    }

    if (data.loser === true) {
        gameBoard.style.display = 'none';
        h2.innerText = 'tym razem nie poszło, jedziesz dalej';
        return;
    }

    question.innerText = data.question;
    // musiałem użyć Number(), ponieważ pętla for in używa zawsze i jako stringa
    for (const i in data.answers) {
        const answerEl = document.querySelector(`#answer${Number(i)+1}`)
        answerEl.innerText = data.answers[i];
    }
}
////

function showNextQuestion () {
    fetch('/question', {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data => {
            fillQuestionElements(data);
        });
}
showNextQuestion();


function handleAnswerFeedback(data) {
    goodAnswersSpan.innerText = data.goodAnswers;
    showNextQuestion();
}

function sendAnswer(answerIndex) {
    fetch (`/answer/${answerIndex}`, {
        method: 'POST'
    })
        .then(r => r.json())
        .then(data => {
            console.log(data);
            handleAnswerFeedback(data);
        });
}

const buttons = document.querySelectorAll('button');
    for (const button of buttons) {
    button.addEventListener('click', function () {
        const answerIndex = this.dataset.answer;
        // console.log(answerIndex);
        sendAnswer(answerIndex);
    })
}

