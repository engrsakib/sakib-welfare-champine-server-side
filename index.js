const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//server run or not
app.get("/", (req, res) => {
  res.send("donation server is running");
});

app.listen(port, ()=>{
    console.log(`coffee server is running on port ${port}`);
})