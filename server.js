// Modules
const express = require('express');
const req = require('express/lib/request');
const path =require('path');
const fs = require('fs');
const util = require('util');

// File Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Server
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware for static page
app.use(express.static('../public'));

// GET request
app.get('/api/notes', (req, res) => {
    readFileAsync('../db/db.json', "utf-8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});
// POST request
app.post('/api/notes', (req, res) => {
    const note = req.body;
    readFileAsync('../db/db.json', "utf-8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = note.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync('../db/db.json', JSON.stringify(notes))
        res.json(notes);
    })
});
// Routes For HTML
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});