const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();
//

//middleware
app.use(cors());
app.use(express.json());

// mongoDB server cannected

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.63kgb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // database filed create
    const donationCallection = client.db("donationDB").collection("users");

    // user related query
    // get users
    app.get("/users/:mail", async (req, res) => {
      const email = req.params.mail;
      console.log(email);
      const cursor = donationCallection.find().filter({ mail: email });
    //   console.log(cursor);
      const result = await cursor.toArray();
      res.send(result);
    //   console.log(result);
    });
    // user added in database
    app.post("/users", async (req, res) => {
      const newUser = req.body;
    //   console.log(newUser);
      const result = await donationCallection.insertOne(newUser);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//server run or not
app.get("/", (req, res) => {
  res.send("donation server is running");
});

app.listen(port, () => {
  console.log(`coffee server is running on port ${port}`);
});
