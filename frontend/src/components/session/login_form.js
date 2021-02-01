import React, { Component } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../css/login.css";

import { withRouter, Link } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.demoUser = this.demoUser.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signedIn === true) {
      this.props.push("/");
    }
  }

  handleInputChange(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user);
  }

  renderErrors() {
    let { errors } = this.props;
    return (
      <ul className="HeroPane-session-errors">
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`} className="session-errors">
            {errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  demoUser(e) {
    e.preventDefault();
    let demoUser = {
      email: "test@user.com",
      password: "testuser",
    };
    this.props.login(demoUser);
  }

  render() {
    let { email, password } = this.state;

    return (
      <div className="login-page-container">
        <div className="user-header">
          <GiHamburgerMenu
            size={25}
            onClick={() => {
              this.props.openNavModal();
            }}
            className="menu-icon-other"
          />
          <Link className="user-header-h1" to={"/"}>
            <h1>Busque</h1>
          </Link>
        </div>
        <div className="login-page">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="login-title">Busque</div>
            <div className="login-desc">Sign In</div>
            <div className="login-description">to continue to Busque</div>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="enter email"
              onChange={this.handleInputChange("email")}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="enter password"
              onChange={this.handleInputChange("password")}
            />
            {this.renderErrors()}
            <div className="login-buttons">
              <button>Login</button>
              <button onClick={this.demoUser}>Demo User</button>
            </div>
          </form>
          <div className="form-footer">
            Need an account?&nbsp;
            <Link className="footer-link" to="/signup">
              {" "}
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
