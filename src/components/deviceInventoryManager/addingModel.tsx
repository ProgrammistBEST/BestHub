import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const AddNewModelButton = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [newModel, setNewModel] = useState({
    serialNumber: "",
    type: "",
    manufacturer: "",
    model: "",
    purchaseDate: "",
    location: "",
  });

  // Открытие модального окна
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Закрытие модального окна
  const handleClose = () => {
    setOpen(false);
  };

  // Обработка изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewModel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Добавление новой модели
  const handleAdd = () => {
    onAdd(newModel); // Передаем данные новой модели родительскому компоненту
    setNewModel({
      serialNumber: "",
      type: "",
      manufacturer: "",
      model: "",
      purchaseDate: "",
      location: "",
    });
    handleClose();
  };

  return (
    <>
      {/* Кнопка добавления новой модели */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleClickOpen}
        sx={{ height: "40px", marginLeft: "16px" }}
      >
        Добавить новую модель
      </Button>

      {/* Модальное окно для добавления новой модели */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить новую модель</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Серийный номер"
              name="serialNumber"
              value={newModel.serialNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Тип оборудования"
              name="type"
              value={newModel.type}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Производитель"
              name="manufacturer"
              value={newModel.manufacturer}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Модель"
              name="model"
              value={newModel.model}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Дата покупки"
              name="purchaseDate"
              type="date"
              value={newModel.purchaseDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Расположение"
              name="location"
              value={newModel.location}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleClose} sx={{ mr: 2 }}>
                Отмена
              </Button>
              <Button
                variant="contained"
                onClick={handleAdd}
                disabled={
                  !newModel.serialNumber ||
                  !newModel.type ||
                  !newModel.manufacturer ||
                  !newModel.model ||
                  !newModel.purchaseDate ||
                  !newModel.location
                }
              >
                Добавить
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewModelButton;
