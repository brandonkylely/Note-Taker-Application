// imports
const express = require('express');
const path = require('path')
const PORT = process.env.PORT || 3001;
const fs = require ('fs')
const db = require('./db/db.json');
const uuid = require('./helpers/uuid.js');
const { application } = require('express');
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
    // res.json(`${req.method} request received`);
    console.info(`${req.method} request received`);
})

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received`);
    
    const {title, text} = req.body;
    console.log(req.body)

    const newNote = {title, text, id:uuid()};
    
    db.push(newNote)

    const noteString = JSON.stringify(db);
    
    fs.writeFileSync('./db/db.json', noteString);

    res.json(db)
})

app.delete(`/api/notes/:id`, (req, res) => {
    const id = req.params.id;
    const index = db.findIndex(note => {
        return note.id === id;
    });
    // alternatively,
    // for(let i=0; i<db.length; i++){
    //     if (note.id === id){
    //         db.splice(i, 1)
    //     }
    // }
    db.splice(index, 1)
    console.log(index)

    console.log(db)
    const noteString = JSON.stringify(db)

    fs.writeFileSync('./db/db.json', noteString)

    res.json(db)
}
)

// open server with route
app.listen(PORT, console.log(`http://localhost:${PORT}`));