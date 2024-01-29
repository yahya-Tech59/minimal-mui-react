import React, { useEffect, useState } from 'react';
import axios from '../../components/axios';

export const DeleteCustomer = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);

  const deleteCustomer = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/v1/customers/${id}`);

      if (res.status === 204) {
        setLoading(false);
        onClose();
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    deleteCustomer();
  }, [id]);
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       {loading ? (
  //         <p className="text-xl font-semibold">Deleting...</p>
  //       ) : (
  //         <p className="text-xl font-semibold">Deletion completed.</p>
  //       )}
  //     </div>
  //   );
};
