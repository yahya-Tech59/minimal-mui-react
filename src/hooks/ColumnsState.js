import { useState } from 'react';

export const useColumnsState = () => {
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [editAnchorEl, setEditAnchorEl] = useState(null);
  const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);

  const handleEditPopoverOpen = (event) => {
    setEditAnchorEl(event.currentTarget);
  };

  const handleEditPopoverClose = () => {
    setEditAnchorEl(null);
  };

  const handleDeletePopoverOpen = (event) => {
    setDeleteAnchorEl(event.currentTarget);
  };

  const handleDeletePopoverClose = () => {
    setDeleteAnchorEl(null);
  };

  return {
    editId,
    setEditId,
    deleteId,
    setDeleteId,
    editAnchorEl,
    deleteAnchorEl,
    handleEditPopoverOpen,
    handleEditPopoverClose,
    handleDeletePopoverOpen,
    handleDeletePopoverClose,
  };
};
