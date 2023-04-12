const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors'); // for front-end interaction

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});

// connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
console.log(process.env.DB_NAME);

db.connect((err) => {
    if (err) {
        console.log("ERROR CONNECTING");
        throw err;
    }
    console.log("my sql connected!")
});

// Get ALL shoes + their data
app.get('/shoes/getallshoes', (req, res) => {
    let sql = 'SELECT * from shoes';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

// UPDATE
app.get('/shoes/update/:shoeid/:section_name', (req, res) => {
    const shoe_id = req.params.shoeid;
    const section_name = req.params.section_name;

    let sql = `UPDATE SHOES SET SHOES.shoeID = '${shoe_id}' WHERE shoes.section_name = '${section_name}'`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("updated!");
    })
})

// Insert shoes based on section
app.get('/shoes/insert/:shoeid/:section_name', (req, res) => {
    const shoe_id = req.params.shoeid;
    const section_name = req.params.section_name;

    let sql = `INSERT INTO SHOES (shoeid, section_name) VALUES ('${shoe_id}', '${section_name}')`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("shoes inserted/updated!");
    })
})

// Delete shoes based on section
app.get('/shoes/delete/:section_name', (req, res) => {
    const section_name = req.params.section_name;

    let sql = `DELETE FROM SHOES WHERE SHOES.section_name = '${section_name}'`;
    let query = db.query(sql, (error, result) => {
        if (error) throw error;
        res.send("shoes deleted!");
    });
});
