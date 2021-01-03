import React, { Component, Fragment, createRef } from "react";
import Mapbox from "../mapbox/mapbox";
import { GiHamburgerMenu } from "react-icons/gi";
import NavModal from "../navigation/nav_modal";
import "../../css/main_page.css";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.openNavModal = this.openNavModal.bind(this);
    this.closeNavModal = this.closeNavModal.bind(this);
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

    this.closeNavModal();
  }

  closeNavModal() {
    this.setState({
      open: false,
    });
  }

  openNavModal() {
    this.setState({
      open: true,
    });
    return (
      <div className="modal-background modal-container">
        <div
          className="modal-child"
          ref={this.modalChild}
          onClick={(e) => e.stopPropagation()}
        >
          <NavModal />
        </div>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <div className="menu-container">
          <div className="nav-container">
            <button onClick={() => this.openNavModal()}>
              <GiHamburgerMenu size={17} className="nav-icon" />
            </button>
            <GiHamburgerMenu size={17} className="nav-icon" />
          </div>
        </div>
        <Mapbox />
      </Fragment>
    );
  }
}

export default MainPage;
