import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "../app.css";
import userlogo from "../employee.png";
import organiserlogo from "../manager.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
let { GoogleLogin } = require("react-google-login");

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Hackathon Manager
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  let history = useHistory();

  const [userlogged, setUserlogged] = useState(false);

  const [loginform, setLoginform] = useState({
    username: "",
    password: "",
  });

  const [typeOfUser, settypeOfUser] = useState({
    selected : false,
    type : "Participant"
  });
  const classes = useStyles();

  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    axios
      .post("/login", {
        firstname: response.profileObj.givenName,
        lastname: response.profileObj.familyName,
        username: response.profileObj.email,
        googleauth: response.profileObj.googleId,
        usertype : typeOfUser.type
      })
      .then((resdata) => {
        console.log(resdata);
        if (resdata.data.authenticatedflag == true && resdata.data.usertype ==="Participant") {
          history.push("/dashboarduser");
        }
        else if (resdata.data.authenticatedflag == true && resdata.data.usertype ==="Organizer") {
          history.push("/dashboardorganiser");
        }
        else {
          alert("Wrong credentials");
        }
      })
      .catch((err) => {
        alert("Server Error");
      });
  };

  const loginuser = () => {
    axios
      .post("http://localhost:5000/login", {
        username: loginform.username,
        password: loginform.password,
      })
      .then((res) => {
        return res;
      })
      .then((resdata) => {
        if (resdata) {
          history.push("/dashboarduser");
        }
      })
      .catch(() => {
        alert("Server Error");
      });
  };

  return typeOfUser.selected === false ? (
    <div className={"enduserselectpage"}>
      <span className={"card"}>
        <img src={userlogo} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            settypeOfUser({
              selected : true,
              type : "Participant"
            });
          }}
        >
          Participant
        </Button>
      </span>
      <span className={"card"}>
        <img src={organiserlogo} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            settypeOfUser({
              selected : true,
              type : "Organizer"
            });
          }}
        >
          Organiser
        </Button>
      </span>
    </div>
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <GoogleLogin
          clientId="943118690301-pji32ov8iirj0jpg739dopds55aqqcgo.apps.googleusercontent.com"
          render={(renderProps) => (
            <button
              className={"googleauth"}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Continue with Google
            </button>
          )}
          buttonText="Continue with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <form className={classes.form} Validate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onclick={loginuser}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
