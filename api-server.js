const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const cors = require('cors');

const ocrRouter = require('./routes/ocr');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/ocr', ocrRouter);

const port = process.env.PORT || 3191;
const server = app.listen(port, () => {
    console.log(`-------------------------------------------------------`)
    console.log(`  NodeJS Backend Server started on port ${port}`)
    console.log(`-------------------------------------------------------`)
});