import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import getStickerFile from "../utils/dataProcessor";
import { Select, MenuItem } from "@mui/material";

// Интерфейс для пропсов (если потребуется расширение)
interface MainMenuProps {}

const MainMenu: React.FC<MainMenuProps> = () => {
  // Состояния с правильной типизацией
  const [error, setError] = useState<string | null>(null);
  const [boxNumbers, setBoxNumbers] = useState<string>("");
  const [Selectedbrand, setSelectedBrand] = useState<string>("");
  // Обработчик генерации стикеров
  const handleGenerateStickers = async () => {
    try {
      const cleanedBoxNumbers = boxNumbers.replace(/\s+/g, ""); // Убираем пробелы
      const ids = cleanedBoxNumbers.match(/.{1,10}/g)?.map(Number) || [];
      await getStickerFile(Selectedbrand, ids);
      setError(null);
    } catch (err) {
      setError("Ошибка при генерации стикеров");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Сообщение об ошибке */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Контейнер с кнопками и полями ввода */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Кнопка обновления базы данных */}
        {/* <Button variant="contained" onClick={handleReloadDb}>
          Обновить базу данных
        </Button> */}

        {/* Поле для пути к Excel файлу */}
        {/* <TextField
          label="Путь к Excel файлу"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
        />
        <Button variant="contained" onClick={handleSelectFile}>
          Выбрать Excel файл
        </Button> */}

        <Select
          value={Selectedbrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          displayEmpty
          sx={{ minWidth: 150, width: "200px" }}
        >
          <MenuItem value="">Выберите фирму</MenuItem>
          <MenuItem value="Armbest">Armbest</MenuItem>
          <MenuItem value="Bestshoes">Bestshoes</MenuItem>
          <MenuItem value="Best26">Best26</MenuItem>
        </Select>

        {/* Поле для номеров коробов */}
        <TextField
          label="Номера заданий"
          value={boxNumbers}
          onChange={(e) => setBoxNumbers(e.target.value)}
        />
        <Button variant="contained" onClick={handleGenerateStickers}>
          Получить стикеры
        </Button>
      </Box>
    </Box>
  );
};

export default MainMenu;
