import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, TextField, Button, Box,
  CircularProgress, MenuItem, IconButton, InputAdornment,
  Autocomplete
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

const ExternalArticleModal = ({
  open,
  onClose,
  onSave,
  isSaving,
  formState,
  setFormState,
  title,
  platformOptions,
  articleOptions,
  onCreateArticle,
  isAddingStandaloneArticle,
}) => {
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [newArticleName, setNewArticleName] = useState("");

  const isEditingExternalArticle = !!formState.external_article_id;

  useEffect(() => {
    if (open) {
      setIsCreatingArticle(false);
      setNewArticleName("");
    }
  }, [open]);

  const handleAddArticle = async () => {
    const name = newArticleName.trim();
    if (!name) {
      alert("Название артикула не может быть пустым");
      return;
    }

    await onCreateArticle(name);
    setNewArticleName("");
    setIsCreatingArticle(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {isAddingStandaloneArticle ? (
          <TextField
            label="Название артикула"
            fullWidth
            margin="dense"
            value={newArticleName}
            onChange={(e) => setNewArticleName(e.target.value)}
          />
        ) : (
          <>
            <Autocomplete
              fullWidth
              options={articleOptions}
              getOptionLabel={(option) => option.article || ""}
              isOptionEqualToValue={(option, value) => option.article_id === value.article_id}
              value={
                articleOptions.find(a => a.article_id === formState.article_id) || null
              }
              onChange={(_, newValue) => {
                setFormState({
                  ...formState,
                  article_id: newValue ? newValue.article_id : ""
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Артикул"
                  margin="dense"
                />
              )}
            />

            <TextField
              margin="dense"
              label="Внешний артикул"
              fullWidth
              value={formState.external_article || ""}
              onChange={(e) =>
                setFormState({ ...formState, external_article: e.target.value })
              }
            />

            <TextField
              margin="dense"
              label="Платформа"
              select
              fullWidth
              value={formState.platform_id || ""}
              onChange={(e) =>
                setFormState({ ...formState, platform_id: Number(e.target.value) })
              }
              disabled={isEditingExternalArticle}
            >
              {platformOptions.map((platform) => (
                <MenuItem key={platform.platform_id} value={platform.platform_id}>
                  {platform.platform}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}
      </DialogContent>

      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Button onClick={onClose} color="secondary">Отмена</Button>
        <Button
          onClick={() => {
            if (isAddingStandaloneArticle) {
              handleAddArticle(); // создать новый артикул
            } else {
              onSave(); // сохранить внешний артикул
            }
          }}
          variant="contained"
          color="primary"
          disabled={isSaving}
        >
          {isSaving ? <CircularProgress size={24} /> : "Сохранить"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default ExternalArticleModal;