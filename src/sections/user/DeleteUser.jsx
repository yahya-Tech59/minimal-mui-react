import React, { useEffect, useState } from 'react';
import axios from '../../components/axios';

export const DeleteUser = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/v1/users/${id}`);

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
    deleteUser();
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
