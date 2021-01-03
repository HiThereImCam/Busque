import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Route } from 'react-router-dom'
import { Switch } from "react-router-dom";
import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import UserShowContainer from './user/user_show_container';
import "../css/app.css";

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path={`/profile/:userId`} component={UserShowContainer} />
    </Switch>
  </div>
);

export default App;
