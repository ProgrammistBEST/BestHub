// src/components/FormRenderer.jsx
import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setFormData } from "../../../store/formSlice";

export const FormRenderer = () => {
  const dispatch = useDispatch();
  const { mode, formData } = useSelector((state) => state.form);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  if (mode === "article") {
    return (
      <TextField
        label="Артикул"
        name="article"
        value={formData.article}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    );
  }

  if (mode === "size") {
    return (
      <TextField
        label="Размер"
        name="size"
        value={formData.size}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    );
  }

  if (mode === "platform") {
    return (
      <FormControl fullWidth margin="normal">
        <InputLabel>Платформа</InputLabel>
        <Select name="platform" value={formData.platform} onChange={handleChange}>
          <MenuItem value="WB">WB</MenuItem>
          <MenuItem value="OZON">OZON</MenuItem>
        </Select>
      </FormControl>
    );
  }

  // Режим manual — все поля
  return (
    <>
      <TextField
        label="Бренд"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Артикул"
        name="article"
        value={formData.article}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox />}
          label="Пример размера"
        />
      </FormGroup>
    </>
  );
};