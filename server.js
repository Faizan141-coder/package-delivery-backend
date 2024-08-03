const express = require ("express")
const mongoose = require ("mongoose")
const cors = require("cors");

const app = express()
require("dotenv").config()
app.use(express.json())
app.use(cors());

const ticketRoutes = require("./routes/ticketRoutes")
const authRoutes = require("./routes/authRoutes")

app.use("/tickets",ticketRoutes)
app.use("/auth",authRoutes)



mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server is Running")
    })
    
})
.catch((error)=>{
    console.log(error)
}
)





















































































