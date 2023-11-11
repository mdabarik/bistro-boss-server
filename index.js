const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5555;

// middleware 
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://NewAdmin:NewAdmin@cluster0.waijmz7.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {

    const reviewCollection = client.db('BistroBoss').collection('reviews');
    app.get('/reviews', async(req, res) => {
        const result = await reviewCollection.find().toArray();
        res.send(result);
    })

    const menuCollection = client.db('BistroBoss').collection('menu');
    app.get('/menu', async(req, res) => {
        const result = await menuCollection.find().toArray();
        res.send(result);
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {}
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('server is running...');
})


app.listen(port, () => {
    console.log('server is running on port 5555');
})