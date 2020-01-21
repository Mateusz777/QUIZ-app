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

const buttons = document.querySelectorAll('.answer-btn');
    for (const button of buttons) {
        button.addEventListener('click', function () {
            const answerIndex = this.dataset.answer;
            // console.log(answerIndex);
            sendAnswer(answerIndex);
        })
    }


const tipDiv = document.querySelector('#tip')

// CALL TO A FRIEND
const btnCallToAFriend = document.querySelector("#callToAFriend");
function handleFriendsAnswer(data) {
    tipDiv.innerText = data.text;
}

function callToAFriend() {
    fetch('/help/friend', {
        method: "GET",
    })
        .then(r => r.json())
        .then(data => {
            handleFriendsAnswer(data);
        })
}
btnCallToAFriend.addEventListener("click", callToAFriend)
//

// HALF ON HALF
const btnHalfOnHalf = document.querySelector("#halfOnHalf");
function handleHalfOnHalfAnswer(data) {
    if(typeof data.text === 'string') {
        tipDiv.innerText = data.text;
    } else {
        for(const button of buttons) {
            if (data.answersToRemove.indexOf(button.innerText) > -1) {
                button.innerText = '';
            }
        }
    }
}

function halfOnHalf() {
    fetch('/help/half', {
        method: "GET",
    })
        .then(r => r.json())
        .then(data => {
            handleHalfOnHalfAnswer(data);
        })
}
btnHalfOnHalf.addEventListener("click", halfOnHalf)
//

// ANSWER TO THE CROWD
const btnQuestionToTheCrowd = document.querySelector(('#questionToTheCrowd'))

function handleCrowdAnswer(data) {
    console.log(data)
    if(typeof data.text === 'string') {
        tipDiv.innerText = data.text;
    } else {
        data.chart.forEach((percent, index) => {
            buttons[index].innerText = `${buttons[index].innerText}: ${percent}%`
        })
    }
}

function questionToTheCrowd() {
    fetch('/help/crowd', {
        method: "GET",
    })
        .then(r => r.json())
        .then(data => {
            handleCrowdAnswer(data);
        })
}
btnQuestionToTheCrowd.addEventListener("click", questionToTheCrowd)
