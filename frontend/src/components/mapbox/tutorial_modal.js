import React, { Component } from "react";

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
        <button type="checkbox" onClick={this.handleClick}>
          Don't show again
        </button>
      </div>
    );
  }
}

export default Tutorial;
