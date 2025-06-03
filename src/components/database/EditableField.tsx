// EditableField.tsx
import React from "react";
import { TextField } from "@mui/material";

interface EditableFieldProps {
  value: string | number;
  onChange: (value: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onChange }) => {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ width: "12ch" }}
    />
  );
};

export default EditableField;