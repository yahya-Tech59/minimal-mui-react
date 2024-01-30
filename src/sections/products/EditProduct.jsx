import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '../../components/axios';
import { IoCloseOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import ClearButton from '../../components/ClearButton';
import SubmitButton from '../../components/SubmitButton';
import { Box, Button, Typography, Icon, InputLabel, Input } from '@mui/material';
import CloseButton from '../../components/CloseButton';

export const EditProduct = ({ onClose, id }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [commission, setCommission] = useState('');
  const [products, setProducts] = useState([]);

  function handleClear() {
    setName('');
    setPrice('');
    setCommission('');
  }

  const schema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required(),
    commission: yup.number().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchProduct = async () => {
    const res = await axios.get(`api/v1/products/${id}/edit`);

    if (res.status === 200) {
      const ProductData = res.data[0];
      setName(ProductData?.name || '');
      setPrice(ProductData?.price || '');
      setCommission(ProductData?.commission || '');

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const EditProduct = async (data) => {
    const res = await axios.put(`/api/v1/products/${id}`, data);

    if (res.status === 202) {
      const response = await res.data;
      setProducts(response);
      alert('Product Updated Successfully');
      onClose();
      setLoading(false);
    }
  };

  useEffect(() => {
    EditProduct();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="form"
        onSubmit={handleSubmit(EditProduct)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: 'white',
          boxShadow: 2,
          width: '32rem',
          height: '32rem',
          borderRadius: 2,
          p: 3,
        }}
      >
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', gap: 5 }}>
            <Typography variant="h4" sx={{ ml: 7 }}>
              Edit Product
            </Typography>
            <Box sx={{ ml: 14 }}>
              <CloseButton onClick={onClose} />
            </Box>
          </Box>

          <Box sx={{ py: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
              <InputLabel>ProductName</InputLabel>
              <Input
                type="text"
                {...register('name')}
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
                placeholder="Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
              <InputLabel>Price</InputLabel>
              <Input
                type="number"
                {...register('price')}
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
                placeholder="$599"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, my: 3 }}>
              <InputLabel>commission </InputLabel>
              <Input
                type="number"
                {...register('commission')}
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
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
              />
            </Box>
          </Box>

          {/* <div className="flex mt-6 gap-4 justify-center ">
            <input type="checkbox" />
            <p>I agree With The Terms Of Use</p>
          </div> */}
          <Box
            sx={{
              display: 'flex',
              gap: 33,
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
