require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const shoes = require('./models/shoes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.get('/shoes/addshoe/:shoe_id/:section_name', async (req, res) => {
    const shoes_id = req.params.shoe_id;
    const shoe_section_name = req.params.section_name;

    try {
        const newShoe = await shoes.create({
            shoesID: shoes_id,
            section_name: shoe_section_name
        });
        res.send(newShoe);
    } catch (err) {
        console.log(err)
    }
});

app.get('/shoes/update/:shoe_id/:section_name', async (req, res) => {
    const shoe_id = req.params.shoe_id;
    const shoe_section_name = req.params.section_name;
  
    try {
      const updatedShoe = await shoes.findOneAndUpdate(
        { section_name: shoe_section_name },
        { $set: { shoesID: shoe_id } },
        { new: true }
      );
  
      if (updatedShoe) {
        res.send(updatedShoe);
      } else {
        res.status(404).send({ error: 'Shoe not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: 'Server error' });
    }
  });
  



// GETTING ALL SHOES
app.get('/shoes', async (req, res) => {
    const allShoes = await shoes.find();

    if (allShoes) {
        res.json(allShoes);
    } else {
        console.log("something went wrong!")
    }
});

app.get('/shoes/delete', async (req, res) => {
    try {
      // Delete all documents in the users collection
      await shoes.deleteMany();
      console.log('All documents in users collection deleted successfully');
      
      // Query for the updated list of users
      const allShoes = await shoes.find();
      
      // Send the list of users in the response
      res.json(allShoes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    })
});
