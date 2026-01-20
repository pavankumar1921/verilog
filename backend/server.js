const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config()
const simulateRoute = require('./routes/simulate');
// const vcdRoute = require('./routes/vcd.cjs')

const app = express()
const PORT = process.env.PORT || 5000
const path = require("path"); 

app.use(cors())
app.use(express.json())
app.use("/api", require("./routes/auth"));



mongoose
  .connect("process.env.MONGO_URL", {
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

app.use('/simulations', express.static(path.join(__dirname, 'simulations')));
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})