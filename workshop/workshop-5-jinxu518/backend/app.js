const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'workshop5';
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

app.post('/departments', async (req, res) => {
    try {
        const department = req.body;
        const db = client.db(dbName);
        const result = await db.collection('departments').insertOne(
            department)
        res.status(201).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'DB ERROR' });
    }
})

app.get('/departments/:department_code/courses', async (req, res) => {
    const departmentCode = req.params.department_code;
    const db = client.db(dbName);
    try {
        const department = await db.collection('departments').findOne({ _id: new ObjectId(departmentCode) });
        res.status(200).json(department.courses);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/departments/:department_code/courses', async (req, res) => {
    const newCourse = req.body;
    const db = client.db(dbName);
    newCourse._id = new ObjectId();
    console.log(newCourse);
    try {
        const result = await db.collection('departments').updateOne(
            { _id: new ObjectId(req.params.department_code) },
            { $push: { courses: newCourse } }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.patch('/departments/:department_code/courses/:course_code', async (req, res) => {
    const departmentCode = req.params.department_code;
    const courseCode = req.params.course_code;
    const updatedCourse = req.body;
    const db = client.db(dbName);
    try {
        const result = await db.collection('departments').updateOne(
            { _id: new ObjectId(departmentCode), "courses._id": new ObjectId(courseCode) },
            {
                // if set all then it will missing _id
                //  like this :$set: { 'courses.$': updatedCourse }
                $set: {
                    'courses.$.title': updatedCourse.title,
                    'courses.$.faculty': updatedCourse.faculty,
                    'courses.$.code': updatedCourse.code
                }
            }
        );
        console.log(result);
        res.status(200).json({ updatedCourse });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/departments/:department_code/courses/:course_code', async (req, res) => {
    const departmentCode = req.params.department_code;
    const courseCode = req.params.course_code;
    console.log(courseCode);
    const db = client.db(dbName);
    try {
        const result = await db.collection('departments').updateOne(
            { _id: new ObjectId(departmentCode) },
            { $pull: { courses: { _id: new ObjectId(courseCode) } } }
        );
        res.status(204).end();
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/departments/:department_code/courses/:course_code/reviews', async (req, res) => {
    const departmentCode = req.params.department_code;
    const courseCode = req.params.course_code;
    const newReview = req.body;
    newReview._id = new ObjectId();
    const db = client.db(dbName);

    try {
        const result = await db.collection('departments').updateOne(
            { _id: new ObjectId(departmentCode), "courses._id": new ObjectId(courseCode) },
            { $push: { 'courses.$.reviews': newReview } }
        );

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/departments/:department_code/courses/:course_code/reviews', async (req, res) => {
    const departmentCode = req.params.department_code;
    const courseCode = req.params.course_code;

    const db = client.db(dbName);

    try {
        const department = await db.collection('departments').findOne({ _id: new ObjectId(departmentCode) });
        const course = department.courses.find(course => course._id.toString() === courseCode);
        const reviews = course.reviews || [];

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.patch('/departments/:department_code/courses/:course_code/reviews/:review_id', async (req, res) => {
    const departmentCode = req.params.department_code;
    const courseCode = req.params.course_code;
    const reviewId = req.params.review_id;
    const updatedReview = req.body;

    const db = client.db(dbName);

    try {
        const result = await db.collection('departments').updateOne(
            { _id: new ObjectId(departmentCode), "courses._id": new ObjectId(courseCode) },
            { $set: { 'courses.$.reviews.$[elem]': updatedReview } },
            { arrayFilters: [{ "elem._id": new ObjectId(reviewId) }] }
        );

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/departments/:department_code/courses/:course_code/reviews/:review_id', async (req, res) => {
    const departmentCode = req.params.department_code;
    const courseCode = req.params.course_code;
    const reviewId = req.params.review_id;

    const db = client.db(dbName);

    try {
        const result = await db.collection('departments').updateOne(
            { _id: new ObjectId(departmentCode), "courses._id": new ObjectId(courseCode) },
            { $pull: { 'courses.$.reviews': { _id: new ObjectId(reviewId) } } }
        );

        res.status(204).end();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
