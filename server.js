const express = require('express');

let users = [
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

let squabs = [
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
    body: 'Hello person' },
    { id: 5,
    userId: 3,
    body: 'Thank you for the plastic monkeys' }
];

let authenticate = (req, res, next) => {
    let name = req.query.name;
    let password = req.query.password;
    let thisUser = users.find(user => name === user.name);
    if (thisUser && password === thisUser.password) {
        next();
    }
    else {
        res.end("YOU SHALL NOT PASS!");
    }
};

let getUsers = (req, res) => {
    res.send(users);
};

let getAllSquabs = (req, res) => {
    res.send(squabs);
}

let getUserSquabs = (req, res) => {
    let userId = req.params.userId;
    let userSquabs = squabs.filter(squab => userId == squab.userId);
    res.send(userSquabs)
}

let deleteSquab = (req, res) => {
    let squabId = req.params.squabId;
    squabs = squabs.filter(squab => squabId != squab.id);
    res.end("Squab #" + squabId + " deleted.")
}


let server = express();

server.get('/users', authenticate, getUsers);
server.get('/squabs', authenticate, getAllSquabs);
server.get('/users/:userId/squabs', authenticate, getUserSquabs);
server.delete('/squabs/:squabId', authenticate, deleteSquab);


server.listen(4000);