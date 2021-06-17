import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";

import Login from "./user/Login";
import Register from "./user/Register";
import Home from "./core/Home";

const Routes = () => {
  return (
    <Router className="App">
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
