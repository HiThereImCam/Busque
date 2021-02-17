import React, { Component } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

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
        <FaArrowAltCircleLeft />
        <FaArrowAltCircleRight />
        <button type="checkbox" onClick={this.handleClick}>
          Don't show again
        </button>
      </div>
    );
  }
}

export default Tutorial;
