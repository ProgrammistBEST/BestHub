import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography
} from "@mui/material";

const DeleteConfirmationDialog = ({ open, onClose, onDelete, article }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Подтвердите удаление</DialogTitle>
      <DialogContent>
        <Typography>
          Вы уверены, что хотите удалить внешний артикул <b>{article?.external_article}</b>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onDelete} color="error" variant="contained">Удалить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
