import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../css/searchbar.css";

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.props.openModal;
    this.state = {
      input: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.noMatches = this.noMatches.bind(this);
    this.matches = this.matches.bind(this);
  }

  noMatches() {
    return (
      <div className="search-results-container">
        <div className="results-item">No results found</div>
      </div>
    );
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  matches() {
    let { input } = this.state;
    let { users } = this.props;
    const matches = [];
    if (input.length === 0) {
      return "";
    }

    Object.values(users).forEach((user) => {
      if (user.username.toLowerCase().includes(input.toLowerCase())) {
        matches.push(user);
      }
    });

    return matches;
  }

  render() {
    let { input } = this.state;
    let results;
    let matches = this.matches();
    if (matches.length === 0) {
      results = "";
    } else {
      results = matches.map((result, i) => {
        return (
          <li className="search-results" key={i}>
            <Link to={`/profile/${result._id}`}>
              <div className="results-item">{result.username}</div>
            </Link>
          </li>
        );
      });
    }
    return (
      <Fragment>
        <GiHamburgerMenu
          size={25}
          onClick={() => {
            this.openModal();
          }}
          className="menu-icon-other"
        />
        <input
          type="text"
          name="input"
          value={input}
          onChange={this.handleInputChange}
          placeholder="Search users... "
        />
        {results.length < 1 && input.length > 0 ? (
          this.noMatches()
        ) : (
          <div className="search-results-container">
            <ul>{results}</ul>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Searchbar;
