import React, { Component, createRef, Fragment } from "react";
import { uploadPhoto } from "../../util/photo_api_util";
import "../../css/signup.css";

class VenueModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venueName: "",
      photoId: "",
      photoFile: null,
      imageURL: "",
      errors: {},
      closeVenueModal: false,
    };

    this.modalChild = createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    // this.props.clearErrors();
    document.removeEventListener("mousedown", this.handleClick, false);
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
        let venue = {
          name: this.state.venueName,
          performerType: this.state.performerType,
          photoId: res.data.newData.photoId,
          imageURL: res.data.newData.Location,
        };
        this.props.createVenue(venue);
      });
    } else {
      let venue = {
        name: this.state.venueName,
        performerType: this.state.performerType,
        photoId: this.state.photoId,
        imageURL: this.state.Location,
      };
      this.props.createVenue(venue);
    }
  }

  handleClick(e) {
    try {
      if (this.modalChild.current.contains(e.target)) {
        return;
      }
    } catch (e) {
      return e;
    }

    this.handleClickOutside();
  }

  handleClickOutside() {
    this.props.closeVenueModal();
  }

  // renderErrors() {
  //   let { errors } = this.props;
  //   return (
  //     <ul>
  //       {Object.keys(errors).map((error, i) => (
  //         <li key={`error-${i}`}>{errors[error]}</li>
  //       ))}
  //     </ul>
  //   );
  // }

  render() {
    let { venueModal } = this.props;
    return (
      <Fragment>
        {venueModal ? (
          <div className="modal-background modal-container">
            <div
              className="modal-child"
              ref={this.modalChild}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="signup-page-container">
                <div className="signup-page">
                  <form onSubmit={this.handleSubmit}>
                    <div className="signup-form">
                      <div className="signup-desc">Create a new Venue</div>
                      <input
                        type="text"
                        value={this.state.venueName}
                        onChange={this.update("venueName")}
                        placeholder="Venue name"
                      />
                      <select
                        value={this.state.performerType}
                        onChange={this.update("performerType")}
                      >
                        <option value="" disabled>
                          Performer Type
                        </option>
                        <option value="Tourist Attraction">
                          Tourist Attraction
                        </option>
                        <option value="Historical Site">Historical Site</option>
                        <option value="Street Corner">Street Corner</option>
                        <option value="Transit Station<">
                          Transit Station
                        </option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="pic-upload-desc">
                        Upload a Venue Picture:
                      </div>
                      <input
                        className="input-file"
                        id="signup-profile"
                        type="file"
                        onChange={this.handleFile.bind(this)}
                      />
                      <input
                        className="signup-button"
                        id="signup-button"
                        type="submit"
                        value="Create Venue"
                      />
                      {/* {this.renderErrors()}  */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </Fragment>
    );
  }
}

export default VenueModal;
