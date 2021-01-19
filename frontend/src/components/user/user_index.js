<<<<<<< HEAD
import React from "react";
import UserIndexItem from "./user_index_item";

class ProjectIndex extends React.Component {
  componentDidMount() {
    // this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <h1>Our Artists</h1>
        {this.props.users.map((user, i) => {
          return <UserIndexItem user={user} key={i} />;
        })}
      </div>
    );
  }
}

export default ProjectIndex;
=======
import React from 'react'; 
import UserIndexItem from './user_index_item';
import NavModalContainer from '../navigation/nav_modal_container';
import "../../css/user_index.css";
import { openNavModal } from '../../actions/nav_actions';
import { GiHamburgerMenu } from "react-icons/gi";



class UserIndex extends React.Component {

    componentDidMount() {
        this.props.fetchUsers(); 
    }

    render() {
        return (
            <div>
                <div className="user-header">
                    <GiHamburgerMenu
                        size={25}
                        onClick={() => {
                            this.props.openNavModal();
                        }}
                        className="menu-icon-other"
                    />
                    <h1>Our Artists</h1>
                </div>
                {this.props.users.map((user, i) => {
                    return <UserIndexItem user={user} key={i}/>
                })}
            </div>
        )
    }
}

export default UserIndex; 
>>>>>>> 10c0c386c0e7e02f3d6d5cfdb3f105390c474007
