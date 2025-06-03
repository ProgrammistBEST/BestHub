import React from "react";
import { Dialog, DialogTitle, DialogContent, Button, Box } from "@mui/material";

const DeleteConfirmationDialog = ({ open, onClose, onDelete, article }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Подтверждение удаления</DialogTitle>
      <DialogContent>
        Вы действительно хотите удалить артикул "{article?.article}"?
      </DialogContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Button onClick={onClose} color="secondary">
          Отмена
        </Button>
        <Button onClick={onDelete} variant="contained" color="error">
          Удалить
        </Button>
      </Box>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;