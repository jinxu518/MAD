const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'madHomework2';
const client = new MongoClient(url);

async function connectDB() {
    try {
        client.connect();
        console.log('db connected');
    } catch (error) {
        console.log('error');
    }
}
connectDB();
// i don't know how to updateOne teacher without any data,so i add school first
app.post('/schools', async (req, res) => {
    try {
        const name = req.body;
        const db = client.db(dbName);
        const result = await db.collection.insertOne(name)
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "DB ERROR" });
    }
})

// 1. Add teacher
app.put('/schools/:schoolId/teachers', async (req, res) => {
    try {
        const { schoolId } = req.params;
        const { name } = req.body;
        const teacher = { _id: new ObjectId(), name }
        const db = client.db(dbName);
        const result = await db.collection('schools').updateOne(
            { _id: new ObjectId(schoolId) }, { $push: { teachers: teacher } }
        );
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "DB ERROR" });
    }
})
// 2. Update teacher
app.put('/schools/:schoolId/teachers/:teacherId', async (req, res) => {
    try {
        const { schoolId, teacherId } = req.params;
        const updatedTeacherName = req.body.name;
        const db = client.db(dbName);
        const result = await db.collection('schools').updateOne(
            { _id: new ObjectId(schoolId) },
            { $set: { 'teachers.$[t].name': updatedTeacherName } },
            { arrayFilters: [{ 't._id': new ObjectId(teacherId) }] }
        );
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "DB ERROR" });
    }
});
// 3. Delete teacher
app.delete('/schools/:schoolId/teachers/:teacherId', async (req, res) => {
    try {
        const { schoolId, teacherId } = req.params;
        const db = client.db(dbName);
        const result = db.collection('schools').updateOne(
            { _id: new ObjectId(schoolId) },
            { $pull: { teachers: { _id: new ObjectId(teacherId) } } }
        );
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "DB ERROR" });
    }
});

// i don't know how to updateOne student without any data,so i add course first
app.put('/schools/:schoolId/courses', async (req, res) => {
    try {
        const { schoolId } = req.params;
        const { title } = req.body;
        const db = client.db(dbName);
        const course = { _id: new ObjectId(), title, students: [] };
        const result = await db.collection('schools').updateOne(
            { _id: new ObjectId(schoolId) },
            { $push: { courses: course } }
        )
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "DB ERROR" });
    }
})
// 4. Add a new student to specific course
app.put('/schools/:schoolId/:courseId/students', async (req, res) => {
    try {
        const { schoolId, courseId } = req.params;
        const { name } = req.body;
        const db = client.db(dbName);
        const student = { _id: new ObjectId(), name };
        const result = await db.collection('schools').updateOne(
            { _id: new ObjectId(schoolId), 'courses._id': new ObjectId(courseId) },
            { $push: { 'courses.$.students': student } }
        )
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "DB ERROR" });
    }
})
// 5. Update a student's name
app.put('/schools/:schoolId/courses/:courseId/students/:studentId', async (req, res) => {
    try {
        const { schoolId, courseId, studentId } = req.params;
        const { name } = req.body;
        const db = client.db(dbName);
        const result = await db.collection('schools').updateOne(
            { _id: new ObjectId(schoolId) },
            { $set: { 'courses.$[c].students.$[s].name': name } },
            {
                arrayFilters: [
                    { 'c._id': new ObjectId(courseId) },
                    { 's._id': new ObjectId(studentId) }
                ]
            }
        )
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "DB ERROR" });
    }
})
// 6. Delete a student
app.delete('/schools/:schoolId/courses/:courseId/students/:studentId', async (req, res) => {
    try {
        const { schoolId, courseId, studentId } = req.params;
        const db = client.db(dbName);
        const result = await db.collection('schools').updateOne(
            { _id: new ObjectId(schoolId), 'courses._id': new ObjectId(courseId) },
            { $pull: { 'courses.$.students': { _id: new ObjectId(studentId) } } }
        );
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "DB ERROR" });
    }
})

app.listen(port, () => console.log(`Server is running on port ${port}`))