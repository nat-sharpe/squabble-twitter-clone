const express = require('express');

const users = [
    { id: 1,
    name: 'Nat',
    email: 'nat@natsharpe.com',
    password: 'mellon' },
    { id: 2,
    name: 'Joe',
    email: 'joe@bigboss.com',
    password: 'riddle' },
    { id: 3,
    name: 'Kirk',
    email: 'kirk@electric.com',
    password: 'fishy' }
];

const squabs = [
    { id: 1,
    userId: 1,
    body: 'Hello everybody' },
    { id: 2,
    userId: 2,
    body: 'Hello Kirk' },
    { id: 3,
    userId: 1,
    body: 'Goodbye everybody' },
    { id: 4,
    userId: 3,
    body: 'Hello person' }
];

let authenticate = (req, res, next) => {
    let name = req.params.name;
    let password = req.params.password;
    let thisUser = users.filter(user => name === user.name);
    if (password === thisUser[0].password) {
        next();
    }
    else {
        res.end("YOU SHALL NOT PASS!");
    }
};

let getUsers = (req, res) => {
    res.send(users);
};

let server = express();

server.get('/users/:name/:password', authenticate, getUsers)

server.listen(3000);