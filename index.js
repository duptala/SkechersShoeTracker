require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/shoes')

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

app.get('/', (req, res) => {
    res.send({name: "Alice"});
})


app.get('/add-user', async (req, res) => {
    try {
        await User.insertMany([
            {
              name: 'shoe1',
              age: 20,
              email: '201281'
            },
            {
              name: 'shoe2',
              age: 22,
              email: '827182'
            },
            {
              name: 'shoe3',
              age: 19,
              email: '0128287'
            }
        ])
    } catch (err) {
        console.log("err, " + err);
    }
})

app.get('/users', async (req, res) => {
    const user = await User.find();

    if (user) {
        res.json(user);
    } else {
        console.log("something went wrong!")
    }
});

app.get('/users-delete', async (req, res) => {
    try {
      // Delete all documents in the users collection
      await User.deleteMany();
      console.log('All documents in users collection deleted successfully');
      
      // Query for the updated list of users
      const users = await User.find();
      
      // Send the list of users in the response
      res.json(users);
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
