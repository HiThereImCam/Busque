import React, { Component, Fragment } from "react";
// import Mapbox from "../mapbox/mapbox";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../css/main_page.css";

class MainPage extends Component {
  render() {
    let { openNavModal } = this.props;

    return (
      <Fragment>
        <div className="menu-container">
          <div>
            <GiHamburgerMenu
              size={17}
              onClick={() => {
                openNavModal();
              }}
              className="menu-icon"
            />
          </div>
        </div>
        {/* <Mapbox /> */}
      </Fragment>
    );
  }
}
export default MainPage;
