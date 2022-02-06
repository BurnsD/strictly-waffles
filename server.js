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
