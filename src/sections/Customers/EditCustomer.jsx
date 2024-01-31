import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';
import ClearButton from '../../components/ClearButton';
import SubmitButton from '../../components/SubmitButton';
import {
  Box,
  Button,
  Typography,
  Icon,
  InputLabel,
  Input,
  Select,
  MenuItem,
  ListItem,
} from '@mui/material';
import CloseButton from '../../components/CloseButton';

export const EditCustomer = ({ onClose, id }) => {
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

  const schema = yup.object().shape({
    fullname: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    agency_id: yup.string().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const baseURL = 'https://spiky-crater-dep2vxlep8.ploi.online';
  const token = localStorage.getItem('token');

  const fetchCustomer = () => {
    const res = axios.get(`${baseURL}/api/v1/customers/${id}/edit`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      const CustData = res.data[0];
      setFullName(CustData?.fullname || '');
      setDescription(CustData?.phone || '');
      setBusiness(CustData?.address || '');
      setContact(CustData?.agency_id || '');

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      const res = await axios.get(`${baseURL}/api/v1/agents`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const agentsData = await res.data;
        setAgents(agentsData.data);
      }
    };

    fetchAgents();
  }, []);

  const EditCustomer = async (data) => {
    data.agency_id = agency_id;
    setLoading(true);
    const res = await axios.put(`${baseURL}/api/v1/customers/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 202) {
      alert('Customer Updated Successfully');
      onClose();
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="form"
        onSubmit={handleSubmit(EditCustomer)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: 'white',
          boxShadow: 2,
          width: '38rem',
          height: '39rem',
          borderRadius: 2,
          p: 3,
        }}
      >
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', gap: 5 }}>
            <Typography variant="h4" sx={{ ml: 7 }}>
              Edit Customer
            </Typography>
            <Box sx={{ ml: 22 }}>
              <CloseButton onClick={onClose} />
            </Box>
          </Box>

          <Box sx={{ my: 6, ml: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
              <InputLabel>Name</InputLabel>
              <Input
                type="text"
                {...register('fullname')}
                sx={{
                  bgcolor: '#F9F9F9',

                  mr: 1,
                  borderRadius: '0.5rem',
                  width: '32rem',
                  '::placeholder': {
                    pl: 2,
                    color: '#8A92A6',
                  },
                }}
                placeholder="john"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
              <InputLabel>Contact</InputLabel>
              <Input
                type="string"
                {...register('phone')}
                sx={{
                  bgcolor: '#F9F9F9',

                  mr: 1,
                  borderRadius: '0.5rem',
                  width: '32rem',
                  '::placeholder': {
                    pl: 2,
                    color: '#8A92A6',
                  },
                }}
                placeholder="123456"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
              <InputLabel>Address </InputLabel>
              <Input
                type="text"
                {...register('address')}
                sx={{
                  bgcolor: '#F9F9F9',

                  mr: 1,
                  borderRadius: '0.5rem',
                  width: '32rem',
                  '::placeholder': {
                    pl: 2,
                    color: '#8A92A6',
                  },
                }}
                placeholder="mogadishu..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
              <InputLabel>Agency</InputLabel>
              <Select
                {...register('agency_id')}
                defaultValue={agency_id}
                onChange={(e) => setAgency_id(e.target.value)}
                sx={{
                  '&::placeholder': {
                    color: 'text.secondary',
                  },
                  p: 2.7,
                  marginRight: 1,
                  borderRadius: 3,
                  width: '32rem',
                  height: 2,
                }}
              >
                <MenuItem value="" disabled>
                  <ListItem>Select an agent</ListItem>
                </MenuItem>
                {agents.map((agent) => (
                  <MenuItem
                    key={agent.id}
                    value={agent.id}
                    style={{ paddingBottom: 2 }}
                    className="text-slate-700"
                  >
                    <ListItem>{agent.fullname}</ListItem>
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          {/* <div className="flex mt-6 gap-4 justify-center ">
            <input type="checkbox" />
            <p>I agree With The Terms Of Use</p>
          </div> */}
          <Box
            sx={{
              display: 'flex',
              gap: 38,
              ml: 2,
            }}
          >
            <SubmitButton label="Submit" type="submit" />
            <ClearButton label="Clear" onClick={handleClear} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
