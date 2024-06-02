import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Box, Input, Textarea, Select, Button, FormControl, FormLabel } from '@chakra-ui/react';

const TicketEdit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [ticket, setTicket] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/tickets/${id}`).then((response) => {
      const ticket = response.data;
      setTicket(ticket);
      setTitle(ticket.title);
      setDescription(ticket.description);
      setAssignee(ticket.assignee);
      setStatus(ticket.status);
      setPriority(ticket.priority);
    });
  }, [id]);

  const handleSubmit = () => {
    const updatedTicket = {
      title,
      description,
      assignee,
      status,
      priority: Number(priority),
    };
    axios.put(`http://localhost:5000/tickets/${id}`, updatedTicket).then(() => {
      history.push('/tickets');
    });
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <Box>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Assignee</FormLabel>
        <Select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
          <option value="John">John</option>
          <option value="Jane">Jane</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Status</FormLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Progress">Progress</option>
          <option value="Completed">Completed</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Priority</FormLabel>
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          {[...Array(10).keys()].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleSubmit}>Edit Ticket</Button>
    </Box>
  );
};

export default TicketEdit;
