function gameRoutes (app) {

    let goodAnswers = 0;
    let callToFriendUsed = false;
    let questionToTheCrowd = false;
    let halfOnHalf = false;
    let isGameOver = false;

    const questions = [
        {
            question: 'Jakie produkty zawierają cukry złożone?',
            answers: ['ciastka, słodycze, miód, dżem', 'jabłka, melony, grapefruity, truskawki', 'otręby, kasza, ryż, kukurydza'],
            correctAnswer: 2,
        },

        {
            question: 'Jaki indeks glikemiczny mają słodkie owoce?',
            answers: ['wysoki', 'średni', 'niski'],
            correctAnswer: 0,
        },

        {
            question: 'Co jest najważniejszą zasadą podczas gubienia zbędnych kilogramów?',
            answers: ['picie dużo wody', 'nie jedzenie po 18', 'ujemny bilans kaloryczny'],
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
}


module.exports = gameRoutes;
