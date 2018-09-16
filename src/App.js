import React, { Component, Fragment } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import Routes from './components/Routes/Routes';
import {Auth} from 'aws-amplify';

class App extends Component {
  state = {
    isAuth: false,
    isAuthenticating: true
  }

  async componentDidMount() {
      try {
        if (await Auth.currentSession()) { /* Load User Session*/
          this.authHandler(true);
        }
      } catch (e) {
        if (e !== 'No current user') {
          alert(e);
        }
      }
      this.setState({isAuthenticating: false})
  }

  authHandler = (authenticated) => {
    this.setState({isAuth: authenticated});
  }

  logoutHandler = async (event) => {
    await Auth.signOut(); /* Clear session*/

    this.authHandler(false);
  }

  render() {
    const childProps = {
      isAuth: this.state.isAuth,
      authHandler: this.authHandler
    }

    return (/*Wait until it's authenticated or logged out to render*/
      !this.state.isAuthenticating &&
        <div className="App container">
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/"> Photo Reader </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav pullRight>
                {this.state.isAuth ?
                <NavItem onClick={this.logoutHandler}> Log Out </NavItem> :
                <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem> Sign Up </NavItem>
                  </LinkContainer>

                  <LinkContainer to="/login">
                    <NavItem> Log In </NavItem>
                  </LinkContainer>
                </Fragment>}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps}/>
        </div>
    );
  }
}

export default App;
