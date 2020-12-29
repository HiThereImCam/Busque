import React, { Component } from "react";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signedIn === true) {
      this.props.push("/");
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
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
        {errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  demoUser() {
    this.setState({
      email: "demo@example.com",
      password: "password",
    });
  }

  render() {
    let { email, password } = this.state;

    return (
      <div>
        {this.renderErrors()}
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />
        </form>
        <div>
          <button>Login</button>
          <button onClick={() => this.demoUser()}>Demo User</button>
        </div>
      </div>
    );
  }
}

export default LoginForm;
