import React, { Component } from "react";
import Mapbox from "../mapbox/mapbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../../css/header.css";
import mapboxgl from 'mapbox-gl'; 
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }

    this.openSearchModal = this.openSearchModal.bind(this);
    this.closeSearchModal = this.closeSearchModal.bind(this); 
  }

  openSearchModal() {
    this.setState({ open: true })
    console.log("hello")
  }

  closeSearchModal() {
    this.setState({ open: false })
  }
  
  render() {
    return (
      <div>
        <header className="header">
          {/* <div className="header-left">
            <div className="hamburger">
              <FontAwesomeIcon onClick={this.openSearchModal} className="fas faBars fa-2x" icon={faBars} />
            </div>
          </div> */}
          {/* <div className="header-right">
            <Link className="login-button" to={"/login"}>Login</Link>
          </div> */}
        </header>  
        <Mapbox />
      </div>
    );
  }
}

export default MainPage;

