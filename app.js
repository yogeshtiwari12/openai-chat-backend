require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/users');

const { PORT } = process.env;
const DB_URL = 'mongodb+srv://sibusky:ag3qF74AELq5ILMt@cluster0.gwi0hqg.mongodb.net/?retryWrites=true&w=majority';

const app = express();

// Convert request body to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json('Server is working');
});

app.post('/singin', async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.create({ name, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log('App started and listen port', PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();
