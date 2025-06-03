import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Button, Grid, Typography } from "@mui/material";
import { fetchSizes, fetchBrands, createModel } from "../../../services/apiService";
import SizeSelector from "./SizeSelector";
import AdditionalFields from "./AdditionalFields";

const CreateModel = ({ isOpen, onClose, onAdd }) => {
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
    const loadData = async () => {
        try {
        const sizes = await fetchSizes();
        const brands = await fetchBrands();
        console.log("Загруженные размеры:", sizes);
        console.log("Загруженные бренды:", brands);
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

  const handleSizeChange = (size) => {
    const updatedSizes = formData.sizes.includes(size)
      ? formData.sizes.filter((s) => s !== size)
      : [...formData.sizes, size];
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleSubmit = async () => {
    try {
      const newModel = await createModel(formData);
      onAdd(newModel);
      onClose();
    } catch (error) {
      console.error("Ошибка при создании модели:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Создать модель</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Бренд и платформа */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Бренд</Typography>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                >
                  <option value="">Выберите бренд</option>
                  {brandsList.map((brand) => (
                    <option key={brand.brad_id} value={brand.brand}>
                      {brand.brand}
                    </option>
                  ))}
                </select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Платформа</Typography>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                >
                  <option value="BestHub">BestHub</option>
                  <option value="OtherPlatform">OtherPlatform</option>
                </select>
              </Grid>
            </Grid>
          </Grid>

          {/* Артикулы */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Артикул</Typography>
                <input
                  name="article"
                  value={formData.article}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                />
              </Grid>
              {formData.platform !== "BestHub" && (
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Артикул на платформе</Typography>
                  <input
                    name="article_association"
                    value={formData.article_association}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Размеры */}
          <Grid item xs={12}>
            <SizeSelector
              sizesList={sizesList}
              selectedSizes={formData.sizes}
              onSizeChange={handleSizeChange}
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
                <Button onClick={handleSubmit}>Сохранить</Button>
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

export default CreateModel;