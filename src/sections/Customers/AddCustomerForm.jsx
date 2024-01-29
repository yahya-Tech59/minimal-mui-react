// AddCustomerForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, InputLabel, Input, TextField, MenuItem, ListItem, Typography } from '@mui/material';
import CloseButton from '../../components/CloseButton';
import SubmitButton from '../../components/SubmitButton';
import ClearButton from '../../components/ClearButton';

const AddCustomerForm = ({
  AddCustomer,
  onClear,
  loading,
  name,
  setName,
  contact,
  setContact,
  address,
  setAddress,
  agents,
  agency_id,
  setAgency_id,
  onClose,
}) => {
  const schema = yup.object().shape({
    fullname: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    agency_id: yup.string().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  if (loading === true) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(AddCustomer)}
      display="flex"
      flexDirection="column"
      gap={1}
      bgcolor="white"
      boxShadow={2}
      width="38rem"
      height="39rem"
      borderRadius={2}
      p={3}
    >
      <Box mt={4}>
        <Box display="flex" gap={5}>
          <Typography variant="h4" ml={7}>
            Add New Customer
          </Typography>
          <Box ml={17}>
            <CloseButton onClick={onClose} />
          </Box>
        </Box>

        <Box mt={4} ml={3}>
          <Box display="flex" flexDirection="column" gap={1} py={2}>
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

          <Box display="flex" flexDirection="column" gap={1} py={2}>
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
          <Box display="flex" flexDirection="column" gap={1} py={2}>
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

          <Box display="flex" flexDirection="column" gap={1} py={2}>
            <InputLabel>Agency</InputLabel>
            <TextField
              {...register('agency_id')}
              defaultValue={agency_id}
              onChange={(e) => setAgency_id(e.target.value)}
              sx={{
                borderRadius: 3,
                width: '32rem',
                height: 2,
                color: 'black',
              }}
              label="Select an agent"
              select
              size="small"
            >
              {agents.map((agent) => (
                <MenuItem key={agent.id} value={agent.id} sx={{ paddingBottom: 2 }}>
                  <ListItem>{agent.fullname}</ListItem>
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 38,
            ml: 2,
            mt: 7,
          }}
        >
          <SubmitButton label="Submit" />
          <ClearButton label="Clear" onClick={onClear} />
        </Box>
      </Box>
    </Box>
  );
};

export default AddCustomerForm;
