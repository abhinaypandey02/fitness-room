import React from 'react';
import {Texts} from "../../configs/texts";
import {useSetUser, useUser} from "../../contexts/user_context";
import {BrowserRouter, Link} from "react-router-dom";
import {Routes} from "../../configs/routes";
import {Dropdown, Nav, Navbar, NavDropdown} from "react-bootstrap";

function NavigationBarMain() {
    const user=useUser();
    const setUser=useSetUser();
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to={Routes.home}>{Texts.appName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="w-100 justify-content-end">
                    <Nav.Link  as={Link} to={Routes.home}>Home</Nav.Link>
                    {user&&<NavDropdown alignRight title={user?.firstName} id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to={Routes.userProfile}>
                            Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={Routes.signOut}>
                            Sign Out
                        </NavDropdown.Item>
                    </NavDropdown>}
                    {!user&&<Nav.Link as={Link} to={Routes.signUp}>Sign Up</Nav.Link>}
                    {!user&&<Nav.Link as={Link} to={Routes.signIn}>Sign In</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBarMain;