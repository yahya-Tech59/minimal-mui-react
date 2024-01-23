import axios from 'axios';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Input, InputLabel, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ClearButton from '../../components/ClearButton';
import CloseButton from '../../components/CloseButton';
import SubmitButton from '../../components/SubmitButton';
// import AlertComp from '../../components/AlertComp';

export const AddAgent = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [business, setBusiness] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  // const [AlertStatus, setAlertStatus] = useState(null);

  const handleClear = () => {
    setName('');
    setDescription('');
    setBusiness('');
    setContact('');
  };

  const schema = yup.object().shape({
    fullname: yup.string().required(),
    description: yup.string().required(),
    business: yup.string().required(),
    phone: yup.string().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const addAgent = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/v1/agents', data);

      if (res.status === 201) {
        // alert("Agent Registered successfully");
        // setAlertStatus('success');
        setLoading(false);
      }
    } catch (error) {
      // setAlertStatus('error');
      setLoading(false);
    }
  };

  if (loading === true) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  return (
    <Box>
      <Stack sx={{ m: 2, position: 'relative', bottom: 60 }}>
        {/* {AlertStatus && (
          <AlertComp
            severity={AlertStatus === 'success' ? 'success' : 'error'}
            title={AlertStatus === 'success' ? 'Successful' : 'Failed'}
            message={
              AlertStatus === 'success'
                ? 'Agent registered successfully.'
                : 'Failed to register agent.'
            }
            onClose={() => setAlertStatus(null)}
          />
        )} */}
      </Stack>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="form"
          onSubmit={handleSubmit(addAgent)}
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
                Add New Agent
              </Typography>
              <Box sx={{ ml: 14 }}>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
    </Box>
  );
};
