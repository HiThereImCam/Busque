import React, { Component } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

class Tutorial extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    localStorage.setItem("show", false);
  }

  render() {
    return (
      <div>
        <FaArrowAltCircleLeft className="left-arrow" />
        <FaArrowAltCircleLeft className="right-arrow" />
        <button type="checkbox" onClick={this.handleClick}>
          Don't show again
        </button>
      </div>
    );
  }
}

export default Tutorial;
