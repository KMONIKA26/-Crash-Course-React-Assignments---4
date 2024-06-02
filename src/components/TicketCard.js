import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const TicketCard = ({ ticket }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Box>
        <Box as="h4" fontWeight="bold">
          {ticket.title}
        </Box>
        <Box>Status: {ticket.status}</Box>
        <Box>Priority: {ticket.priority}</Box>
      </Box>
      <Link to={`/ticket/${ticket.id}`}>
        <Button mt={4}>View</Button>
      </Link>
    </Box>
  );
};

export default TicketCard;
