// import express 
const express = require('express');
const path = require('path')
const route = 3001;
const fs = require ('fs')
const db = require('./db/db.json');

// initialize app variable 
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add frontend files to server
app.use(express.static('./public'))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) =>{
    res.json(db);
    res.json(`${req.method} request received`);
    console.info(`${req.method} request received`);
})

app.post('/api/notes', (req,res) => {
    console.info(`${req.method} request received`);
    
    const {title, text} = req.body;
    console.log(req.body)
    if  (title && text) {
        
        const newNote = {title, text};
        
        const noteString = JSON.stringify(newNote);
        
        fs.appendfile('./db/db.json', noteString);
    }
})

// open server with route
app.listen(route, console.log(`http://localhost:${route}`));