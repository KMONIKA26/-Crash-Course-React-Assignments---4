import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Box, Button } from '@chakra-ui/react';

const TicketView = () => {
  const { id } = useParams();
  const history = useHistory();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/tickets/${id}`).then((response) => {
      setTicket(response.data);
    });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/tickets/${id}`).then(() => {
      history.push('/tickets');
    });
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <Box>
      <Box as="h1">{ticket.title}</Box>
      <Box>Description: {ticket.description}</Box>
      <Box>Assignee: {ticket.assignee}</Box>
      <Box>Status: {ticket.status}</Box>
      <Box>Priority: {ticket.priority}</Box>
      <Button onClick={() => history.push(`/ticket-edit/${id}`)}>Edit</Button>
      <Button onClick={handleDelete} colorScheme="red">
        Delete
      </Button>
    </Box>
  );
};

export default TicketView;
