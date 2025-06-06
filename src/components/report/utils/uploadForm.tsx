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
  const [summForTax1, setSummForTax1] = useState(0);
  const [summForTax2, setSummForTax2] = useState(0);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let summForFetch = (Number(summForTax1) + Number(summForTax2)) * 0.07;
    const formData = new FormData();
    formData.append("brand", brand);
    formData.append("datePeriod", datePeriod);
    formData.append(
      "summForTax",
      summForFetch.toLocaleString("ru-RU").toString()
    );

    console.log(formData);
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

  // Функция для форматирования числа
  const formatNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/[^0-9]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleInputChange1 = (e) => {
    const rawValue = e.target.value; // Исходное значение из поля ввода

    // Обновляем состояние
    setSummForTax1(rawValue);
  };

  const handleInputChange2 = (e) => {
    const rawValue = e.target.value; // Исходное значение из поля ввода

    // Обновляем состояние
    setSummForTax2(rawValue);
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

      {/* Налог 1 */}
      <TextField
        label="Продажа основной отчёт"
        variant="outlined"
        value={summForTax1}
        onChange={handleInputChange1}
        disabled={loading}
        helperText="Например: 60 000"
        required
      />

      {/* Налог 2 */}
      <TextField
        label="Продажа дополнительный отчёт"
        variant="outlined"
        value={summForTax2}
        onChange={handleInputChange2}
        disabled={loading}
        helperText="Например: 60 000"
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
