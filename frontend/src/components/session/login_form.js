import React, { Component } from "react";
import "../../css/login.css";

import { withRouter } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.demoUser = this.demoUser.bind(this); 
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signedIn === true) {
      this.props.push("/");
    }
  }

  handleInputChange(field) {
    return e => this.setState({
      [field]: e.currentTarget.value 
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user)
      .then(this.props.history.push("/"));
  }

  renderErrors() {
    return (
      <ul className="HeroPane-session-errors">
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    )
  }

  demoUser(e) {
    e.preventDefault(); 
    let demoUser = {
      email: "test@user.com", 
      password: "testuser"
    }; 
    this.props.login(demoUser)
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
                    onChange={this.handleInputChange('email')}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="enter password"
                    onChange={this.handleInputChange('password')}
                />
              <div className='login-buttons'>
                  <button>Login</button>
                  <button onClick={this.demoUser}>Demo User</button>
              </div>
            </form>
         </div>
       </div>
    );
  }
}

export default withRouter(LoginForm); 