const { MongoClient } = require('mongodb');
async function connectDB() {
    try {
        let uri = "mongodb+srv://mobile:zjx1710198939@cluster0.ediczdw.mongodb.net/"
        const client = new MongoClient(uri);
        await client.connect();
        console.log('DB connected')
    } catch (error) {
        console.log(error)
    }
}
connectDB();
