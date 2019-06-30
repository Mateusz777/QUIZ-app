const question = document.querySelector('#question');
const answer1 = document.querySelector('#answer1');
const answer2 = document.querySelector('#answer2');
const answer3 = document.querySelector('#answer3');
const answer4 = document.querySelector('#answer4');

function fillQuestionElements(data) {
    question.innerHTML = data.question;
    answer1.innerHTML = data.answers[0];
    answer2.innerHTML = data.answers[1];
    answer3.innerHTML = data.answers[2];
    answer4.innerHTML = data.answers[3];
}

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

function sendAnswer(answerIndex) {
    fetch (`/answer/${answerIndex}`, {
        method: 'POST'
    })
        .then(r => r.json())
        .then (data => {
            // console.log(data);
        });
}

const buttons = document.querySelectorAll('button');
    for (const button of buttons) {
    button.addEventListener('click', function () {
        const answerIndex = this.dataset.answer;
        // console.log(answerIndex);
    })
}

