import React, { Component, Fragment } from "React";
import { Link } from "react-router-dom";
import "../../css/searhbar";

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.users = this.props.users;

    this.state = {
      input: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.matches = this.matches.bind(this);
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  matches() {
    let { input } = this.state;

    const matches = [];
    if (input.length === 0) {
      return "";
    }

    Object.values(this.users).forEach((user) => {
      if (user.username.toLowerCase().includes(input.toLowerCase())) {
        matches.push(user);
      }
    });

    if (matches.length === 0) {
      return "No matches";
    }

    return matches;
  }

  render() {
    let { input } = this.state;
    let results;
    if (this.matches() === "No matches" || this.matches == "") {
      results = "";
    } else {
      results = this.matches.map((result, i) => {
        return (
          <li className="search-results" key={i}>
            <Link to={`/users/${result._id}`}>
              <div className="results-item">{result.username}</div>
            </Link>
          </li>
        );
      });
    }
    return (
      <div>
        <input
          type="text"
          name="input"
          value={input}
          onChange={this.handleInputChange}
          placeholder="Search users... "
          className="search-input"
        />
      </div>
    );
  }
}

export default Searchbar;
