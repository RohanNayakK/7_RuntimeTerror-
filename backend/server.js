const express = require('express')
const cors = require('cors')
const app =express();
const mongoose = require('mongoose')
const connection = mongoose.connection;
const port = 5000;

mongoose.connect('mongodb+srv://rohan:nayak@runtimeterror7.b37vj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.once('open',()=>{
    console.log("Connected To MongoDB Server")
})
mongoose.connection.on('error',(ERRORS)=>{
    console.log(ERRORS)
})


app.use(cors())

app.use(express.json());

app.get('/',(req,res)=>{
    res.send(`Server Side of RuntimeTerror Response from port ${port} `)
})

app.listen(port,()=>{
    console.log(`The Server is Listening on port ${port}`)
})
