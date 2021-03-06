import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {mainListItems,secondaryListItems} from './listitems2'
import Button from '@material-ui/core/Button';
import HostHackathonform from "./hostHackathonform";
import {useHistory} from 'react-router-dom'
import Displayhack from "./displayhack";
import {BrowserRouter as Router,Route,Link,Switch} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Hackathon Manager
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function DashboardUser() {

    const [value, setValue] = React.useState({});

    const handleChange = (e) => {
        let newreg = {...value}
        newreg[e.target.id] = e.target.value;
        setValue(newreg)
    };




    const [hackarray,setHackarray]=useState([])
    useEffect( ()=> {
        fetch("http://localhost:5000/dashboarduser")
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((resdata) => {
                console.log(resdata)
                setHackarray(resdata)
            })
    },[])






    let history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const showform=()=>{
        document.querySelector('.hostform').style.display = 'flex'

    }
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const signoutfunc=()=>{
        history.push('/')
    }

    const[finaltext,setfinaltext] =useState("")
    const selhackjoin=()=>{
        let currenthackathon = document.getElementById("selected");
        setfinaltext( currenthackathon.innerText)
    }

    const joinhack=(e)=>{
        e.preventDefault();
        axios.post("/partipantadd",{
            name : value.name,
            email : value.email,
            phoneno : value.phoneno,
            teamname : value.teamname,
            college : value.college,
            degree : value.degree,
            options : value.options,
            hackathon : finaltext
        }).then((res)=>{

        })
            .catch(()=>{

            })
    }

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];



    return (
        <Router>
            <Switch>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Hackathon Manger Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Button variant="contained" color="primary"
                    onClick={signoutfunc}
                    >
                        Sign out
                    </Button>
                </Toolbar>

            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <Route exact path={'/dashboarduser'}>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                            <div><h1>Live Hackathons</h1></div>
                    <div>
                        <p><a href={"https://google.com"} target='_blank'>Visit Website</a></p>

                        <Link style={{ textDecoration: 'none' }} to={"/dashboarduserselec"}>
                                {
                                    hackarray.map(item=>(
                                        <>
                                        <div className={"hackathoncards"}>
                                            <img src={"https://cdn.ymaws.com/siim.org/resource/resmgr/hackathon/Hackathon-500x286.png"}/>
                                            <div className={"lastdivcard"}  style={{width:"50%",justifyContent:"flex-start"}}>
                                                <div id={"selected"}>{item.name}</div>
                                                <div>Organiser :{item.organisername}</div>
                                                <div>Description : {item.desc}</div>

                                            </div>

                                            <div className={"lastdivcard"}>
                                                <div> Fees : Rs {item.fees}</div>
                                                <Button variant="contained" color="primary"
                                                        onClick={(e)=>selhackjoin(e)}
                                                >
                                                    Join Now
                                                </Button>
                                            </div>
                                        </div>
                                        </>

                                    ))
                                }
                            </Link>

                        <p><a href={"https://google.com"} target='_blank'>Visit Website</a></p>
                    </div>





                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
            </Route>
            <Route path={"/dashboarduserselec"}>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="sm" className={classes.container}>
                        <h1 id={"hackformreg"}>Registeration for {finaltext} </h1>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Phone Number"
                                id="phoneno"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="College"
                                id="college"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Degree"
                                id="degree"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Team Name"
                                id="teamname"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="options"
                                label="Additional Option"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={joinhack}
                            >
                                Join Now
                            </Button>

                        </form>
                    </Container>
                </main>
            </Route>

        </div>

            </Switch>
        </Router>
    );
}


















