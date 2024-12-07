const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );

    // database filed create
    const donationCallection = client.db("donationDB").collection("users");

    // user related query
    // get users
    app.get("/users/:mail", async (req, res) => {
      const email = req.params.mail;
      //   console.log(email);
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

    // donation related work
    const Dcalection = client.db("donatin_server").collection("donation");
    // insert database
    app.post("/donations", async (req, res) => {
      const newDonation = req.body;
      const result = await Dcalection.insertOne(newDonation);
      res.send(result);
    });
    // get database
    app.get("/donations", async (req, res) => {
      const cursor = Dcalection.find();
      const result = await cursor.toArray();
      res.send(result);
    });


    // ascending sort
    app.get("/donations/sorted", async (req, res) => {
        const cursor = Dcalection.find().sort({ minimumMoney: 1 });
        const result = await cursor.toArray();
        res.send(result);
    });
 


    // sort by date and time

    // const { ObjectId } = require("mongodb");
    // const moment = require("moment-timezone");

    app.get("/activeDonations", async (req, res) => {
      
        const currentDate = new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Dhaka",
        });

        const cursor = Dcalection.find({
          deadline: { $gt: currentDate },
        }).limit(6);

        const result = await cursor.toArray();
        res.send(result);
    });

    // deatils data fetch
    app.get("/donations/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = Dcalection.find().filter({ _id: new ObjectId(id) });
      const result = await cursor.toArray();
      res.send(result);
    });

    // my donation get
    app.get("/myDonations/:mail", async (req, res) => {
      
        const email = req.params.mail;

        const result = await Dcalection.find({ mail: email }).toArray();
        res.send(result);
      
    });
    // delete current user camp
    app.delete("/myDonations/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await Dcalection.deleteOne(query);
      res.send(result);
    });

    // UPDATE MY CAMP
    app.get("/donationsUpadte/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await Dcalection.findOne(query);
      res.send(result);
    });

    app.put("/donationsUpadte/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: new ObjectId(id) };
      const optional = { upsert: true };
      const updated = req.body;
      const updatedData = {
        $set: {
          deadline: updated.deadline,
          minimumMoney: Number(updated.minimumMoney),
          title: updated.title,
          photoURL: updated.photoURL,
          type: updated.type,
          moneyNedd: Number(updated.moneyNedd),
          description: updated.description,
        },
      };
      const result = await Dcalection.updateOne(query, updatedData, optional);
      res.send(result);
    });

    // my Donations added
    // myMoney
    const myFund = client.db("my_donatin_server").collection("my_Donation");
    app.post("/myMoney", async (req, res) => {
      const newDonation = req.body;
      const result = await myFund.insertOne(newDonation);
      res.send(result);
    });
    app.get("/myMoney/:mail", async (req, res) => {
      try {
        const email = req.params.mail;

        const result = await myFund.find({ email: email }).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
      }
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
