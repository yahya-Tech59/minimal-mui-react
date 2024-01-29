import axios from '../../components/axios';
import { useState, useEffect } from 'react';
// import { Context } from "../../../Context/Context";

export const DeleteAgent = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);

  console.log('delete works', id);

  const deleteAgent = async () => {
    try {
      //setLoading(true);
      const res = await axios.delete(`/api/v1/agents/${id}`);

      if (res.status === 200) {
        alert('deleted successfuly');
        //setLoading(false);
        onClose();
      }
    } catch (error) {
      alert(error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    deleteAgent();
  });
};
