import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/engineers.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { openNavModal } from "../../actions/nav_actions"

class Engineers extends React.Component {


    render() {
        return (
            <div>
                {/* <Link to="/">Back to Map</Link> */}
                <div className="user-header">
            <GiHamburgerMenu
              size={25}
              onClick={() => {
                openNavModal();
              }}
              className="menu-icon-other"
            />
            <Link className="user-header-h1" to={"/"}>
              <h1>Busque</h1>
            </Link>
          </div>
                <div className='engineer-block'>
                    <div className='engineer'>
                        <div>Cameron Tanjoco</div>
                        <div>Project Lead</div>
                        <a href="https://www.linkedin.com/in/cameron-tanjoco-8ba612a3/" target="_blank">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/HiThereImCam" target="_blank">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                    <div className='engineer'>
                        <div>Alana Shannon</div>
                        <div>Frontend Lead</div>
                        <a href="https://www.linkedin.com/in/alana-shannon/" target="_blank">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/alanashannon" target="_blank">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                    <div className='engineer'>
                        <div>David Elrod</div>
                        <div>Backend Lead</div>
                        <a href="https://www.linkedin.com/in/thedavidelrod/" target="_blank">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/thedavidelrod" target="_blank">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                    <div className='engineer'>
                        <div>Maxbryan Cosmosse</div>
                        <div>Flex Assistant</div>
                        <a href="https://www.linkedin.com/in/maxbryan-cosmosse-94055416a/" target="_blank">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/mcosmosse" target="_blank">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Engineers;