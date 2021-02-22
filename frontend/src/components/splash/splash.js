import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../css/splash.css";

class Splash extends Component {
  render() {
    return (
      <div className="splash-container">
        <div className="splash-intro">
          <div className="splash-header-container">
            <div className="splash-header">
              <div className="splash-h1">
                <h1>Busque</h1>
              </div>
              <div className="splash-link">
                <Link to="/login" className="splash-login">
                  Log in
                </Link>
              </div>
            </div>
          </div>
          <div className="splash-img">
            <img
              src="https://busque-dev.s3-us-west-2.amazonaws.com/Splash_Background_2.jpg"
              className="background_img"
              alt="pin"
            ></img>
          </div>

          <div className="intro-container">
            <h2>Art is made for the streets.</h2>
            <h2>Busk anytime and anywhere with Busque.</h2>
          </div>
        </div>
        <div className="splash-checkin">
          <img src="https://busque-dev.s3-us-west-2.amazonaws.com/CheckIn+Collage.jpg"></img>
        </div>
        <section></section>
      </div>
    );
  }
}

export default Splash;
