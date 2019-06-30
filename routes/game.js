function gameRoutes (app) {

    let goodAnswers = 0;
    let callToFriendUsed = false;
    let questionToTheCrowd = false;
    let halfOnHalf = false;

    const questions = [
        {
            question: 'Jakie produkty zawierają cukry złożone?',
            answers: ['ciastka, słodycze, miód, dżem', 'jabłka, melony, grapefruity, truskawki', 'otręby, kasza, ryż, kukurydza'],
            correctAnswer: 3,
        },

        {
            question: 'Jaki indeks glikemiczny mają słodkie owoce?',
            answers: ['wysoki', 'średni', 'niski'],
            correctAnswer: 1,
        },

        {
            question: 'Co jest najważniejszą zasadą podczas gubienia zbędnych kilogramów?',
            answers: ['picie dużo wody', 'nie jedzenie po 18', 'ujemny bilans kaloryczny', 'dużo aktywności fizycznej'],
            correctAnswer: 3,
        }
    ]

    app.get('/question', (req, res) => {
        if (goodAnswers === questions.length) {
            res.json({
                winner: true
            })
        } else {
            const nextQuestion = questions[goodAnswers];
            const {question, answers} = nextQuestion;
            res.json ({
                question,
                answers,
            })
        }
    })

    app.post('/answer/:index', (req, res) => {
        const {index} = req.params;
        console.log(index)
    })

}

module.exports = gameRoutes;
