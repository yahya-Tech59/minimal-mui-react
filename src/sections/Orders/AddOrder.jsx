import axios from '../../Services/axiosConfig';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { AddOrderForm } from './AddOrder';

export const AddOrder = ({ onClose }) => {
  const [product_id, setProduct_id] = useState('');
  const [customer, setCustomer] = useState([]);
  const [agent, setAgent] = useState([]);
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

  const AddOrder = async (data) => {
    try {
      setProduct_id(data.product_id);
      setCustomer(data.customer);
      setAgent(data.agent);
      setProduct_price_id(data.product_price_id);
      setProduct_commission_id(data.product_commission_id);
      setStatus(data.status);

      setLoading(true);
      const res = await axios.post(`/api/v1/orders`, {
        product_id,
        customer,
        agent,
        product_price_id,
        product_commission_id,
        status,
      });

      if (res.status === 200) {
        alert('Order Registered Successfully');

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
    <Box display="flex">
      <Box ml={3}>
        <AddOrderForm
          AddOrder={AddOrder}
          onClear={handleClear}
          onClose={onClose}
          loading={loading}
          products={products}
          agents={agents}
          customers={customers}
          orders={orders}
          product_id={product_id}
          customer={customer}
          agent={agent}
          product_price_id={product_price_id}
          product_commission_id={product_commission_id}
          status={status}
          setProduct_id={setProduct_id}
          setCustomer={setCustomer}
          setAgent={setAgent}
          setProduct_price_id={setProduct_price_id}
          setProduct_commission_id={setProduct_commission_id}
          setStatus={setStatus}
        />
      </Box>
    </Box>
  );
};
