require("./src/config/env")

const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const path = require("path"); 

const app = express()
const PORT = process.env.PORT || 5000

require('dotenv').config()
const simulateRoute = require('./src/routes/simulate');
// const vcdRoute = require('./routes/vcd.cjs')




app.use(cors())
app.use(express.json())
app.use("/api", require("./src/routes/auth"));


if (!process.env.MONGODB_URL) {
  throw new Error("❌ MONGODB_URL is not defined in env");
}

mongoose
  .connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.get('/', (req,res) => {
    res.send("backend running...")
    console.log("running")
}) 
app.use("/api", simulateRoute);

// app.use('/simulations', express.static(path.join(__dirname, 'simulations')));
app.use(
  "/simulations",
  express.static(path.join(process.cwd(), "src", "simulations"))
);
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})