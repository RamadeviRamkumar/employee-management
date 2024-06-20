// index.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const apiRoutes = require('./Routes/Admin');
const mongodb = require('./Config/Mongo');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const mongo = mongoose.connect(mongodb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongo.then(() => {
    console.log('Mongo_DB Connected Successfully');
}, error => {
    console.error('Error connecting to Mongo_DB:', error);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => res.send('Welcome to Signin Page'));

app.use('/api', apiRoutes);

module.exports = app;
