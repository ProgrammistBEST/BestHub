import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, CircularProgress } from "@mui/material";

const ArticleModal = ({ open, onClose, onSave, isSaving, formState, setFormState, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Артикул"
          fullWidth
          value={formState.article}
          onChange={(e) => setFormState({ ...formState, article: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Ассоциация"
          fullWidth
          value={formState.association}
          onChange={(e) => setFormState({ ...formState, association: e.target.value })}
        />
      </DialogContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Button onClick={onClose} color="secondary">
          Отмена
        </Button>
        <Button onClick={onSave} variant="contained" color="primary" disabled={isSaving}>
          {isSaving ? <CircularProgress size={24} /> : "Сохранить"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default ArticleModal;