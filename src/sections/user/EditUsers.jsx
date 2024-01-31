import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '../../components/axios';
import { IoCloseOutline } from 'react-icons/io5';
import ClearButton from '../../components/ClearButton';
import SubmitButton from '../../components/SubmitButton';
import { Box, Input, InputLabel, Typography, Select, MenuItem, ListItem } from '@mui/material';
import CloseButton from '../../components/CloseButton';

export const EditUser = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState('');
  const [role, setRole] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
    roles: yup.string().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClear = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRoles('');
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await axios.get(`/api/v1/roles`);

      if (res.status === 200) {
        const roleData = await res.data;
        setRole(roleData.data);
      }
    };

    fetchRoles();
  }, []);

  const editUser = async (data) => {
    setLoading(true);
    const res = await axios.put('/api/v1/users', data);

    if (res.status === 200) {
      alert('User Updated successfully');
      setUsers(res.data);
      onClose();
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="form"
        onSubmit={handleSubmit(editUser)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: 'white',
          boxShadow: 2,
          width: '37rem',
          height: '37rem',
          p: 3,
        }}
      >
        <Box sx={{ pb: 2, ml: 2, mt: 4 }}>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h4" sx={{ ml: 3 }}>
              Edit User
            </Typography>
            <Box sx={{ ml: 28 }}>
              <CloseButton onClick={onClose} />
            </Box>
          </Box>

          <Box sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pb: 3 }}>
              <InputLabel>Name</InputLabel>
              <Input
                type="text"
                {...register('name')}
                sx={{
                  bgcolor: '#F9F9F9',
                  ':placeholder': {
                    color: '#707070',
                  },
                  mr: 1,
                  width: '32rem',
                }}
                placeholder="john"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pb: 3 }}>
              <InputLabel>Email</InputLabel>
              <Input
                type="text"
                {...register('email')}
                sx={{
                  bgcolor: '#F9F9F9',
                  ':placeholder': {
                    color: '#707070',
                  },
                  mr: 1,
                  width: '32rem',
                }}
                placeholder="$xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pb: 3 }}>
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                {...register('password')}
                sx={{
                  bgcolor: '#F9F9F9',
                  ':placeholder': {
                    color: '#707070',
                  },
                  mr: 1,
                  width: '32rem',
                }}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Box
              clsx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                py: 0.5,
              }}
            >
              <InputLabel>Role</InputLabel>

              <Select
                {...register('roles')}
                defaultValue={roles}
                onChange={(e) => setRoles(e.target.value)}
                sx={{
                  placeholder: '#707070',
                  p: 2.5,
                  marginRight: 1,
                  borderRadius: 3,
                  width: '32rem',
                  height: 2,
                  color: 'black',
                  mt: 1,
                }}
              >
                <option value="" disabled>
                  Select Role
                </option>
                {role.map((rol) => (
                  <MenuItem key={rol.id} value={rol.id}>
                    <ListItem>{rol.title}</ListItem>
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 32 }}>
            <SubmitButton label="Submit" type="submit" />
            <ClearButton label="Clear" onClick={handleClear} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
