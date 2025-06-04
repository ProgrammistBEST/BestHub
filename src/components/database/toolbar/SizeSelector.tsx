import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";

const SizeSelector = ({ sizesList, selectedSizes, onSizeChange, onPairsChange, onSkuChange, platform }) => {
  const singleSizes = sizesList.filter(({ size }) => !size.includes("-"));
  const doubleSizes = sizesList.filter(({ size }) => size.includes("-"));

  const renderSizeGroup = (title, sizes) => (
    <>
      <Typography variant="subtitle2" gutterBottom>{title}</Typography>
      <Grid container spacing={2} mb={2}>
        {sizes.map(({ size, size_id }) => {
          const sizeState = selectedSizes[size] || { selected: false, pairs: "", sku: "" };

          return (
            <Grid key={size_id} item xs={12} sm={6} md={4} lg={3}>
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
                {/* Чекбокс с размером */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sizeState.selected}
                      onChange={() => onSizeChange(size)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">{size}</Typography>}
                />

                {/* Поле Пары в кор. */}
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor={`pairs-${size}`} sx={{ minWidth: 100 }}>
                    Пары в кор.
                  </InputLabel>
                  <TextField
                    id={`pairs-${size}`}
                    type="number"
                    size="small"
                    placeholder="20"
                    value={sizeState.pairs || ""}
                    onChange={(e) => onPairsChange(size, parseInt(e.target.value) || 0)}
                    disabled={!sizeState.selected} // ← блокировка при неактивном чекбоксе
                    inputProps={{
                      min: 0,
                      maxLength: 3,
                      style: {
                        fontSize: 12,
                        padding: "6px 8px",
                        width: "60px",
                      },
                    }}
                  />
                </FormControl>

                {/* SKU */}
                {platform !== "BestHub" && (
                  <TextField
                    size="small"
                    placeholder="Введите SKU"
                    value={sizeState.sku}
                    onChange={(e) => onSkuChange(size, e.target.value)}
                    disabled={!sizeState.selected} // ← блокировка при неактивном чекбоксе
                    inputProps={{
                      maxLength: 14,
                      style: {
                        fontSize: 12,
                        fontFamily: "monospace",
                        padding: "6px 8px",
                      },
                    }}
                    fullWidth
                  />
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );

  return (
    <Box>
      {renderSizeGroup("Обычные размеры", singleSizes)}
      {renderSizeGroup("Двойные размеры", doubleSizes)}
    </Box>
  );
};

export default SizeSelector;
