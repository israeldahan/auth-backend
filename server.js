const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.get('/', (req, res) => {
    res.send({msg: 'Hello World israel'});
});

function validateInput(username, password, email) {
    // if username is string length > 3
    // if password is string and UpperCase and LowerCase and number and length > 6
    // if email is string and email format
    let validateInput = false;
    if (username.length > 3) {
        validateInput = true;
    } else {
        validateInput = false;
    }
    if (password.length > 6 && password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g)) {
        validateInput = true;
    } else {
        validateInput = false;
    }
    if (email.includes('@') && email.includes('.')) {
        validateInput = true;
    } else {
        validateInput = false;
    }
    return validateInput;
}

function auth(req, res, next) {
    const token = req.headers.authorization;
    if (token === '123456789') {
        next();
    } else {
        res.status(401).send({msg: 'Unauthorized'});
    }
}

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (username === 'admin' && password === 'admin') {
        res.status(200).send({msg: 'Login Success', token: '123456789'});
    } else {
        res.status(401).send({msg: 'Login Failed'});
    }
});

app.post('/register', (req, res) => {
    const {username, password, email} = req.body;
    if (validateInput(username, password, email)) {
        res.status(200).send({msg: 'Register Success'});
    } else {
        res.status(401).send({msg: 'Register Failed'});
    }
});

app.get('/admin', auth, (req, res) => {
    res.status(200).send({msg: 'Welcome Admin'});
});

app.get('/gallery', auth, (req, res) => {
    res.status(200).send({msg: 'Welcome Gallery'});
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});