// import express 
const express = require('express');
const path = require('path')
const route = 3001;
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
})

app.post('/notes', (req,res) => {
    res.json(`${req.method} request received`);
    console.info(`${req.method} request received`);

})

// open server with route
app.listen(route, console.log(`http://localhost:${route}`));