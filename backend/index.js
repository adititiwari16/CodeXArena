const mongoose = require('mongoose');
const express = require('express');
const app = express();
const {DBConnection} = require('./database/db.js');
const User = require('./models/users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const Problem = require('./models/problems.js');

// Enable CORS for all origins
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow cookies to be sent
}));

dotenv.config()

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true }));
DBConnection();

app.get("/", (req, res)=>{
    res.send("Welcome to the app!");
})

app.get("/home", (req, res)=>{
    res.send("welcome to home");
})

app.post("/register", async (req, res) => {
    console.log('Received registration data:', req.body);
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            console.error('Validation error: Missing required fields');
            return res.status(400).send("Please enter all the required fields");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('Validation error: User already exists');
            return res.status(400).send("User already exists!");
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        console.log('Hashed password:', hashPassword);

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword
        });

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1hr"
        });
        user.token = token;
        user.password = undefined;

        res.status(201).json({
            message: "You have successfully registered!",
            user,
            token
        });

    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/signin", async (req, res) => {
    try {
        //get all the user data
        const { email, password } = req.body;

        // check that all the data should exists
        if (!(email && password)) {
            return res.status(400).send("Please enter all the information");
        }

        //find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found!");
        }

        //match the password
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;

        //store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, 
        };

        //send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error.message);
    }
    
});

// Create a new problem
app.post('/problems', async (req, res) => {
    const { problem_id, name, difficulty, topic, description, sample_input, sample_output, constraints } = req.body;
    
    if (!problem_id || !name || !difficulty || !topic || !description || !sample_input || !sample_output || !constraints) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const newProblem = new Problem({
        problem_id,
        name,
        difficulty,
        topic,
        description,
        sample_input,
        sample_output,
        constraints,
      });
  
      await newProblem.save();
      res.status(201).json(newProblem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create problem' });
    }
  });
  

// Get all problems
app.get('/problems', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific problem
app.get('/problems/:problem_id', async (req, res) => {
  const { problem_id } = req.params;
  try {
    const problem = await Problem.findOne({ problem_id });
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a problem
app.put('/problems/:id', async (req, res) => {
    const { id } = req.params;
    const { name, difficulty, topic, description, sample_input, sample_output, constraints } = req.body;
  
    try {
      const updatedProblem = await Problem.findOneAndUpdate(
        { problem_id: id },
        { name, difficulty, topic, description, sample_input, sample_output, constraints },
        { new: true }
      );
  
      if (!updatedProblem) {
        return res.status(404).json({ error: 'Problem not found' });
      }
  
      res.status(200).json(updatedProblem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update problem' });
    }
  });
  
// Delete a problem
app.delete('/problems/:problem_id', async (req, res) => {
  const { problem_id } = req.params;

  try {
    const problem = await Problem.findOneAndDelete({ problem_id });
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  
app.listen(8000, ()=>{
    console.log("server is listening on port 8000");
})