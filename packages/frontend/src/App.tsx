import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import Routes from './Routes.tsx';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { AppContext, AppContextType } from './lib/contextLib';
import { Auth } from 'aws-amplify';
function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  function handleLogout() {
    userHasAuthenticated(false);
  }

  async function onLoad() {
    try {
      await Auth.currentSession();
      console.log(' await Auth.currentSession();', await Auth.currentSession());
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold text-muted">Scratch</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <Nav>
              {isAuthenticated ? (
                <>
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider
        value={
          {
            isAuthenticated,
            userHasAuthenticated,
          } as AppContextType
        }
      >
        <Routes />
      </AppContext.Provider>
    </div>
  );
}
export default App;
