const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000;
const app = express();

app.use(express.json());
app.use(cors())


const taskRoutes = require('./Routes/TaskRoutes');

const uri = "mongodb+srv://techhubuser:XURJ1A5aT2yDOfcr@cluster0.wrmw0mh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
        await client.connect();
        app.locals.db = client.db("tasktrail");

        app.get('/', (req,res) => {
            res.send('running')
        })

        app.use('/tasks',taskRoutes);
        app.listen(5000, () => {
            console.log(`Server is running on port 5000`);
        });
    } finally {
    }
}
run().catch(console.dir);