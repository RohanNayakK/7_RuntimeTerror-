import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import SignIn from "../RouteComponents/Signin";
import { useHistory } from "react-router-dom";
import SignUp from "../RouteComponents/signup";
import { Dashboard } from "@material-ui/icons";
import DashboardUser from "../RouteComponents/DashboardUser";
import Pricing from "../RouteComponents/pricing";
import Checkout from "../RouteComponents/checkout.js";
import DashboardOrganiser from "../RouteComponents/DashboardOrganiser";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";

const Router = () => {
  const history = useHistory();
  let currentpath = useHistory().location.pathname;

  return (
    <Suspense fallback={null}>
      <Styles />
      <Switch>
        {routes.map((routeItem) => {
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              exact={routeItem.exact}
              component={lazy(() => import(`../pages/${routeItem.component}`))}
            />
          );
        })}

        <Route path={"/signin"}>
          <SignIn />
        </Route>
        <Route path={"/pricing"}>
          <Pricing />
        </Route>
        <Route path={"/register"}>
          <SignUp />
        </Route>
        <Route path={"/checkout"}>
          <Checkout />
        </Route>
        <Route path={"/dashboarduser"}>
          <DashboardUser />
        </Route>
        <Route path={"/dashboardorganiser"}>
          <DashboardOrganiser/>
        </Route>
        <Route path={"/sponsors"}>
          <div className={"sponsors"}>
            <h1>Sponsors</h1>
            <img src={"http://citytech.eu/wp-content/uploads/2017/06/Sponsor-Citytech-2019-En.png"}/>
          </div>
        </Route>
        <Route path={"/reports"}>
          <div className={"sponsors"}>
            <h1>Reports</h1>
            <h1>Event: Hackotsav</h1>
            <p>Number Of Participants Registered : 1</p>
            <p>Degree : BE</p>
            <img src={"https://www.jqueryscript.net/images/JavaScript-Charts-With-SVG-xCharts.jpg"}/>
          </div>
        </Route>
        <Route path={"/shop"}>
          <div className={"sponsors"}>
            <h1>Shop</h1>

          </div>
        </Route>

      </Switch>
    </Suspense>
  );
};

export default Router;
