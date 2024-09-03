const express = require('express');
const app = express();
const port = 3000;

const helpRouter = require('./routes/help');
const fourBarRRRRRouter = require('./routes/4bar_RRRR');

app.get('/', (req, res) => {
    res.send('Hello KKOM');
});

app.use('/help', helpRouter);
app.use('/calc/1', fourBarRRRRRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
