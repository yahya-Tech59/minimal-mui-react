import { useState } from 'react';

export const useModalState = () => {
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [addOpen, setAddOpen] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  //const open = Boolean({ add, edit, del });

  const handleAddPopoverOpen = () => {
    setAddOpen(true);
  };

  const handleAddPopoverClose = () => {
    setAddOpen(null);
  };

  const handleEditOpen = (id) => {
    setEditId(id);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditId(null);
  };

  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteId(null);
  };

  return {
    editId,
    setEditId,
    deleteId,
    setDeleteId,
    editId,
    addOpen,
    editOpen,
    deleteId,
    deleteOpen,
    handleAddPopoverOpen,
    handleAddPopoverClose,
    handleEditOpen,
    handleEditClose,
    handleDeleteOpen,
    handleDeleteClose,
  };
};
