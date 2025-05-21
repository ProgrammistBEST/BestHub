import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  Typography,
  Toolbar,
} from "@mui/material";
import axios from "axios";

// Компонент получения данных по api
const EnhancedTableToolbar = ({ onSearch }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Кнопка WB */}
      <Button
        variant="contained"
        sx={{
          height: "56px",
          background: "#4ec9b0",
          fontWeight: 600,
          px: 2,
          "&:hover": { background: "#307c5c" },
        }}
      >
        API
      </Button>
    </Toolbar>
  );
};

export const AddModelModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    brand: "",
    platform: "BestHub", // По умолчанию BestHub
    article: "",
    sku: "",
    sizes: [],
    pairs: [],
    category: "",
    gender: "",
    color: "",
  });

  const [sizesList, setSizesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  // Получение размеров
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/sizes");
        setSizesList(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке размеров:", error);
      }
    };
    fetchSizes();
  }, []);

  // Получение брендов
  useEffect(() => {
    const fetchBrands = async () => {
      try{
        const response = await axios.get("http://localhost:8001/api/brands");
        setBrandsList(response.data);
      } catch {
  
      }
    }
    fetchBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSizeChange = (size) => {
    const updatedSizes = formData.sizes.includes(size)
      ? formData.sizes.filter((s) => s !== size)
      : [...formData.sizes, size];
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/models", formData);
      onAdd(response.data);
      onClose();
    } catch (error) {
      console.error("Ошибка при создании модели:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Добавить модель</DialogTitle>
      <DialogContent>
        {/* Основной контейнер */}
        <Grid container spacing={2}>
          {/* Бренд и платформа */}
          <Grid item xs={12} className="container-full-width">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Бренд</InputLabel>
                  <Select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    sx={{ minWidth: '150px' }} // Установите значение, достаточное для отображения 8 символов
                  >
                    {brandsList.map((brand) => (
                      <MenuItem key={brand.brad_id} value={brand.brand}>
                        {brand.brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Платформа</InputLabel>
                  <Select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                  >
                    <MenuItem value="BestHub">BestHub</MenuItem>
                    <MenuItem value="OtherPlatform">OtherPlatform</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Артикулов */}
          <Grid item xs={12} className="container-full-width">
            <Typography variant="subtitle1">Артикулы</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="article"
                  label="Артикул"
                  value={formData.article}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              {formData.platform !== "BestHub" && (
                <Grid item xs={6}>
                  <TextField
                    name="article_association"
                    label="Артикул на платформе"
                    value={formData.article_association}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Размеры */}
          <Grid item xs={12}>
            <Typography variant="subtitle2">Размеры</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormGroup row sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {[
                    ...new Map(sizesList.map((size) => [size.size, size])).values(),
                  ]
                    .filter((size) => !String(size.size).includes("-")) // Исключаем размеры типа "40-41"
                    .map((size) => (
                      <FormControlLabel
                        key={size.size_id} // Уникальный ID
                        control={
                          <Checkbox
                            checked={formData.sizes.includes(size.size)}
                            onChange={() => handleSizeChange(size.size)}
                          />
                        }
                        label={size.size}
                      />
                    ))}
                </FormGroup>
              </Grid>
              {/* Ряд 2: Размеры 40-41, 46-47 и т.д. */}
              <Typography variant="subtitle2">Двойные размеры</Typography>
              <Grid item xs={12}>
                <FormGroup row sx={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {sizesList
                    .filter((size) => size.size.includes("-"))
                    .map((size) => (
                      <FormControlLabel
                        key={size.size_id}
                        control={
                          <Checkbox
                            checked={formData.sizes.includes(size.size)}
                            onChange={() => handleSizeChange(size.size)}
                          />
                        }
                        label={size.size}
                      />
                    ))}
                </FormGroup>
              </Grid>
              {/* Ряд 3: Инпут для нового размера */}
              <Grid item xs={12}>
                <TextField
                  name="customSize"
                  label="Создать новый размер"
                  fullWidth
                  margin="normal"
                  size="small" // Меньший размер инпута
                  onChange={(e) => {
                    const newSize = e.target.value;
                    if (!formData.sizes.includes(newSize)) {
                      setFormData({ ...formData, sizes: [...formData.sizes, newSize] });
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Блок 4: Категория, пол и цвет */}
          <Grid item xs={12}>
            <Typography variant="subtitle3">Дополнительно</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  name="category"
                  label="Категория"
                  value={formData.category}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="gender"
                  label="Пол"
                  value={formData.gender}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="color"
                  label="Цвет"
                  value={formData.color}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Блок 5: Кнопки получение данных по api */}
          <Grid item xs={12} className="container-full-width">
            <Typography variant="subtitle4">Получить данные по api</Typography>            
            <EnhancedTableToolbar/>
          </Grid>

          {/* Блок 6: Кнопки Сохранить и Отмена */}
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button type="submit" onClick={handleSubmit}>
                  Сохранить
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={onClose}>Отмена</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};