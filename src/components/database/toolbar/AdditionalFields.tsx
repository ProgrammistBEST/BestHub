import React from "react";
import { TextField, Grid, Typography } from "@mui/material";

const AdditionalFields = ({ formData, handleChange }) => {
  return (
    <>
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
    </>
  );
};

export default AdditionalFields;