const express = require("express");
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('database.db')
const app = express();

app.listen(8080, () => {
    console.log("Serveur à l'écoute");
})

