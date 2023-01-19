const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
  retry_strategy: () => 1000
});
client.set("visits", 0)

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("Number of vists is " + visits); 
    client.set("visits", parseInt(visits) + 1)
  })
})

const start = () => {
  try {
    app.listen(5000, () =>
      console.log(`Server is listening on port 5000`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();