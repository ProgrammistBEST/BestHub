import React, { useState } from "react";
import getStickerFile from "../utils/dataProcessor";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  CircularProgress,
} from "@mui/material";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

// Интерфейс для пропсов (если потребуется расширение)
interface MainMenuProps {}

const MainMenu: React.FC<MainMenuProps> = () => {
  const [error, setError] = useState<string | null>("");
  const [boxNumbers, setBoxNumbers] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>("");
  const [selectedPlace, setSelectedPlace] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (variant: any, message: string) => {
    enqueueSnackbar(`${message}.`, { variant });
  };
  // Обработчик генерации стикеров
  const handleGenerateStickers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!selectedBrand || !selectedPlace) {
        setError("Выберите фирму и место");
        return;
      }
      if (!boxNumbers.trim()) {
        setError("Введите номера заданий");
        return;
      }
      const cleanedBoxNumbers = boxNumbers.replace(/\s+/g, "");
      const ids = cleanedBoxNumbers.match(/.{1,10}/g)?.map(Number) || [];

      if (ids.length === 0) {
        setError("Номера заданий введены некорректно");
        return;
      }

      const result = await getStickerFile(selectedBrand, selectedPlace, ids);
      if (result == false) {
        handleClick("error", "Ошибка при генерации стикеров");
      }
    } catch (err) {
      setError("Ошибка при генерации стикеров");
    } finally {
      setIsLoading(false); // Выключаем режим загрузки
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        borderRadius: 1,
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Сообщение об ошибке */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Контейнер с кнопками и полями ввода */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: 3,
        }}
      >
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
        <div style={{ display: "flex", gap: 20 }}>
          {/* Первый FormControl */}
          <FormControl sx={{ minWidth: 150, width: "200px" }}>
            <InputLabel id="brand-input-label">Фирма</InputLabel>
            <Select
              labelId="brand-input-label"
              value={selectedBrand}
              label="Фирма"
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <MenuItem value="">Выберите фирму</MenuItem>
              <MenuItem value="Armbest">Armbest</MenuItem>
              <MenuItem value="Bestshoes">Bestshoes</MenuItem>
              <MenuItem value="Best26">Best26</MenuItem>
              <MenuItem value="Arm2">Arm2</MenuItem>
            </Select>
          </FormControl>

          {/* Второй FormControl */}
          <FormControl sx={{ minWidth: 150, width: "200px" }}>
            <InputLabel id="place-input-label">Место</InputLabel>
            <Select
              labelId="place-input-label"
              value={selectedPlace}
              label="Место"
              onChange={(e) => setSelectedPlace(e.target.value)}
            >
              <MenuItem value="">Выберите место</MenuItem>
              <MenuItem value="WB">WB</MenuItem>
              <MenuItem value="OZON">OZON</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* Поле для номеров коробов */}
        {selectedBrand && selectedPlace && (
          <>
            <TextField
              label="Номера заданий"
              value={boxNumbers}
              onChange={(e) => setBoxNumbers(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleGenerateStickers}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={24} /> : null}
            >
              {isLoading ? "Генерация..." : "Получить стикеры"}
            </Button>
          </>
        )}
        {/* Если список пуст */}
        {(!selectedBrand || !selectedPlace) && (
          <Alert variant="filled" severity="info">
            Выберите фирму и место
          </Alert>
        )}{" "}
      </Box>
    </Box>
  );
};

export default MainMenu;
