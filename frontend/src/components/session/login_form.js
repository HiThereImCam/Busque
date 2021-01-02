import React, { Component } from "react";
import "../../css/login.css";

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
    this.props.login(user)
      .then(this.props.history.push("/"));
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
      email: "test@user.com",
      password: "testuser",
    });
  }

  render() {
    let { email, password } = this.state;

    return (
      <div className='login-page-container'>
        <div className='login-page'>
            {this.renderErrors()}
            <form className='login-form' onSubmit={this.handleSubmit}>
                <div className='login-title'>Busque</div>
                <div className='login-desc'>Sign In</div>
                <div className='login-description'>to continue to Busque</div>
                <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="enter email"
                    onChange={this.handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="enter password"
                    onChange={this.handleInputChange}
                />
            </form>
            <div className='login-buttons'>
                <button>Login</button>
                <button onClick={() => this.demoUser()}>Demo User</button>
            </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
