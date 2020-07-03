import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";

class NavbarComponent extends React.Component {

    render() {
        return (
            <Navbar bg="primary" variant="dark" sticky="top">
                <Nav className="mr-auto">
                    <NavLink to="/home" activeClassName="nav-link disabled" className="nav-link">Main page</NavLink>
                    <NavLink to="/posts" activeClassName="nav-link disabled" className="nav-link">Posts</NavLink>
                    {/*Do default page for unauthorized*/}
                    <NavLink to={`/users/${0}`} activeClassName="nav-link disabled" className="nav-link">User profile</NavLink>
                </Nav>

                <Navbar.Text className="ml-auto">
                    Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
            </Navbar>
        )
    }
}

export default NavbarComponent;