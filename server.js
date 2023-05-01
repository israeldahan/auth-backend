const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.get('/', (req, res) => {
    res.send({msg: 'Hello World israel'});
});

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

app.get('/admin', auth, (req, res) => {
    res.status(200).send({msg: 'Welcome Admin'});
});

app.get('/gallery', auth, (req, res) => {
    res.status(200).send({msg: 'Welcome Gallery'});
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});