import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import Routes from './Routes.tsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { AppContext, AppContextType } from './lib/contextLib';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { onError } from './lib/errorLib.ts';
function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const nav = useNavigate();
  async function handleLogout() {
    try {
      await Auth.signOut();
      userHasAuthenticated(false);
      nav('/login');
    } catch (error) {
      console.log(error);
    }
  }

  async function onLoad() {
    try {
      await Auth.currentSession();
      console.log(' await Auth.currentSession();', await Auth.currentSession());
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold text-muted">Scratch</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/new/note">
                    <Nav.Link>New Note</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider
          value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
        >
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}
export default App;
