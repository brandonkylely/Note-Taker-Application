// import express 
const express = require('express')
const path = require('path')
const route = 3001;

// set app variable 
const app = express()

// add frontend files to server
app.use(express.static('./public'))

// open server with route
app.listen(route, console.log(`http://localhost:${route}`))