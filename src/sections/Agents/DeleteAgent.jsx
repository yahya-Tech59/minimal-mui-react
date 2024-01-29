import axios from 'axios';
import { useState, useEffect } from 'react';
// import { Context } from "../../../Context/Context";

export const DeleteAgent = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);

  // const { id } = useContext(Context);

  console.log('delete works', id);

  const deleteAgent = async () => {
    const baseUrl = 'https://spiky-crater-dep2vxlep8.ploi.online';
    const token = localStorage.getItem('token');

    try {
      //setLoading(true);
      const res = await axios.delete(`${baseUrl}/api/v1/agents/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

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
