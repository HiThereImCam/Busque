import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/splash.css";

class Splash extends Component {
  render() {
    return (
      <div className="splash-container">
        <div className="splash-intro">
          <div className="splash-header-container">
            <div></div>
          </div>
          <div className="splash-img">
            <img
              src="https://busque-dev.s3-us-west-2.amazonaws.com/Splash_Background_2.jpg"
              className="background_img"
              alt="pin"
            ></img>
          </div>

          <div className="intro-container">
            <h1>Busque</h1>
            <h3>Busk anytime and anywhere.</h3>
            <Link to="/login" />
          </div>
        </div>
        <section></section>
        <section></section>
      </div>
    );
  }
}

export default Splash;
