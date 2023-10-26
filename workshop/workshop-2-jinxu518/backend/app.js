const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 5001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'madworkshop2';
const client = new MongoClient(url, { useUnifiedTopology: true });

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();

app.post('/schools', async (req, res) => {
    try {
        const school = req.body;
        const db = client.db(dbName);
        const result = await db.collection('schools').insertOne(school);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'DB ERROR' });
    }
});

app.get('/schools', async (req, res) => {
    try {
        const db = client.db(dbName);
        const result = await db.collection('schools').find({}).toArray();
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'DB ERROR' });
    }
});

app.put('/schools/:schoolId/students', async (req, res) => {
    try {
        const db = client.db(dbName);
        const { id, name, email } = req.body;
        const student = { _id: new ObjectId(id), name: name, email: email }
        const result = await db.collection('schools').updateOne(
            { _id: new ObjectId(req.params.schoolId) },
            { $push: { students: student } }
        )
        res.status(200).send({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'DB ERROR' });
    }
});

app.delete('/schools/:schoolId/students/:studentId', async (req, res) => {
    try {
        const db = client.db(dbName);
        const result = await db.collection('schools').updateOne(
            {
                _id: new ObjectId(req.params.schoolId),
            },
            { $pull: { students: { _id: new ObjectId(req.params.studentId) } } }
        )
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'DB ERROR' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
