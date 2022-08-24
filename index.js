const express = require("express");
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('database.db')
const app = express();


app.use(express.json())

app.listen(8080, () => {
    console.log("Serveur à l'écoute");
})

function boolean_replace(row) {
    for (let i = 0; i < row.length; i++) {
        row[i].is_broken = !!row[i].is_broken
        row[i].is_occupied = !!row[i].is_occupied
        if (!row[i].is_occupied) { row[i].occupant_id = undefined; row[i].occupant_name = undefined; }
    }
    return row
}

app.get('/machines', (req, res) => {
    db.all(`SELECT * FROM machines`, (err, row) => {
        return res.status(200).json(boolean_replace(row))
    })
})

app.post('/machines', (req, res) => {

    const Parameters = ['name', 'manufacturer', 'muscle_name', 'max_weight']
    for (const params in req.query) {
        for (let i = 0; i < Parameters.length; i++) {
            if (req.query[params] === '') {
                return res.status(400).json({ status: 400, error: 'Bad Request', message: `Parameter ${params} is missing` })
            }
            else if (params === Parameters[i]) {
                Parameters.splice(i, 1);
            }
        }
    }

    if (Parameters.length != 0) {
        return res.status(400).json({ status: 400, error: 'Bad Request', message: `Parametersssss ${Parameters[0]} is missing` })
    }

    if (/\d/.test(req.query.name)) {
        return res.status(400).json({ status: 400, error: 'Bad Request', message: 'Parameter name cannot contain numbers' })
    }

    else if (/\d/.test(req.query.manufacturer)) {
        return res.status(400).json({ status: 400, error: 'Bad Request', message: 'Parameter manufacturer cannot contain numbers' })
    }

    else if (isNaN(Number(req.query.max_weight))) {
        return res.status(400).json({ status: 400, error: 'Bad Request', message: 'Parameter max_weight must be a number' })
    }

    else {
        req.query.max_weight = Number(req.query.max_weight)
        db.run(`INSERT INTO machines (name, manufacturer, muscle_name, max_weight) VALUES ('${req.query.name}', '${req.query.manufacturer}', '${req.query.muscle_name}', ${req.query.max_weight})`)

        db.all(`SELECT * FROM machines WHERE name='${req.query.name}' AND manufacturer='${req.query.manufacturer}' AND muscle_name='${req.query.muscle_name}' AND max_weight=${req.query.max_weight}`, (err, row) => {
            return res.status(201).json(boolean_replace(row))
        })
    }
})

app.use(function (req, res) {
    return res.status(404).json({ status: 404, error: 'Not Found', message: '' })
});