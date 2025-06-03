// ModelSearch.js
import React from "react";
import { TextField } from "@mui/material";

const ModelSearch = ({ onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <TextField
      label="Поиск по артикулу или названию"
      variant="outlined"
      placeholder="Введите запрос"
      fullWidth
      margin="normal"
      onChange={handleSearchChange}
      autoComplete="off"
    />
  );
};

export default ModelSearch;