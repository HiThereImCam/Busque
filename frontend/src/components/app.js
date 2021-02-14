import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import NavModalContainer from "./navigation/nav_modal_container";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import UserShowContainer from "./user/user_show_container";
import MapBoxContainer from "./mapbox/mapbox_container";
import UserIndexContainer from "./user/user_index_container";
import VenueIndexContainer from "./venue/venue_index_container";
import VenueModalContainer from "./mapbox/venue_modal_container";

import EngineersContainer from "./user/engineers_container";
import "../css/app.css";

const App = () => (
  <div className="app-container">
    <NavModalContainer />
    <VenueModalContainer />
    <Switch>
      <Route exact path="/engineers" component={EngineersContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute
        exact
        path={`/profile/:userId`}
        component={UserShowContainer}
      />
      {/* <Route exact path="/venues/venue-modal" component={VenueModalContainer} /> */}
      <Route exact path="/venues" component={VenueIndexContainer} />
      <Route exact path="/users" component={UserIndexContainer} />
      <Route exact path="/" component={MapBoxContainer} />
    </Switch>
  </div>
);

export default App;
