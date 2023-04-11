const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());


//creating connection 
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : null,
    database : 'skechers_shoe_location'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("my sql connected!")
})




// INSERTING SHOE
app.get('/shoes/addshoe', (req, res) => {
    // const shoeID = gridElement.dataset.content;
    // const section_name = gridElement.id;
    let shoe = {shoeID:'10081, 1082, 1083', section_name: 'br-t-2'};
    let sql = 'INSERT INTO shoes SET ?';
    let query = db.query(sql, shoe, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("shoes recieved!")
    });
})

// GET SHOES IN SECTION
app.get('/shoes/get/:shoeid', (req, res) => {
    const shoe_id = req.params.shoeid;
    let sql = `SELECT SECTION.section_name FROM SHOES JOIN SECTION ON SHOES.section_name = SECTION.section_name WHERE SHOES.shoeID LIKE '%${shoe_id}%';`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    })
})


// Define Express route to delete shoes based on section_name
app.get('/shoes/delete', (req, res) => {
    // const section_name = gridElement.id;
    const section_name = "br-t-2";
  
    let sql = 'DELETE FROM shoes WHERE shoes.section_name = ?';
    let query = db.query(sql, section_name, (error, result) => {
      if (error) throw error;
      res.send("shoes deleted!");
    });
  });
  

app.listen('3000', () => {
    console.log("server started on port 3000");
});





