import React from "react";
import { withRouter } from "react-router-dom";
import { uploadPhoto } from '../../util/photo_api_util'; 
import "../../css/signup.css";

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

  componentDidMount() {
    this.props.clearErrors();
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // handleFile(e) {
  //   const file = e.currentTarget.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     this.setState({ imageURL: reader.result, photoFile: file });
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // }

  handleFile(e) {
    e.preventDefault(); 
    this.setState({
      photoFile: e.target.files[0]
    })
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const user = Object.assign({}, this.state);
  //   this.props.signup(user).then(this.props.history.push("/login")); //! works?
  // }

  handleSubmit(e) {
    e.preventDefault(); 

    if (this.state.photoFile) {
      const data = new FormData(e.target); 
      data.append("file", this.state.photoFile); 
      uploadPhoto(data).then(res => {
        let user = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          performerType: this.state.performerType,
          bio: this.state.bio,
          photoId: res.data.newData.photoId,
          imageURL: res.data.newData.Location
        }; 
        this.props.signup(user, this.props.history)
      })
    } else {
      let user = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        performerType: this.state.performerType,
        bio: this.state.bio,
        photoId: this.state.photoId,
        imageURL: this.state.imageURL
      }; 
      this.props.signup(user, this.props.history)
    }
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className='signup-page-container'>
          <div className='signup-page'>
            <form onSubmit={this.handleSubmit}>
            <div className="signup-form">
                <div className='signup-title'>Busque</div>
                <div className='signup-desc'>Sign Up</div>
                <div className='signup-description'>to continue to Busque</div>
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
                    <option value="" disabled>Performer Type</option>
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
                <div>Upload a Profile Picture:</div>
                <input id='signup-profile' type="file" onChange={this.handleFile.bind(this)} />
                <input className='signup-button' type="submit" value="Sign up" />
                {this.renderErrors()}
            </div>
            </form>
          </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
