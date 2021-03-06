const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const connection = mongoose.connection;
const port = 5000;
const bcrypt = require("bcrypt");



mongoose.connect(
  "mongodb+srv://rohan:nayak@runtimeterror7.b37vj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once("open", () => {
  console.log("Connected To MongoDB Server");
});
mongoose.connection.on("error", (ERRORS) => {
  console.log(ERRORS);
});

app.use(cors());

app.use(express.json());



let hackarray = [];

mongoose.connection.once('open',(err)=>{
  mongoose.connection.db.collection("hackthons",(err,collection)=>{
    collection.find({}).toArray((err,data)=>{
      for(let i=0;i<data.length;i++){
        hackarray.push(data[i])
      }
      console.log(hackarray)
    })
  })
})

app.get("/",(req, res) => {
res.json(hackarray)
})

app.get("/dashboarduser", (req, res) => {
  res.json(hackarray);
});


const User = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  usertype: {
    type: String,
    required: true,
  },
  googleauth: {
    type: String,
  },
});

const Hackathons = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  noofteams: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  organisername: {
    type: String,
    required :true
  },
  fees: {
    type: Number,
    required: true,
  },
  drivelink: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },

});
const HackathonModel = mongoose.model("hackthon", Hackathons);


const Participants = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  college: {
    type: String,
    required :true
  },
  degree: {
    type: String,
    required: true,
  },
  teamname: {
    type: String,
    required: true,
  },
  addtionalopt: {
    type: String,
    required: true,
  },
  hackathon: {
    type: String,
    required: true,
  },

});

const ParticipantModel = mongoose.model("participant", Participants);




app.post("/host",(req,res)=>{
  console.log("inside host server")
  const newHackathon = new HackathonModel({
    name: req.body.ename,
    noofteams: req.body.noofteams,
    desc: req.body.desc,
    organisername: req.body.oname,
    fees: req.body.fees,
    drivelink : req.body.drivelink,
    website : req.body.website
  });
  newHackathon.save();

})


app.post("/partipantadd",(req,res)=>{

  const newParticipant = new ParticipantModel({
    name: req.body.name,
    email: req.body.email,
    phoneno: req.body.phoneno,
    degree: req.body.degree,
    college: req.body.college,
    teamname : req.body.teamname,
    addtionalopt: req.body.options,
    hackathon : req.body.hackathon
  });
  console.log(newParticipant)
  newParticipant.save();
  res.send()
})





const UserModel = mongoose.model("users", User);
const salt = bcrypt.genSaltSync(10);
app.post("/register", (req, res) => {
  console.log(req.body);
  let encryptedPassword = bcrypt.hashSync(req.body.password, salt);
  let username = req.body.username;

  UserModel.find({ username: `${username}` }).exec((err, user) => {
    console.log(user);
    if (err) {
      console.log("Error!");
    }
    if (user.length === 0) {
      const newUser = new UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: encryptedPassword,
        usertype: req.body.usertype,
      });
      newUser.save();
      res.send("Successfully Registered,Please Login");
    }
    if (user.length !== 0) {
      res.send("User Already exists");
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  if (req.body.googleauth) {
    UserModel.findOne({ googleauth: `${req.body.googleauth}` }).exec(
      (err, user) => {
        if (user) {
          console.log(" user exists");
          res.send({
            message: "Logged In Suceesfully",
            loggedusername: `${user.username}`,
            authenticatedflag: true,
            usertype: req.body.usertype,
          });
        }
        if (!user) {
          if (req.body.googleauth) {
            console.log("inside google user condition");
            const newUser = new UserModel({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              username: req.body.username,
              googleauth: req.body.googleauth,
              usertype: req.body.usertype,
            });
            console.log(newUser);
            newUser.save();
            res.send({
              message: "Logged In Suceesfully",
              loggedusername: `${newUser.username}`,
              firstname: `${newUser.firstname}`,
              lastname: `${newUser.lastaname}`,
              authenticatedflag: true,
              usertype : newUser.usertype
            });
          }
        }
        if (err) {
          res.send({
            message: "Error",
            authenticatedflag: false,
          });
        }
      }
    );
  }

  UserModel.findOne({ username: `${username}` }).exec((err, user) => {
    if (err) {
      console.log("Error ");
    }
    if (user) {
      bcrypt.compare(req.body.password, user.password).then(async (match) => {
        console.log(match);
        if (match) {
          res.send({
            message: "Logged In Suceesfully",
            loggedusername: `${user.username}`,
            authenticatedflag: true,
          });
        }
        if (!match) {
          res.send({
            message: "Username or Password Credentials Wrong",
            authenticatedflag: false,
          });
        }
      });
    }

    if (user === null) {
      res.send({
        message: "User doesnt exist, Please register",
        authenticatedflag: false,
      });
    }
  });
});

app.get("/", (req, res) => {
  res.send(`Server Side of RuntimeTerror Response from port ${port} `);
});

app.listen(port, () => {
  console.log(`The Server is Listening on port ${port}`);
});
