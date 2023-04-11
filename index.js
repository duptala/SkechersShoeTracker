const express = require('express');
const mysql = require('mysql');

//creating connection 
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : null,
    database : 'skechers'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("my sql connected!")
})

const app = express();



app.get('/addshoe', (req, res) => {
    let shoe = {shoeid:'55509', stock_section: 'm-k-1'};
    let sql = 'INSERT INTO shoe SET ?';
    let query = db.query(sql, shoe, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("shoes recieved!")
    });

})

// app.get('/getsections', (req, res) => {
//     let sql = 'SELECT stock_section.section_name FROM shoe join stock_section on shoe.stock_section = stock_section.section_name WHERE shoe.shoeid = 124508;'
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send("added lesh gooo!");
//         console.log(res.status);
//     })
// })

app.listen('3000', () => {
    console.log("server started on port 3000");
});





