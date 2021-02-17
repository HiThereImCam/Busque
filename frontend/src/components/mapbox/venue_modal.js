import React, { Component, createRef, Fragment } from "react";
import { uploadPhoto } from "../../util/photo_api_util";
import "../../css/venue_modal.css";

class VenueModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venueName: "",
      venueType: "",
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
    this.renderErrors = this.renderErrors.bind(this);
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
          type: this.state.venueType,
          coordinate: this.props.coordinates,
          photoId: res.data.newData.photoId,
          imageURL: res.data.newData.Location,
        };
        this.props.createVenue(venue);
      });
    } else {
      let venue = {
        name: this.props.venueName,
        type: this.state.venueType,
        coordinate: this.props.coordinates,
        imageURL: this.state.imageURL,
        available: true,
      };
      this.props.createVenue(venue, this.props.currentUser);
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

  render() {
    let { venueModal, venueName } = this.props;

    return (
      <Fragment>
        {venueModal ? (
          <div className="modal-background modal-container">
            <div
              className="venue-modal-child"
              ref={this.modalChild}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="signup-page-container">
                <div className="venue-create-page">
                  <form onSubmit={this.handleSubmit}>
                    <div className="venue-create-form">
                      <div className="venue-desc">
                        New Venue Name: {`${venueName}`}
                      </div>
                      {/* <input
                        type="text"
                        value={this.state.venueName}
                        onChange={this.update("venueName")}
                        placeholder="Venue name"
                      /> */}
                      <select
                        value={this.state.venueType}
                        onChange={this.update("venueType")}
                      >
                        <option value="" disabled>
                          Venue Type
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
                      <div className="venue-pic-upload-desc">
                        Upload a Venue Picture:
                      </div>
                      <input
                        className="input-file"
                        id="venue-create-profile"
                        type="file"
                        onChange={this.handleFile.bind(this)}
                      />
                      <input
                        className="venue-create-button"
                        id="venue-create-button"
                        type="submit"
                        value="Create Venue"
                      />
                      {this.renderErrors()}
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
