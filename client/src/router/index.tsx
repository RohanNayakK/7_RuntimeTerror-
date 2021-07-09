import {lazy, Suspense, useEffect, useState} from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import {useHistory} from 'react-router-dom'

const Router = () => {
    const history=useHistory();
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
          </Route>
      </Switch>
    </Suspense>
  );
};

export default Router;
