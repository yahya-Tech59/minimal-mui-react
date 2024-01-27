import axios from 'axios';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Input, InputLabel, Typography } from '@mui/material';
// import { IoCloseOutline } from 'react-icons/io5';

import ClearButton from '../../components/ClearButton';
import CloseButton from '../../components/CloseButton';
import SubmitButton from '../../components/SubmitButton';

export const EditAgent = ({ onClose, id }) => {
  const [fullname, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [business, setBusiness] = useState('');
  const [contact, setContact] = useState('');
  // const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    fullname: yup.string().required(),
    description: yup.string().required(),
    business: yup.string().required(),
    phone: yup.number().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClear = () => {
    setFullName('');
    setDescription('');
    setBusiness('');
    setContact('');
  };

  const baseURL = 'https://spiky-crater-dep2vxlep8.ploi.online';
  const token = localStorage.getItem('token');
  const fetchEditAgent = async () => {
    try {
      // setLoading(true);

      const res = await axios.get(`${baseURL}/api/v1/agents/${id}/edit`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const agentData = res.data[0];
        setFullName(agentData?.fullname || '');
        setDescription(agentData?.description || '');
        setBusiness(agentData?.business || '');
        setContact(agentData?.phone || '');

        // setLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchEditAgent();
  });

  const editAgent = async () => {
    try {
      // setLoading(true);
      const res = await axios.put(
        `${baseURL}/api/v1/agents/${id}`,
        {
          fullname,
          description,
          business,
          phone: contact,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        alert('updated Successfuly');
        onclose();
      }
    } catch (error) {
      alert(error);
    }
  };

  // if (loading === true) {
  //   return <Typography variant="h1">Loading...</Typography>;
  // }
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="form"
        onSubmit={handleSubmit(editAgent)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: 'white',
          boxShadow: 2,
          width: '38rem',
          height: '36rem',
          borderRadius: 2,
          p: 3,
        }}
      >
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', gap: 5 }}>
            <Typography variant="h4" sx={{ ml: 10 }}>
              Edit Agent
            </Typography>
            <Box sx={{ ml: 26 }}>
              <CloseButton onClick={onClose} />
            </Box>
          </Box>

          <Box sx={{ my: 6, ml: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
              <InputLabel>Name</InputLabel>
              <Input
                type="text"
                {...register('fullname')}
                sx={{
                  bgcolor: '#F9F9F9',

                  mr: 1,
                  borderRadius: '0.5rem',
                  width: '34rem',
                  '::placeholder': {
                    pl: 2,
                    color: '#8A92A6',
                  },
                }}
                placeholder="john"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
              <InputLabel>Description</InputLabel>
              <Input
                type="text"
                {...register('description')}
                sx={{
                  bgcolor: '#F9F9F9',

                  mr: 1,
                  borderRadius: '0.5rem',
                  width: '34rem',
                  '::placeholder': {
                    pl: 2,
                    color: '#8A92A6',
                  },
                }}
                placeholder="description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
              <InputLabel>Business </InputLabel>
              <Input
                type="text"
                {...register('business')}
                sx={{
                  bgcolor: '#F9F9F9',

                  mr: 1,
                  borderRadius: '0.5rem',
                  width: '34rem',
                  '::placeholder': {
                    pl: 2,
                    color: '#8A92A6',
                  },
                }}
                placeholder="web..."
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
              <InputLabel>Contact </InputLabel>
              <Input
                type="string"
                {...register('phone')}
                sx={{
                  bgcolor: '#F9F9F9',

                  mr: 1,
                  borderRadius: '0.5rem',
                  width: '34rem',
                  '::placeholder': {
                    color: '#8A92A6',
                  },
                }}
                placeholder="123456789"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 44,
              ml: 2,
            }}
          >
            <SubmitButton label="Submit" />
            <ClearButton label="Clear" onClick={handleClear} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

EditAgent.propTypes = {
  onClose: PropTypes.func,
  id: PropTypes.string,
};
