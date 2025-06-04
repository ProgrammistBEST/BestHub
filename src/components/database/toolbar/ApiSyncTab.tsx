// ApiSyncTab.js
import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography
} from "@mui/material";
import axios from "axios";

const ApiSyncTab = ({ brandsList }) => {
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleApiSync = async (platform) => {
    if (!selectedBrand) {
      alert("Пожалуйста, выберите бренд");
      return;
    }

    const body = {
      brand: selectedBrand,
      platform,
      apiCategory: "general",
    };

    try {
      await axios.post(`http://localhost:8001/api/models/${platform.toLowerCase()}`, body);
      alert(`Успешно отправлено на ${platform}`);
    } catch (error) {
      console.error(`Ошибка при отправке на ${platform}:`, error);
      alert("Ошибка при отправке запроса");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} mt={2}>
      <Typography variant="h6">Синхронизация моделей с API</Typography>

      <FormControl fullWidth>
        <InputLabel>Бренд</InputLabel>
        <Select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          label="Бренд"
        >
          {brandsList.map((brand, index) => (
            <MenuItem key={index} value={brand.brand}>
              {brand.brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#7F3FBF", color: "white", '&:hover': { backgroundColor: "#6d32a8" } }}
          onClick={() => handleApiSync("Wildberies")}
        >
          WB (Wildberries)
        </Button>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#005BFE", color: "white", '&:hover': { backgroundColor: "#0047c2" } }}
          onClick={() => handleApiSync("Ozon")}
        >
          OZON
        </Button>
      </Box>
    </Box>
  );
};

export default ApiSyncTab;
