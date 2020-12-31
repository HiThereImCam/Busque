import React, { Component } from "react";
import Mapbox from "../mapbox/mapbox";

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Mapbox />
      </div>
    );
  }
}

export default MainPage;
