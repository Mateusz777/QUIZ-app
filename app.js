// standardowy początek ;p
const express = require('express');
const app = express();
// standardowy początek ;p

const path = require('path');
const gameRoutes = require('./routes/game');

// żeby działały nam te pliki statyczne, musimy je dołączyć w ten sposób:
app.use(express.static(
    path.join(__dirname, 'public')
))

app.listen(3000, () => {
    console.log('Server is working on port 3000 :) jedziem')
})

gameRoutes(app);