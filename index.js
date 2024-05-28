require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const shoes = require('./models/shoes');
const cors = require('cors'); // for front-end interaction

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);

// CONNECTING TO DB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// ADDING SHOES
app.get('/shoes/insert/:shoe_id/:section_name', async (req, res) => {
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

// UPDATING SHOES
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
app.get('/shoes/getallshoes', async (req, res) => {
  const allShoes = await shoes.find();

  if (allShoes) {
    res.json(allShoes);
  } else {
    console.log("something went wrong!")
  }
});

// DELETING SHOES IN STOCK SECTION
app.get('/shoes/delete/:section_name', async (req, res) => {
  const shoe_section_name = req.params.section_name;

  try {
    // Delete all shoes with the specified section name
    const result = await shoes.deleteMany({ section_name: shoe_section_name });
    console.log(`Deleted ${result.deletedCount} shoes in ${shoe_section_name}`);

    // Query for the updated list of shoes
    const allShoes = await shoes.find();

    // Send the list of shoes in the response
    res.json(allShoes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// serving front-end
app.use(express.static(path.join(__dirname, "/Skechers")));
app.use(express.static(path.join(__dirname, "/images"))); // for homepage

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./Skechers/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  )
});

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./images/skxlogo.png"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  )
});



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  })
});
