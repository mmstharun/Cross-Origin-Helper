const express = require('express');
var cors = require('cors');
const axios = require('axios');
var bodyParser = require('body-parser');
const app = express();
const qaapp = express();
const port = 3001;
const qaport = 3002;

const fs = require('fs');
const { json } = require('express');

var options = {
    inflate: true,
    limit: '100kb',
    type: 'application/json'
};

app.use(cors());
app.use(bodyParser.raw(options));

qaapp.use(cors());
qaapp.use(bodyParser.raw(options));

const baseUrl = 'http://localhost:8080';

// app.get('/test.pdf', (req, res) => {
//     let file = fs.readFileSync('/Users/lakkoju/Downloads/126974360_1613037714557.pdf');
//     res.send(file);
// })

// app.get('/iasdata', (req, res) => {

//     let iasresp = fs.readFileSync('response.json');
//     let response = JSON.parse(iasresp);

//     res.send(JSON.stringify(response))
// })

qaapp.get('/*', (req, res) => {
    var params = req.params;
    var headers = req.headers;
    var url = req.url;

    // console.log(headers);
    // console.log(url);

    headers['host'] = 'abc.com';
    headers['session_id'] = 'XYZ';
    axios.get('http://abc.com' + url, {
            headers: headers
        })
        .then(response => {
            console.log(response.data);
            res.send(JSON.stringify(response.data));
        }).catch(error => {
            console.log(error);
            res.status(500).send(error.response.data);
        });
});

app.get('/*', (req, res) => {
    var params = req.params;
    var headers = req.headers;
    var url = req.url;

    // console.log(headers);
    // console.log(url);

    headers['host'] = 'localhost';
    headers['session_id'] = 'XYZ';
    axios.get(baseUrl + url, {
            headers: headers
        })
        .then(response => {
            console.log(response.data);
            res.send(JSON.stringify(response.data));
        }).catch(error => {
            console.log(error);
            res.status(500).send(error.response.data);
        });
});

app.post('/*', (req, res) => {

    var headers = req.headers;
    var url = req.url;
    var body = req.body;
    var formData = req.formData;

    console.log(headers);
    console.log(url);
    console.log(body);

    headers['host'] = 'localhost';
    headers['session_id'] = 'XYZ';

    const options = {
        method: 'post',
        url: baseUrl + url,
        data: body,
        headers: headers,
        formData: formData
    };

    axios(options)
        .then(response => {
            console.log(response.data);
            res.send(response.data);
        }).catch(error => {
            console.log(error);
            res.status(500).send(error.response.data);
        });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
qaapp.listen(qaport, () => console.log(`http://localhost:${qaport}`));