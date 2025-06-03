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
  Toolbar
} from "@mui/material";
import axios from "axios";

// Компонент получения данных по API
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

const CreateModel  = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    brand: "",
    platform: "BestHub",
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

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/brands");
        setBrandsList(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке брендов:", error);
      }
    };
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
        <Grid container spacing={2}>
          {/* Бренд и платформа */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Бренд</InputLabel>
                  <Select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    sx={{ minWidth: '150px' }}
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

          {/* Артикулы */}
          <Grid item xs={12}>
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
                <FormGroup row>
                  {[
                    ...new Map(sizesList.map((size) => [size.size, size])).values(),
                  ]
                    .filter((size) => !String(size.size).includes("-"))
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
              <Typography variant="subtitle2">Двойные размеры</Typography>
              <Grid item xs={12}>
                <FormGroup row>
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
              {/* <Grid item xs={12}>
                <TextField
                  name="customSize"
                  label="Создать новый размер"
                  fullWidth
                  margin="normal"
                  size="small"
                  onChange={(e) => {
                    const newSize = e.target.value;
                    if (!formData.sizes.includes(newSize)) {
                      setFormData({ ...formData, sizes: [...formData.sizes, newSize] });
                    }
                  }}
                />
              </Grid> */}
            </Grid>
          </Grid>

          {/* Дополнительные поля */}
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

          {/* API Toolbar */}
          <Grid item xs={12}>
            <Typography variant="subtitle4">Получить данные по API</Typography>
            <EnhancedTableToolbar />
          </Grid>

          {/* Кнопки управления */}
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
  );
};

export default CreateModel;