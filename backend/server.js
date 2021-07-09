const express = require('express')
const cors = require('cors')
const app =express();
const mongoose = require('mongoose')
const connection = mongoose.connection;
const port = 5000;
const bcrypt = require('bcrypt')

mongoose.connect('mongodb+srv://rohan:nayak@runtimeterror7.b37vj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.once('open',()=>{
    console.log("Connected To MongoDB Server")
})
mongoose.connection.on('error',(ERRORS)=>{
    console.log(ERRORS)
})


app.use(cors())

app.use(express.json());


const User = new mongoose.Schema({
    firstname : {
        type : String,
        required: true
    },
    lastname: {
        type : String,
        required : true
    },
    username:{
        type: String,
        required : true
    },
    password:{
        type: String,
    },
    usertype:{
        type : String,
        required: true
    }
})
const UserModel = mongoose.model('users',User)
const salt = bcrypt.genSaltSync(10);
app.post("/register", (req, res) => {
    console.log(req.body)
    let encryptedPassword = bcrypt.hashSync(req.body.password,salt)
    let username = req.body.username

    UserModel.find({ username : `${username}` }).exec(
        (err,user)=>{

            console.log(user)
            if(err){
                console.log("Error!")
            }
            if(user.length === 0){
                const newUser = new UserModel({
                    firstname : req.body.firstname,
                    lastname : req.body.lastname,
                    username : req.body.username,
                    password : encryptedPassword,
                    usertype: req.body.usertype
                })
                newUser.save();
                res.send("Successfully Registered,Please Login")
            }
            if(user.length !==0 ){
                res.send("User Already exists")
            }
        }
    );
});





app.get('/',(req,res)=>{
    res.send(`Server Side of RuntimeTerror Response from port ${port} `)
})

app.listen(port,()=>{
    console.log(`The Server is Listening on port ${port}`)
})
