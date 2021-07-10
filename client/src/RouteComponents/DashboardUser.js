import React from "react";
import "../../src/app.css";
import Button from "@material-ui/core/Button";
import applogo from "../hackathon.png";
import { useHistory } from "react-router";
import MediaCard from "./dashcards";
import axios from "axios";
import { useEffect, useState } from "react";

const DashboardUser = () => {
  let history = useHistory;
  const [hackathon, setHackathons] = useState([
    {
      name: "Hackostav",
      info: " Hello world",
    },
  ]);
  useEffect(() => {
    fetch("http://localhost:5000/dashboarduser")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((resdata) => {
        setHackathons(resdata);
      });
  }, []);
  return (
    <div className="dashboard">
      <div className="sidebar">
        <Button variant="contained" color="primary">
          Live Hackathons
        </Button>
        <Button variant="contained" color="primary">
          Your hackathons
        </Button>
        <Button variant="contained" color="primary">
          Review
        </Button>
        <Button variant="contained" color="primary">
          Shop
        </Button>
      </div>
      <div className="dashnavbar">
        <img src={applogo} height="10vh"></img>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/");
          }}
        >
          sign out
        </Button>
      </div>
      <div className="dashmain">
        {hackathon.map((item) => {
          <MediaCard name={item.name} info={item.info} />;
          console.log(hackathon);
        })}
      </div>
    </div>
  );
};

export default DashboardUser;
