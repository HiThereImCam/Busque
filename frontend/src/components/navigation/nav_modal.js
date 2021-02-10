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
    let buttons;

    if (!this.props.currentUser) {
      buttons = (
        <Fragment>
          <Link
            to="login"
            className="nav-link nav-login"
            onClick={() => closeNavModal()}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="nav-link nav-signup"
            onClick={() => closeNavModal()}
          >
            Signup
          </Link>
        </Fragment>
      );
    } else {
      buttons = (
        <button className="logout-button" onClick={() => this.props.logout()}>
          Logout
        </button>
      );
    }
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
                  <Link className="h2 header-logo" to="/" onClick={() => closeNavModal()}>
                    Busque
                  </Link>
                  <CgChevronDoubleLeft
                    className="navback-icon"
                    onClick={() => closeNavModal()}
                    size={30}
                  />
                </div>
                <div className="nav-section">
                  <Link
                    className="nav-link nav-users"
                    to="/users"
                    onClick={() => closeNavModal()}
                  >
                    Meet our Artists
                  </Link>
                  <Link
                    to="/venues"
                    className="nav-link nav-venues"
                    onClick={() => closeNavModal()}
                  >
                    Best Venues
                  </Link>
                  <Link className="nav-link nav-engineers"
                    to="/engineers"
                    onClick={() => closeNavModal()}>
                    Meet the Engineers
                  </Link>
                  {buttons}
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
