import React from "react";
import { Switch, Route } from "react-router";
import { ROUTE } from "./routes";
import Login from "./login";
import Dashboard from "./dashboard";
import Add from "./add";
import Edit from "./edit";
import { ErrorPage } from "./404Error";

const Main = () => {
    return <Switch>
        <Route exact={true} path={ROUTE.INDEX} component={Login} />
        <Route exact={true} path={ROUTE.DASHBOARD} component={Dashboard} />
        <Route exact={true} path={ROUTE.ADD} component={Add} />
        <Route exact={true} path={ROUTE.EDIT} component={Edit} />
        <Route component={ErrorPage} />
    </Switch>;
};

export default Main;
