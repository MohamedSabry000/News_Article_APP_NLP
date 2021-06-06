const path = require('path');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const FormData = require("form-data");

// Sentiment API URL
const BaseURL = "https://api.meaningcloud.com/sentiment-2.1";
// The API Key, this is free key, for me, just for deploying the app, it's recommended to use env for your keys
const API_KEY= "077ce2d29afb68e7b1e7456ffd5ff49f";
// Port Number
const PORT = 8082;

// environment variables
const dotenv = require('dotenv');
dotenv.config();


// Dependencies 
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log(`Example app listening on port ${PORT}!`);
});

app.post('/test', async (req, res) => {
    const formData = new FormData();
    // formData.append("key", process.env.API_KEY);
    formData.append("key", API_KEY);
    formData.append("url", req.body.url);
    formData.append("lang", "en");
    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    };
    try {
        const response = await fetch(BaseURL, requestOptions);
        const data = await response.json();
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});
