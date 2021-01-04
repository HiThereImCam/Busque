import React, { Component, Fragment } from "react";
import Mapbox from "../mapbox/mapbox";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../css/main_page.css";

class MainPage extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.openNavModal = this.openNavModal.bind(this);
    this.closeNavModal = this.closeNavModal.bind(this);
    this.modalChild = createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick(e) {
    try {
      if (this.modalChild.current.contains(e.target)) {
        return;
      }
    } catch (e) {
      return e;
    }

    this.closeNavModal();
  }

  closeNavModal() {
    this.setState({
      open: false,
    });
  }

  openNavModal() {
    this.setState({
      open: true,
    });
    return (
      <div className="modal-background modal-container">
        <div
          className="modal-child"
          ref={this.modalChild}
          onClick={(e) => e.stopPropagation()}
        >
          <NavModal />
        </div>
      </div>
    );
  }

=======
>>>>>>> efd5fb9276319601d4549536bc83bfcaa06b0a99
  render() {
    let { openNavModal } = this.props;

    return (
      <Fragment>
        <div className="menu-container">
<<<<<<< HEAD
          <div className="nav-container">
            <button onClick={() => this.openNavModal()}>
              <GiHamburgerMenu size={17} className="nav-icon" />
            </button>
            <GiHamburgerMenu size={17} className="nav-icon" />
=======
          <div>
            <GiHamburgerMenu
              size={17}
              onClick={() => {
                openNavModal();
              }}
              className="nav-icon"
            />
>>>>>>> efd5fb9276319601d4549536bc83bfcaa06b0a99
          </div>
        </div>
        <Mapbox />
      </Fragment>
    );
  }
}

export default MainPage;

// componentDidMount() {
//   document.addEventListener("mousedown", this.handleClick, false);
// }

// componentWillUnmount() {
//   document.removeEventListener("mousedown", this.handleClick, false);
// }

// handleClick(e) {
//   try {
//     if (this.modalChild.current.contains(e.target)) {
//       return;
//     }
//   } catch (e) {
//     return e;
//   }

//   this.closeNavModal();
// }

// closeNavModal() {
//   this.setState({
//     open: false,
//   });
// }

// openNavModal() {
//   return (
//     <div className="modal-background modal-container">
//       <div
//         className="modal-child"
//         ref={this.modalChild}
//         onClick={(e) => e.stopPropagation()}
//       >

//       </div>
//       <NavModal />
//     </div>
//     <div>HELLO</div>
//   );
// }

// this.state = {
//   open: false,
// };

// this.closeNavModal = this.closeNavModal.bind(this);
// this.modalChild = createRef();
