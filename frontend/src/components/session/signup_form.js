import React from "react";
import { withRouter, Link } from "react-router-dom";
import { uploadPhoto } from "../../util/photo_api_util";
import "../../css/signup.css";
import { GiHamburgerMenu } from "react-icons/gi";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      performerType: "",
      bio: "",
      photoId: "",
      photoFile: null,
      imageURL: "",
      errors: {},
    };

    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleFile(e) {
    e.preventDefault();
    this.setState({
      photoFile: e.target.files[0],
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    if (this.state.photoFile) {
      const data = new FormData(e.target);
      data.append("file", this.state.photoFile);
      uploadPhoto(data).then((res) => {
        let user = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          performerType: this.state.performerType,
          bio: this.state.bio,
          photoId: res.data.newData.photoId,
          imageURL: res.data.newData.Location,
        };
        this.props
          .signup(user, this.props.history)
          .then(this.props.history.push("/login"));
      });
    } else {
      let user = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        performerType: this.state.performerType,
        bio: this.state.bio,
        photoId: this.state.photoId,
        imageURL: this.state.imageURL,
      };
      this.props
        .signup(user, this.props.history)
        .then(this.props.history.push("/login"));
    }
  }

  renderErrors() {
    let { errors } = this.props;
    return (
      <ul>
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>{errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-page-container">
        <div className="user-header-login">
          <GiHamburgerMenu
            size={25}
            onClick={() => {
              this.props.openNavModal();
            }}
            className="menu-icon-other"
          />
          <Link className="user-header-h1-login" to={"/"}>
            <h1 className="header-logo-login">Busque</h1>
          </Link>
        </div>
        <div className="signup-page">
          <form onSubmit={this.handleSubmit}>
            <div className="signup-form">
              <div className="signup-title header-logo">Busque</div>
              <div className="signup-desc">Sign Up</div>
              <div className="signup-description">to continue to Busque</div>
              <input
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
              />
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
              <select
                value={this.state.performerType}
                onChange={this.update("performerType")}
              >
                <option value="" disabled>
                  Performer Type
                </option>
                <option value="Musician">Musician</option>
                <option value="Dancers">Dancers</option>
                <option value="Artists">Artists</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                value={this.state.bio}
                onChange={this.update("bio")}
                placeholder="Bio"
              />
              <div className="pic-upload-desc">Upload a Profile Picture:</div>
              <input
                className="input-file"
                id="signup-profile"
                type="file"
                onChange={this.handleFile.bind(this)}
              />
              <input className="signup-button" id="signup-button" type="submit" value="Sign up" />
              {this.renderErrors()}
              <div className="form-footer-signup">
                Have an account?&nbsp;
                <Link className="footer-link" to="/login">
                  {" "}
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
