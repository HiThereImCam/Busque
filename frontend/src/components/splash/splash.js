import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../../css/splash.css";

class Splash extends Component {
  render() {
    return (
      <Fragment>
        <div className="splash-container">
          <div className="splash-header">
            <h1>Busque</h1>
            {this.props.isAuthenticated ? (
              <Link className="btn btn-rounded" to="/map">
                Explore Busque
              </Link>
            ) : (
              <Link className="btn btn-rounded" to="/login">
                Sign In
              </Link>
            )}
          </div>
          <div className="splash-content">
            <h2>Art is made for the streets.</h2>
            <h2>Busk anytime and anywhere with Busque.</h2>
          </div>
        </div>
        <section className="checkIn">
          <div className="checkIn_Container">
            <h2> Check in anytime and anywhere.</h2>
            <h4> Let the fans come to you.</h4>
          </div>
          <div className="checkIn_img">
            <img
              src="https://busque-dev.s3-us-west-2.amazonaws.com/Checkin_collage_3.jpg"
              alt="check in"
              className="img_checkin"
            ></img>
          </div>
        </section>
        <section className="checkIn">
          <div className="checkIn_Container">
            <h2>We don't have venues for your needs?</h2>
            <h4>Create your own venue with our built in search bar</h4>
          </div>
          <div className="create_img">
            <img
              src="https://busque-dev.s3-us-west-2.amazonaws.com/Chase_Center.jpg"
              alt="check in"
              className="img_checkin"
            ></img>
          </div>
        </section>
        <section className="checkIn">
          <div className="checkIn_Container">
            <h2>Connect with some of the greatest buskers in the world.</h2>
          </div>
          <div className="create_img">
            <img
              src="https://busque-dev.s3-us-west-2.amazonaws.com/Artists.jpg"
              alt="check in"
              className="img_checkin"
            ></img>
          </div>
        </section>
        <section className="checkIn">
          <div className="meetus_container">
            <h2>Want to contact the engineers behind Busque?</h2>
            <Link className="btn_2 btn-rounded_2" to="/engineers">
              Meet us
            </Link>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Splash;

/**
 *   <div className="splash-intro">
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
          <div className="intro-container">
            <h2>Art is made for the streets.</h2>
            <h2>Busk anytime and anywhere with Busque.</h2>
          </div>
        </div>
        <div className="splash-checkin"></div>
        <section></section>
 */

/**
  *  <div className="meetus_Container">
            <h2>Want to contact the engineers behind Busque?</h2>
            <Link className="btn_2 btn-rounded_2" to="/engineers">
              Meet us
            </Link>
          </div>
  */
