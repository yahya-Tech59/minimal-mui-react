import { useState } from 'react';

export const useModalState = () => {
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [add, setAdd] = useState(null);
  const [edit, setEdit] = useState(null);
  const [del, setDelete] = useState(null);

  //const open = Boolean({ add, edit, del });

  const handleAddPopoverOpen = (event) => {
    setAdd(event.currentTarget);
  };

  const handleAddPopoverClose = () => {
    setAdd(null);
  };

  const handleEditPopoverOpen = (event) => {
    setEdit(event.currentTarget);
  };

  const handleEditPopoverClose = () => {
    setEdit(null);
  };

  const handleDeletePopoverOpen = (event) => {
    setDelete(event.currentTarget);
  };

  const handleDeletePopoverClose = () => {
    setDelete(null);
  };

  return {
    editId,
    setEditId,
    deleteId,
    setDeleteId,
    add,
    edit,
    del,
    handleAddPopoverOpen,
    handleAddPopoverClose,
    handleEditPopoverOpen,
    handleEditPopoverClose,
    handleDeletePopoverOpen,
    handleDeletePopoverClose,
  };
};
