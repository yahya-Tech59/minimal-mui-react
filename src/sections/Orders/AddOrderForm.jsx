import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ClearButton from '../../components/ClearButton';
import SubmitButton from '../../components/SubmitButton';
import {
  Box,
  Typography,
  Button,
  InputLabel,
  Icon,
  Select,
  MenuItem,
  ListItem,
  FormControl,
  TextField,
  Stack,
  Checkbox,
  OutlinedInput,
} from '@mui/material';
import CloseButton from '../../components/CloseButton';

export const AddOrderForm = ({
  AddOrder,
  onClear,
  onClose,
  loading,
  products,
  agents,
  customers,
  orders,
  product_id,
  customer,
  agent,
  product_price_id,
  product_commission_id,
  status,
  setProduct_id,
  setCustomer,
  setAgent,
  setProduct_price_id,
  setProduct_commission_id,
  setStatus,
}) => {
  const schema = yup.object().shape({
    product_id: yup.number().required(),
    customer: yup.number().required(),
    agent: yup.number().required(),
    product_price_id: yup.number().required(),
    product_commission_id: yup.number().required(),
    status: yup.string().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  if (loading === true) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  return (
    <Box
      Box
      component="form"
      onSubmit={handleSubmit(AddOrder)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        bgcolor: 'white',
        boxShadow: 2,
        width: '39rem',
        height: '47rem',
        p: 3,
      }}
    >
      <Box sx={{ pb: 16, ml: 5, mt: 4 }}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h4" sx={{ ml: 8 }}>
            Add New Order
          </Typography>
          <Stack sx={{ ml: 18 }}>
            <CloseButton onClick={onClose} />
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl sx={{ py: 6 }}>
            <InputLabel>ProductID</InputLabel>
            <TextField
              {...register('product_id')}
              defaultValue={product_id}
              onChange={(e) => setProduct_id(e.target.value)}
              placeholder="select product ID"
              sx={{
                placeholder: '#707070',
                marginRight: 1,
                borderRadius: 3,
                width: '34rem',
                height: 2,
                color: 'black',
              }}
              label="Select ProductID"
              select
              size="small"
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  <ListItem>{product.name}</ListItem>2
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl sx={{ py: 3 }}>
            <InputLabel>Customer</InputLabel>
            <Select
              {...register('customer')}
              defaultValue={customer}
              onChange={(e) => setCustomer(e.target.value)}
              sx={{
                placeholder: '#707070',
                marginRight: 1,
                width: '34rem',
                height: 2,
                color: 'black',
                p: 2.5,
                mt: 3,
              }}
              label="Select Customer"
              input={<OutlinedInput />}
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {selected.map((value, index) => (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {/* <Checkbox checked={customer.indexOf(value) > -1} /> */}
                      <ListItem>{customers.find((cust) => cust.id === value)?.fullname}</ListItem>
                    </Box>
                  ))}
                </Box>
              )}
            >
              {customers.map((cust) => (
                <MenuItem key={cust.id} value={cust.id}>
                  <Checkbox checked={customers.indexOf(cust.id) > -1} />
                  <ListItem>{cust.fullname}</ListItem>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ py: 6 }}>
            <InputLabel>Agent</InputLabel>
            <Select
              {...register('agent')}
              defaultValue={agent}
              onChange={(e) => setAgent(e.target.value)}
              sx={{
                placeholder: '#707070',
                marginRight: 1,
                width: '34rem',
                height: 2,
                color: 'black',
                p: 2.5,
                mt: 3,
              }}
              label="Select an agent"
              input={<OutlinedInput />}
              multiple
              // renderValue={(selected) => selected.join(", ")}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {selected.map((value, index) => (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {/* <Checkbox checked={customer.indexOf(value) > -1} /> */}
                      <ListItem>{agents.find((agent) => agent.id === value)?.fullname}</ListItem>
                    </Box>
                  ))}
                </Box>
              )}
            >
              {agents.map((agent) => (
                <MenuItem key={agent.id} value={agent.id}>
                  <Checkbox checked={agents.indexOf(agent.id) > -1} />
                  <ListItem>{agent.fullname}</ListItem>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ py: 6 }}>
            <InputLabel>Product Price</InputLabel>
            <TextField
              {...register('product_price_id')}
              defaultValue={product_price_id}
              onChange={(e) => setProduct_price_id(e.target.value)}
              sx={{
                placeholder: '#707070',
                marginRight: 1,
                borderRadius: 3,
                width: '34rem',
                height: 2,
                color: 'black',
              }}
              label="Select Product Price"
              select
              size="small"
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  <ListItem>{product.price}</ListItem>
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl sx={{ py: 6 }}>
            <InputLabel>Product Commission</InputLabel>
            <TextField
              {...register('product_commission_id')}
              defaultValue={product_commission_id}
              onChange={(e) => setProduct_commission_id(e.target.value)}
              sx={{
                placeholder: '#707070',
                marginRight: 1,
                borderRadius: 3,
                width: '34rem',
                height: 2,
                color: 'black',
              }}
              label="Select Product Commission"
              select
              size="small"
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  <ListItem>{product.commission}</ListItem>
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl sx={{ py: 6 }}>
            <InputLabel>Status</InputLabel>
            <TextField
              {...register('status')}
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                placeholder: '#707070',

                marginRight: 1,
                borderRadius: 3,
                width: '34rem',
                height: 2,
                color: 'black',
              }}
              label="Select Order Status"
              select
              size="small"
            >
              {orders.map((order) => (
                <MenuItem key={order.id} value={order.status}>
                  <ListItem>{order.status_label}</ListItem>
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: 33, ml: 5, mt: 2 }}>
          <SubmitButton label="Submit" type="submit" />
          <ClearButton label="Clear" onClick={onClear} />
        </Box>
      </Box>
    </Box>
  );
};
