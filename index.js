const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient();

client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("Number of vists is " + visits); 
    client.set("visits", parseInt(visits) + 1)
  })
})

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();