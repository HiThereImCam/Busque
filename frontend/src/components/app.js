import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import NavModalContainer from "./navigation/nav_modal_container";
import MainPageContainer from "./main/main_page_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import UserShowContainer from "./user/user_show_container";
import "../css/app.css";

const App = () => (
  <div className="app-container">
    <NavModalContainer />
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute
        exact
        path={`/profile/:userId`}
        component={UserShowContainer}
      />
      <Route exact path="/" component={MainPageContainer} />
    </Switch>
  </div>
);

export default App;
