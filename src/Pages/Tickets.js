import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Select, Button } from '@chakra-ui/react';
import TicketCard from '../components/TicketCard';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tickets').then((response) => {
      setTickets(response.data);
    });
  }, []);

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sort === 'Low to High') return a.priority - b.priority;
    if (sort === 'High to Low') return b.priority - a.priority;
    return 0;
  });

  const filteredTickets = sortedTickets.filter((ticket) => {
    if (!filter) return true;
    return ticket.status === filter;
  });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Link to="/ticket-create">
          <Button>Create Ticket</Button>
        </Link>
        <Box display="flex" gap="4">
          <Select placeholder="Sort by Priority" onChange={(e) => setSort(e.target.value)}>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </Select>
          <Select placeholder="Filter by Status" onChange={(e) => setFilter(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Progress">Progress</option>
            <option value="Completed">Completed</option>
          </Select>
        </Box>
      </Box>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} mt={4}>
        {filteredTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </Grid>
    </Box>
  );
};

export default Tickets;
