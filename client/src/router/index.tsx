import {lazy, Suspense, useEffect, useRef, useState} from "react";
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
        <Route path={"/dashboarduser"}>
          <DashboardUser />
        </Route>
      </Switch>
    </Suspense>
  );

};

export default Router;
