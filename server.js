const express = require("express")

const app = express();
const mongoose =  require("mongoose")
require("dotenv").config()

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection

db.on('error' ,(error) => console.log(error))
db.once('open' ,() => console.log("connected"))


// allowed json as req/res
app.use(express.json())
const UserRouter = require("./routers/user")
//every time we want to access routes that must be there!.
app.use('/api' , UserRouter)

const Port  = process.env.PORT|| 3000

app.listen(Port,()=>{
    console.log("server are running");
})