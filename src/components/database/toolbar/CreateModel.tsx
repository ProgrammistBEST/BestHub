import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { fetchSizes, fetchBrands, createModel } from "../../../services/apiService";
import SizeSelector from "./SizeSelector";
import AdditionalFields from "./AdditionalFields";

const CreateModel = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    brand: "",
    platform: "BestHub",
    article: "",
    article_association: "",
    sku: "",
    sizes: {},
    category: "",
    gender: "",
    color: "",
    compound: "",
  });


  const [sizesList, setSizesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  useEffect(() => {
    if (brandsList.length > 0 && !formData.brand) {
      setFormData((prev) => ({ ...prev, brand: brandsList[0].brand }));
    }
  }, [brandsList]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sizes = await fetchSizes();
        const brands = await fetchBrands();
        setSizesList(sizes);
        setBrandsList(brands);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
    loadData();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkuChange = (size, sku) => {
    setFormData((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: {
          ...prev.sizes[size],
          sku,
        },
      },
    }));
  };

  const handlePairsChange = (size, pairs) => {
    setFormData((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: {
          ...prev.sizes[size],
          pairs,
        },
      },
    }));
  };

  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: {
          ...prev.sizes[size],
          selected: !prev.sizes[size]?.selected,
          pairs: prev.sizes[size]?.pairs || "",
          sku: prev.sizes[size]?.sku || "",
        },
      },
    }));
  };

  const handleSubmit = async () => {
    const {
      brand,
      platform,
      article,
      article_association,
      sizes,
      category,
      gender,
      color,
      compound,
    } = formData;

    // Фильтруем только выбранные размеры
    const selectedSizeEntries = Object.entries(sizes).filter(
      ([, value]) => value.selected
    );

    if (!brand || !platform || !article || selectedSizeEntries.length === 0) {
      alert("Пожалуйста, заполните все обязательные поля: бренд, платформа, артикул, размер.");
      return;
    }

    try {
      const requests = selectedSizeEntries.map(([size, value]) => {
        const payload = {
          brand,
          platform,
          article,
          size,
          sku: value.sku || "",
          pair: value.pairs || 0,
          article_association: platform !== "BestHub" ? article_association || "" : null,
          category,
          gender,
          color,
          compound,
        };
        return createModel(payload);
      });

      await Promise.all(requests);

      alert("Модели успешно созданы!");
      onAdd();
    } catch (error) {
      console.error("Ошибка при создании модели:", error);
      alert("Ошибка при отправке данных. Проверьте введённые значения.");
    }
  };

  return (
      <>
        <Typography variant="h6" gutterBottom>Создать модель</Typography>
        <Grid container spacing={2}>
          {/* Бренд и платформа */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel>Бренд</InputLabel>
                  <Select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    label="Бренд *"
                  >
                    {brandsList.map((brand, index) => (
                      <MenuItem key={brand.brand_id || index} value={brand.brand}>
                        {brand.brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel>Платформа</InputLabel>
                  <Select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    label="Платформа *"
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
                  fullWidth
                  required
                  label="Артикул"
                  name="article"
                  value={formData.article}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Размеры */}
          <Grid item xs={12}>
            <SizeSelector
              sizesList={sizesList}
              selectedSizes={formData.sizes}
              onSizeChange={handleSizeChange}
              onPairsChange={handlePairsChange} // ← добавь это
              onSkuChange={handleSkuChange}     // ← и это
              platform={formData.platform}
            />
          </Grid>

          {/* Дополнительные поля */}
          <Grid item xs={12}>
            <AdditionalFields formData={formData} handleChange={handleChange} />
          </Grid>

          {/* Кнопки управления */}
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={handleSubmit}>Сохранить</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={onClose}>Отмена</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
  );
};

export default CreateModel;