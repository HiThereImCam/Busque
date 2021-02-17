import React from "react";
import { Link } from "react-router-dom";
import "../../css/engineers.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Searchbar from "../searchbar/searchbar_container";
// import { openNavModal } from "../../actions/nav_actions";

class Engineers extends React.Component {
  render() {
    return (
      <div className="engineer-page">
        {/* <Link to="/">Back to Map</Link> */}
        <div className="user-show-header">
          <GiHamburgerMenu
            size={25}
            onClick={() => {
              this.props.openNavModal();
            }}
            className="engineer-menu-icon-other"
          />
          <Link className="engineer-header-h1" to={"/"}>
            <h1 className="engineer-header-logo">Busque</h1>
          </Link>
        </div>
        <div className="engineer-block">
          <div className="engineer">
            <div>Cameron Tanjoco</div>
            <p>Project Lead</p>
            <div className="engineer-icons">
              <a
                className="engineer-icon-linkedin"
                href="https://www.linkedin.com/in/cameron-tanjoco-8ba612a3/"
                target="_blank"
              >
                <i className="fab fa-linkedin fa-x3"></i>
              </a>
              <a
                className="engineer-icon-github"
                href="https://github.com/HiThereImCam"
                target="_blank"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          <div className="engineer">
            <div>Alana Shannon</div>
            <p>Frontend Lead</p>
            <div className="engineer-icons">
              <a
                className="engineer-icon-linkedin"
                href="https://www.linkedin.com/in/alana-shannon/"
                target="_blank"
              >
                <i className="fab fa-linkedin fa-x3"></i>
              </a>
              <a
                className="engineer-icon-github"
                href="https://github.com/alanashannon"
                target="_blank"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          <div className="engineer">
            <div>David Elrod</div>
            <p>Backend Lead</p>
            <div className="engineer-icons">
              <a
                className="engineer-icon-linkedin"
                href="https://www.linkedin.com/in/thedavidelrod/"
                target="_blank"
              >
                <i className="fab fa-linkedin fa-x3"></i>
              </a>
              <a
                className="engineer-icon-github"
                href="https://github.com/thedavidelrod"
                target="_blank"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          <div className="engineer">
            <div>Maxbryan Cosmosse</div>
            <p>Flex Assistant</p>
            <div className="engineer-icons">
              <a
                className="engineer-icon-linkedin"
                href="https://www.linkedin.com/in/maxbryan-cosmosse-94055416a/"
                target="_blank"
              >
                <i className="fab fa-linkedin fa-x3"></i>
              </a>
              <a
                className="engineer-icon-github"
                href="https://github.com/mcosmosse"
                target="_blank"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Engineers;
