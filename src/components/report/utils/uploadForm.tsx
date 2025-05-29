import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  CircularProgress,
} from "@mui/material";

import { uploadReport } from "./api";

const UploadForm = ({ onUploadSuccess }) => {
  const [brand, setBrand] = useState("BEST SHOES");
  const [datePeriod, setDatePeriod] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [variantReport, setVariantReport] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("datePeriod", datePeriod);
    if (file) formData.append("file", file);
    try {
      const result = await uploadReport(formData);
      if (result?.success) {
        onUploadSuccess(result.data);
      }
    } catch (error) {
      console.error("Ошибка загрузки отчёта:", error);
    } finally {
      setLoading(false);
    }
  };

  const variantReportHandle = (type: string) => {
    setVariantReport(type);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 400,
        // mx: "auto",
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      {/* Файл */}
      <Box>
        <Typography variant="body2" gutterBottom>
          Файл отчёта
        </Typography>
        <Button
          variant="outlined"
          component="label"
          fullWidth
          disabled={loading}
        >
          {file ? file.name : "Выберите файл"}
          <input
            type="file"
            name="file"
            hidden
            required
            onChange={handleFileChange}
            disabled={loading}
          />
        </Button>
      </Box>

      {/* Бренд */}
      <FormControl fullWidth disabled={loading}>
        <InputLabel id="brand-select-label">Бренд</InputLabel>
        <Select
          labelId="brand-select-label"
          value={brand}
          label="Бренд"
          onChange={(e) => setBrand(e.target.value)}
        >
          <MenuItem value="BEST SHOES">BEST SHOES</MenuItem>
          <MenuItem value="ARMBEST">ARMBEST</MenuItem>
          <MenuItem value="BEST 26">BEST 26</MenuItem>
          <MenuItem value="OZON ARMBEST">OZON ARMBEST</MenuItem>
          <MenuItem value="OZON BEST SHOES">OZON BEST SHOES</MenuItem>
        </Select>
      </FormControl>

      {/* Период */}
      <TextField
        label="Период"
        variant="outlined"
        value={datePeriod}
        onChange={(e) => setDatePeriod(e.target.value)}
        disabled={loading}
        helperText="Например: Январь 2025"
        required
      />

      {/* Кнопка отправки */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? "Загрузка..." : "Получить отчёт по файлу"}
      </Button>
    </Box>
  );
};

export default UploadForm;
