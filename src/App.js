import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Tickets from './pages/Tickets';
import TicketView from './pages/TicketView';
import TicketCreate from './pages/TicketCreate';
import TicketEdit from './pages/TicketEdit';
import Login from './pages/Login';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/about" component={About} />
            <PrivateRoute path="/contact" component={Contact} />
            <PrivateRoute path="/tickets" component={Tickets} />
            <PrivateRoute path="/ticket/:id" component={TicketView} />
            <PrivateRoute path="/ticket-create" component={TicketCreate} />
            <PrivateRoute path="/ticket-edit/:id" component={TicketEdit} />
            <Route path="/login" component={Login} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
