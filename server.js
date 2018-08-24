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
    text: 'Hello everybody' },
    { id: 2,
    userId: 2,
    text: 'Hello Kirk' },
    { id: 3,
    userId: 1,
    text: 'Goodbye everybody' },
    { id: 4,
    userId: 3,
    text: 'Hello person' },
    { id: 5,
    userId: 3,
    text: 'Thank you for the plastic monkeys' }
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

let readBody = (req, callback) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        callback(body);
    });
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

let postSquab = (req, res) => {
    readBody(req, (body) => {
        let squabId = squabs[squabs.length-1].id + 1;
        let newSquab = JSON.parse(body);
        let user = users.find(user => req.query.name == user.name);
        newSquab['id'] = squabId;
        newSquab['userId'] = user.id;
        squabs.push(newSquab);
        res.end(`You posted: ${newSquab.text}`);
    });
}

let server = express();

server.get('/users', authenticate, getUsers);
server.get('/squabs', authenticate, getAllSquabs);
server.get('/users/:userId/squabs', authenticate, getUserSquabs);
server.delete('/squabs/:squabId', authenticate, deleteSquab);
server.post('/squabs/post', authenticate, postSquab);

server.listen(4000);