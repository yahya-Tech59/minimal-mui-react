// AddCustomer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import AddCustomerForm from './AddCustomerForm';

export const AddCustomer = ({ onClose }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [agency_id, setAgency_id] = useState('');
  const [agents, setAgents] = useState([]);

  const handleClear = () => {
    setName('');
    setContact('');
    setAddress('');
    setAgency_id('');
  };

  useEffect(() => {
    const fetchAgents = async () => {
      const res = await axios.get(`/api/v1/agents`);

      if (res.status === 200) {
        const agentsData = await res.data;
        setAgents(agentsData.data);
      }
    };

    fetchAgents();
  }, []);

  const AddCustomer = async (data) => {
    data.agency_id = agency_id;
    setLoading(true);
    const res = await axios.post(`/api/v1/customers`, data);

    if (res.status === 201) {
      alert('Customer Registered Successfully');
      onClose();
      setLoading(false);
    }
  };

  return (
    <Box display="flex">
      <Box>
        <AddCustomerForm
          AddCustomer={AddCustomer}
          onClear={handleClear}
          onClose={onClose}
          loading={loading}
          name={name}
          address={address}
          contact={contact}
          agents={agents}
          agency_id={agency_id}
          setName={setName}
          setAddress={setAddress}
          setContact={setContact}
          setAgency_id={setAgency_id}
        />
      </Box>
    </Box>
  );
};
