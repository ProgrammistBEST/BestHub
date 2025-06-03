import React from "react";
import { FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";

const SizeSelector = ({ sizesList, selectedSizes, onSizeChange }) => {
  return (
    <>
      <Typography variant="subtitle2">Размеры</Typography>
      <FormGroup row>
        {[
          ...new Map(sizesList.map((size) => [size.size, size])).values(),
        ]
          .filter((size) => !String(size.size).includes("-"))
          .map((size) => (
            <FormControlLabel
              key={size.size_id}
              control={
                <Checkbox
                  checked={selectedSizes.includes(size.size)}
                  onChange={() => onSizeChange(size.size)}
                />
              }
              label={size.size}
            />
          ))}
      </FormGroup>

      <Typography variant="subtitle2">Двойные размеры</Typography>
      <FormGroup row>
        {sizesList
          .filter((size) => size.size.includes("-"))
          .map((size) => (
            <FormControlLabel
              key={size.size_id}
              control={
                <Checkbox
                  checked={selectedSizes.includes(size.size)}
                  onChange={() => onSizeChange(size.size)}
                />
              }
              label={size.size}
            />
          ))}
      </FormGroup>
    </>
  );
};

export default SizeSelector;