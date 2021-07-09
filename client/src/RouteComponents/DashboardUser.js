import React from "react";
import "../../src/app.css";
import Button from "@material-ui/core/Button";

const DashboardUser = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <Button variant="contained" color="primary">
          option1
        </Button>
        <Button variant="contained" color="primary">
          option1
        </Button>
        <Button variant="contained" color="primary">
          option1
        </Button>
        <Button variant="contained" color="primary">
          option1
        </Button>
        <Button variant="contained" color="primary">
          option1
        </Button>
      </div>
      <div className="dashnavbar">
        <Button variant="contained" color="primary">
          sign out
        </Button>
      </div>
      <div className="dashmain">
        <h1>main content</h1>
      </div>
    </div>
  );
};

export default DashboardUser;
