import axios from 'axios';
import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'src/routes/hooks';

// import { Google, facebook, hope, hope_ui, instagram, linkedin } from '../assets/img';

// import { MdError } from 'react-icons/md';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SignIn() {
  const theme = useTheme();

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  //   const [showError, setShowError] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('email format is not valid').required('email is required'),
    password: yup.string().min(4).max(15).required('password is required'),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  // const { errors } = formState;

  const fetchLogin = async (data) => {
    try {
      setLoading(true);
      const baseURL = 'https://spiky-crater-dep2vxlep8.ploi.online';

      const res = await axios.post(`${baseURL}/api/auth/login`, data);

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        router.push('/dashboard');
        // alert("logged in Successfuly");
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      //   if (error.response) {
      //     // The request was made and the server responded with a status code
      //     setShowError(error.response.data.message || 'An error occurred');
      //   } else if (error.request) {
      //     // The request was made but no response was received
      //     setShowError('No response received from the server');
      //   } else {
      //     // Something happened in setting up the request that triggered an Error
      //     setShowError('An error occurred');
      //   }
    }
  };

  if (loading === true) {
    return (
      <Typography variant="h1" sx={{ fontSize: '20', fontWeight: 600, marginLeft: '53rem' }}>
        Loading...
      </Typography>
    );
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          label="Email "
          {...register('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* {errors.email?.message && <FormHelperText error>{errors.email.message}</FormHelperText>} */}

        <TextField
          label="Password "
          type="password"
          {...register('password')}
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        // onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
      component="form"
      onSubmit={handleSubmit(fetchLogin)}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Minimal</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
