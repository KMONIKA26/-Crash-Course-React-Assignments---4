import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/tickets">Tickets</Link>
      {isLoggedIn ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
