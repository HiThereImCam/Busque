import React, { Component, Fragment } from "react";
import Mapbox from "../mapbox/mapbox";
import { GiHamburgerMenu } from "react-icons/gi";
import "../../css/main_page.css";

class MainPage extends Component {
  render() {
    let { openNavModal } = this.props;

    return (
      <Fragment>
        <div className="menu-container">
          <div>
            <GiHamburgerMenu
              size={17}
              onClick={() => {
                openNavModal();
              }}
              className="nav-icon"
            />
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
