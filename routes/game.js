function gameRoutes (app) {

    let goodAnswers = 0;
    let callToAFriendUsed = false;
    let questionToTheCrowdUsed = false;
    let halfOnHalfUsed = false;
    let isGameOver = false;

    const questions = [
        {
            question: 'Jakie produkty są źródłem węglowodanów złożonych?',
            answers: ['ciastka, słodycze, miód, dżem', 'orzechy laskowe, jajka, masło, losoś','jabłka, melony, grapefruity, truskawki', 'otręby, kasza, ryż, kukurydza'],
            correctAnswer: 3,
        },

        {
            question: 'Jaki indeks glikemiczny mają słodkie owoce?',
            answers: ['wysoki', 'średni', 'niski', 'ciężko powiedzieć'],
            correctAnswer: 0,
        },

        {
            question: 'Co jest najważniejszą zasadą podczas gubienia zbędnych kilogramów?',
            answers: ['picie dużo wody', 'nie jedzenie po 18', 'ujemny bilans kaloryczny', 'unikanie tłuszczy'],
            correctAnswer: 2,
        }
    ]

    // REST:
    app.get('/question', (req, res) => {
        if (goodAnswers === questions.length) {
            res.json({
                winner: true
            })
        } else if (isGameOver) {
            res.json({
                loser: true
            })
        } else {
            const nextQuestion = questions[goodAnswers];
            const {question, answers} = nextQuestion;
            // dzięki temu nie przekazujemy całego obiektu question do przeglądarki co za tym idzie, nikt nie podejrzy odp :)
            res.json ({
                question,
                answers,
            })
        }
    })

    // :index - aby przyjąć index o dowolnej wartości!
    app.post('/answer/:index', (req, res) => {

        if(isGameOver) {
            res.json ({
                loser: true,
            })
        }
        // destrukturyzacja z req.params
        // console.log(req.params)
        const {index} = req.params;
        const question = questions[goodAnswers];
        const isGoodAnswer = question.correctAnswer === Number(index)
        if(isGoodAnswer) {
            goodAnswers++;
        } else {
            isGameOver = true;
        }

        res.json ({
            // correct: question.correctAnswer === Number(index) ? true : false    <----- BEZ SENSU
            correct: isGoodAnswer,
            goodAnswers,
        })
    })

    // CALL TO A FRIEND
    app.get('/help/friend', (req, res) => {
        if(callToAFriendUsed) {
            return res.json({
                text: 'To koło ratunkowe było już wykorzystane',
            });
        }

        callToAFriendUsed = true;

        const doesFriendKnowAnswer = Math.random() < .5;

        const question = questions[goodAnswers];

        res.json({
            text: doesFriendKnowAnswer ? `${question.answers[question.correctAnswer]} wybierz Panie` : `ooo Paanie, za trudne, za trudne`
        })

    });

    // HALF ON HALF
    app.get('/help/half', (req, res) => {
        if(halfOnHalfUsed) {
            return res.json({
                text: 'To koło ratunkowe było już wykorzystane',
            });
        }

        halfOnHalfUsed = true;

        const question = questions[goodAnswers];
        //usunę z tablicy poprawną odpowiedź, a później jeszcze 1 - losową
        const answersCopy = question.answers.filter((s, index) => (
                index !== question.correctAnswer
        ));


        answersCopy.splice(~~(Math.random() * answersCopy.length), 1);
        // ~~ <------ Math.floor()   :)
        res.json({
            answersToRemove: answersCopy,
        })
        // console.log(answersCopy);
    });

    // ANSWER TO THE CROWD
    app.get('/help/crowd', (req, res) => {
        if(questionToTheCrowdUsed) {
            return res.json({
                text: 'To koło ratunkowe było już wykorzystane',
            });
        }

        questionToTheCrowdUsed = true;

        const chart = [10, 20, 30, 40];

        for(let i = chart.length - 1; i > 0; i--){
            // bo przecież chcę przedział (-10 do 10)
            const change = Math.floor(Math.random()*20 - 10)
            chart[i]+=change;
            chart[i-1]-=change;
        }
        // przypisanie największej liczby do poprawnej odpowiedzi
        const question = questions[goodAnswers];
        const {correctAnswer} = question;

        [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]]  // zamiana wartości (40 jest juz przy correctAnswer)

        res.json({
            chart,
        })
    })
    //

}

module.exports = gameRoutes;
