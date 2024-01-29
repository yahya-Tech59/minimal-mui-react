import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '../../components/axios';
import { IoCloseOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
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
} from '@mui/material';
import CloseButton from '../../components/CloseButton';

export const EditOrder = ({ onClose, id }) => {
  const [product_id, setProduct_id] = useState('');
  const [customer, setCustomer] = useState('');
  const [agent, setAgent] = useState('');
  const [product_price_id, setProduct_price_id] = useState('');
  const [product_commission_id, setProduct_commission_id] = useState('');
  const [status, setStatus] = useState('');
  const [products, setProducts] = useState([]);
  const [agents, setAgents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setProduct_id('');
    setCustomer('');
    setAgent('');
    setProduct_price_id('');
    setProduct_commission_id('');
    setStatus('');
  };

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

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`/api/v1/products`);

      if (res.status === 200) {
        const productsData = await res.data;
        setProducts(productsData.data);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await axios.get(`/api/v1/customers`);

      if (res.status === 200) {
        const customersData = await res.data;
        setCustomers(customersData.data);
      }
    };

    fetchCustomers();
  }, []);

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

  useEffect(() => {
    const fetchOrderStatus = async () => {
      const res = await axios.get(`/api/v1/orders`);

      if (res.status === 200) {
        const OrderStatusData = await res.data;
        setOrders(OrderStatusData.data);
      }
    };

    fetchOrderStatus();
  }, []);

  const fetchOrder = async () => {
    const res = await axios.get(`api/v1/orders/${id}/edit`);

    if (res.status === 200) {
      const OrderData = res.data[0];
      setProduct_id(OrderData?.product_id || '');
      setCustomer(OrderData?.customer || '');
      setAgent(OrderData?.agent || '');
      setProduct_price_id(OrderData?.product_price_id || '');
      setProduct_commission_id(OrderData?.product_commission_id || '');
      setStatus(OrderData?.status || '');

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const EditOrder = async (data) => {
    try {
      setProduct_id(data.product_id);
      setCustomer(data.customer);
      setAgent(data.agent);
      setProduct_price_id(data.product_price_id);
      setProduct_commission_id(data.product_commission_id);
      setStatus(data.status);

      setLoading(true);
      const res = await axios.put(`/api/v1/orders${id}`, {
        product_id,
        customer,
        agent,
        product_price_id,
        product_commission_id,
        status,
      });

      if (res.status === 200) {
        alert('Order Updated Successfully');
        onClose();
        setLoading(false);
      }
    } catch (error) {
      // Handle error appropriately
      console.error('Error adding order:', error);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F9F9F9', position: 'absolute' }}>
      <Box
        Box
        component="form"
        onSubmit={handleSubmit(EditOrder)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: 'white',
          boxShadow: 2,
          width: '39rem',
          height: '42rem',
          p: 3,
        }}
      >
        <Box sx={{ pb: 16, ml: 5, mt: 8 }}>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h4" sx={{ ml: 8 }}>
              Edit Order
            </Typography>
            <Box sx={{ ml: 25 }}>
              <CloseButton onClick={onClose} />
            </Box>
          </Box>

          <Box sx={{ py: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, py: 0.5 }}>
              <InputLabel>ProductID</InputLabel>
              <Select
                {...register('product_id')}
                defaultValue={product_id}
                onChange={(e) => setProduct_id(e.target.value)}
                placeholder="select product ID"
                sx={{
                  placeholder: '#707070',
                  p: 2,
                  marginRight: 1,
                  borderRadius: 3,
                  width: '34rem',
                  height: 2,
                  color: 'black',
                }}
                // placeholder="Select product ID"
              >
                <MenuItem value="" disabled>
                  <ListItem>Select ProductID</ListItem>
                </MenuItem>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    <ListItem>{product.name}</ListItem>
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, py: 0.5 }}>
              <InputLabel>Customer</InputLabel>
              <Select
                {...register('customer')}
                defaultValue={customer}
                onChange={(e) => setCustomer(e.target.value)}
                sx={{
                  placeholder: '#707070',
                  p: 2,
                  marginRight: 1,
                  borderRadius: 3,
                  width: '34rem',
                  height: 2,
                  color: 'black',
                }}
              >
                <MenuItem value="" disabled>
                  <ListItem>Select Customer</ListItem>
                </MenuItem>
                {customers.map((cust) => (
                  <MenuItem key={cust.id} value={cust.id}>
                    <ListItem>{cust.fullname}</ListItem>
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, py: 0.5 }}>
              <InputLabel>Agent</InputLabel>
              <Select
                {...register('agent')}
                defaultValue={agent}
                onChange={(e) => setAgent(e.target.value)}
                sx={{
                  placeholder: '#707070',
                  p: 2,
                  marginRight: 1,
                  borderRadius: 3,
                  width: '34rem',
                  height: 2,
                  color: 'black',
                }}
              >
                <MenuItem value="" disabled>
                  <ListItem>Select an agent</ListItem>
                </MenuItem>
                {agents.map((agent) => (
                  <MenuItem key={agent.id} value={agent.id}>
                    <ListItem>{agent.fullname}</ListItem>
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, py: 0.5 }}>
              <InputLabel>Product Price</InputLabel>
              <Select
                {...register('product_price_id')}
                defaultValue={product_price_id}
                onChange={(e) => setProduct_price_id(e.target.value)}
                sx={{
                  placeholder: '#707070',
                  p: 2,
                  marginRight: 1,
                  borderRadius: 3,
                  width: '34rem',
                  height: 2,
                  color: 'black',
                }}
              >
                <MenuItem value="" disabled>
                  <ListItem>Select Product Price</ListItem>
                </MenuItem>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    <ListItem>{product.price}</ListItem>
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <InputLabel>Product Commission</InputLabel>
              <Select
                {...register('product_commission_id')}
                defaultValue={product_commission_id}
                onChange={(e) => setProduct_commission_id(e.target.value)}
                sx={{
                  placeholder: '#707070',
                  p: 2,
                  marginRight: 1,
                  borderRadius: 3,
                  width: '34rem',
                  height: 2,
                  color: 'black',
                }}
              >
                <MenuItem value="" disabled>
                  <ListItem>Select Product Commission</ListItem>
                </MenuItem>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    <ListItem>{product.commission}</ListItem>
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, py: 0.5 }}>
              <InputLabel>status</InputLabel>
              <Select
                {...register('status')}
                defaultValue={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{
                  placeholder: '#707070',
                  p: 2,
                  marginRight: 1,
                  borderRadius: 3,
                  width: '34rem',
                  height: 2,
                  color: 'black',
                }}
              >
                <MenuItem value="" disabled>
                  <ListItem>Select Order Status</ListItem>
                </MenuItem>
                {orders.map((order) => (
                  <MenuItem key={order.id} value={order.status}>
                    <ListItem>{order.status_label}</ListItem>
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          {/* <div className="flex mt-6 gap-4 justify-center ">
            <input type="checkbox" />
            <p>I agree With The Terms Of Use</p>
          </div> */}
          <Box sx={{ display: 'flex', gap: 33, ml: 5 }}>
            <SubmitButton label="Submit" />
            <ClearButton label="Clear" onClick={handleClear} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
