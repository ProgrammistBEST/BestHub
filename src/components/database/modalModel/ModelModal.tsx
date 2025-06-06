import React from "react";
import { Modal, Button } from "@mui/material";

const ModelModal = ({ isOpen, onClose, onAdd }) => {
  const handleAdd = () => {
    const newModel = {};
    onAdd(newModel);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div>
        <h2>Добавить модель</h2>
        <Button onClick={handleAdd}>Добавить</Button>
        <Button onClick={onClose}>Отмена</Button>
      </div>
    </Modal>
  );
};

export default ModelModal;