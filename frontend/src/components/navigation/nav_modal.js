import React, { Component, Fragment, createRef } from "react";
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
    let { openNavModal } = this.props;
    return (
      <Fragment>
        {openNavModal ? (
          <div className="modal-background modal-container">
            <div
              className="modal-child"
              ref={this.modalChild}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nav-container">BUSQUE</div>
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
