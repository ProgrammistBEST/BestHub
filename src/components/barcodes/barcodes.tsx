import React, { useState } from "react";
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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GenerateBarcodesAndDownload from "./app";
import sizeOptions from "./sizes";

interface SizeOption {
  value: string;
  label: string;
}

interface ItemInput {
  article: string;
  size: string;
}

const MainMenu: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [itemInputs, setItemInputs] = useState<ItemInput[]>([
    { article: "", size: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddInput = () => {
    setItemInputs([...itemInputs, { article: "", size: "" }]);
  };

  const handleRemoveInput = (index: number) => {
    const updatedInputs = itemInputs.filter((_, i) => i !== index);
    setItemInputs(updatedInputs);
  };

  const handleInputChange = (
    index: number,
    field: keyof ItemInput,
    value: string
  ) => {
    const updatedInputs = [...itemInputs];
    updatedInputs[index][field] = value;
    setItemInputs(updatedInputs);
  };

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!selectedBrand || !selectedPlace) {
        setError("Выберите фирму и место");
        return;
      }

      const hasEmptyFields = itemInputs.some(
        (input) => !input.article.trim() || !input.size.trim()
      );
      if (hasEmptyFields) {
        setError("Заполните все поля артикулов и размеров");
        return;
      }

      // Отправка данных на сервер
      console.log("Отправляем данные:", {
        selectedBrand,
        selectedPlace,
        itemInputs,
      });
      const items: ItemInput[] = [
        {
          vendorCode: "001",
          sizes: [
            { size: "42", barcode: "123456789012", color: "Black" },
            { size: "43", barcode: "123456789013", color: "Blue" },
          ],
        },
      ];

      GenerateBarcodesAndDownload(items, "Bestshoes", "Warehouse");
      //   await GenerateBarcodesAndDownload(
      //     itemInputs,
      //     selectedBrand,
      //     selectedPlace
      //   );
    } catch (err) {
      setError("Произошла ошибка при генерации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4, borderRadius: 1 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 3 }}
      >
        <div style={{ display: "flex", gap: 20 }}>
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

          <FormControl sx={{ minWidth: 150, width: "200px", mb: 4 }}>
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

        <div
          style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          {itemInputs.map((input, index) => (
            <Box
              key={index}
              sx={{ display: "flex", gap: 2, alignItems: "center" }}
            >
              <TextField
                label="Артикул"
                value={input.article}
                sx={{ minWidth: 150, width: "100%" }}
                onChange={(e) =>
                  handleInputChange(index, "article", e.target.value)
                }
                fullWidth
              />
              <FormControl sx={{ minWidth: 150, width: "100%" }}>
                <InputLabel id={`size-input-label-${index}`}>Размер</InputLabel>
                <Select
                  labelId={`size-input-label-${index}`}
                  value={input.size}
                  label="Размер"
                  onChange={(e) =>
                    handleInputChange(index, "size", e.target.value)
                  }
                >
                  {sizeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveInput(index)}
                color="error"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </div>

        <Button variant="outlined" onClick={handleAddInput}>
          Добавить поле
        </Button>

        <Button
          variant="contained"
          onClick={handleGenerate}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={24} /> : null}
        >
          {isLoading ? "Генерация..." : "Сгенерировать"}
        </Button>
      </Box>
    </Box>
  );
};

export default MainMenu;
