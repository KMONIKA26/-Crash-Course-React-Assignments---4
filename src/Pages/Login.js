import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Input, Button, FormControl, FormLabel, Text } from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/login', { email, password });
      login(response.data.token);
      history.push('/');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      {error && <Text color="red.500">{error}</Text>}
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;
