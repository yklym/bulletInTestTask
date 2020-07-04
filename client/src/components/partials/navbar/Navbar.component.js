import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import UserService from "../../../sevices/User.service";
import RegisterModal from "../../modals/RegisterModal.component";
import LoginModal from "../../modals/LoginModal.component";

class NavbarComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currUser: UserService.user,
        }
    }

    onUserLogout = () => {
        UserService.logOut();
        this.setState({currUser: UserService.user});
    }

    onUserLogIn = () => {
        this.setState({currUser: UserService.user});
    }

    render() {

        const user = this.state.currUser;

        return (
            <>
                <Navbar bg="primary" variant="dark" sticky="top">
                    <Nav className="mr-auto">
                        <NavLink to="/home" activeClassName="nav-link disabled" className="nav-link">Main page</NavLink>
                        <NavLink to="/posts" activeClassName="nav-link disabled" className="nav-link">Posts</NavLink>
                        {user ?
                            <NavLink to={`/users/${user._id}`} activeClassName="nav-link disabled" className="nav-link">User
                                profile</NavLink> : ""}

                    </Nav>

                    <Navbar.Text className="ml-auto">
                        {user ?
                            <>Signed in as: <span className={"auth-link"}
                                                  onClick={this.onUserLogout}>{user.fullName}</span></>
                            :
                            <>
                                <LoginModal  onUserLogIn={this.onUserLogIn}/>
                                <RegisterModal onUserLogIn={this.onUserLogIn}/>
                            </>
                        }
                    </Navbar.Text>
                </Navbar>
            </>
        )
    }
}

export default NavbarComponent;