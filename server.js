const http = require('http');
const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();

const PORT = 5000;

const corsOptions = {
  origin: 'https://loginreactnode.onrender.com',
};

app.use(cors(corsOptions));

app.use(express.static('build'));

const uri = "mongodb+srv://colincressman:JQpzLOcFQsCv1f6y@cluster0.dtxujo0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
	serverApi: {
		version: '1',
		strict: true,
		deprecationErrors: true,
	},
	maxPoolSize: 10,
});

client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.error('Error connecting to MongoDB', err));

const db = client.db("UserLoginTemplate");
const collection = db.collection("UserLoginData");

app.post('/login', async (req, res) => {
    try {
		console.log('login!');
        const { username, password } = req.body;

        const user = await collection.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password1 } = req.body;

        const existingUser = await collection.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
		
		const hashedPassword = await bcrypt.hash(password1, 10);

        const result = await collection.insertOne({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
});

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});