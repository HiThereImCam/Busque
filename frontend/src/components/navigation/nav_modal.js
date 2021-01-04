import React, { Component, Fragment, createRef } from "react";
import { Link } from "react-router-dom";
import { CgChevronDoubleLeft } from "react-icons/cg";
import "../../css/nav_modal.css";

class NavModal extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.modalChild = createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick(e) {
    try {
      if (this.modalChild.current.contains(e.target)) {
        return;
      }
    } catch (e) {
      return e;
    }

    this.handleClickOutside();
  }

  handleClickOutside() {
    this.props.closeNavModal();
  }

  render() {
    let { openNavModal, closeNavModal } = this.props;
    return (
      <Fragment>
        {openNavModal ? (
          <div className="modal-background modal-container">
            <div
              className="modal-child"
              ref={this.modalChild}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nav-container">
                <div className="nav-header">
                  <h2>Busque</h2>
                  <CgChevronDoubleLeft
                    className="navback-icon"
                    onClick={() => closeNavModal()}
                    size={30}
                  />
                </div>
                <div className="nav-section">
                  <Link
                    to="/artists"
                    className="nav-link nav-users"
                    to="/users"
                  >
                    Meet our Artists
                  </Link>
                  <Link
                    to="/venues"
                    className="nav-link nav-venues"
                    to="/venues"
                  >
                    Best Venues
                  </Link>
                  <Link to="login" className="nav-link nav-login">
                    Login
                  </Link>
                  <Link to="/signup" className="nav-link nav-signup">
                    Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </Fragment>
    );
  }
}

export default NavModal;
