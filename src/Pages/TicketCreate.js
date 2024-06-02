import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Box, Input, Textarea, Select, Button, FormControl, FormLabel } from '@chakra-ui/react';

const TicketCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
    const newTicket = {
      title,
      description,
      assignee,
      status,
      priority: Number(priority),
    };
    axios.post('http://localhost:5000/tickets', newTicket).then(() => {
      history.push('/tickets');
    });
  };

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
          <option value="">Select Assignee</option>
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
      <Button onClick={handleSubmit}>Create Ticket</Button>
    </Box>
  );
};

export default TicketCreate;
