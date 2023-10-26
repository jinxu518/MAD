const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require('cors');

let db = null;
const COLLECTION_NAME = "schools";
async function connectDB() {
  try {
    const uri = ""
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db('cs571-2023-10');
    console.log("DB connected")
  } catch (error) {
    console.log("DB error")
  }
}

connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.post("/schools", async (req, res) => {
  try {
    const school = req.body;
    const ret = await db.collection(COLLECTION_NAME).insertOne(school);
    res.send({success: true, data: ret});
  } catch (error) {
    res.status(500).send({success: false, error: "DB error"})
  }
})

app.put("/schools/:school_id/students", async (req, res) => {
  try {
    const student = req.body;
    student._id = new ObjectId();
    const ret = await db.collection(COLLECTION_NAME).updateOne(
      {_id: new ObjectId(req.params.school_id)},
      {
        $push: {students: student}
      }
    )
    res.send({success: true, data: ret});
  } catch (error) {
    res.status(500).send({success: false, error: "DB error"})
  }
})

app.get("/schools/:school_id/students", async (req, res) => {
  try {
    const ret = await db.collection(COLLECTION_NAME).findOne(
      {_id: new ObjectId(req.params.school_id)}
    );
    res.send({success: true, data: ret.students});
  } catch (error) { 
    res.status(500).send({success: false, error: "DB error"})
  }
})

app.listen(5001, () => console.log("listening on port 5001"))
