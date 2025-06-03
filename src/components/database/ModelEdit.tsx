// ModelEdit.tsx
import React from "react";
import { Button, TableCell } from "@mui/material";
import { styled } from "@mui/system";
import EditableField from "./EditableField";

// Стилизация для ячеек таблицы
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: 14,
  padding: "12px",
}));

interface ModelEditProps {
  row: any;
  editingRowId: number | null;
  editedData: Record<string, any>;
  setEditingRowId: (id: number | null) => void;
  setEditedData: (data: Record<string, any>) => void;
  onSave: (id: number) => void;
  onCancel: () => void;
}

const ModelEdit: React.FC<ModelEditProps> = ({
  row,
  editingRowId,
  editedData,
  setEditingRowId,
  setEditedData,
  onSave,
  onCancel,
}) => {
  if (editingRowId === row.model_id) {
    // Режим редактирования
    return (
      <>
        <StyledTableCell>{row.sku}</StyledTableCell>
        <StyledTableCell align="center">{row.brand}</StyledTableCell>
        <StyledTableCell align="center">
          <EditableField
            value={editedData.article || row.article}
            onChange={(value) => setEditedData({ ...editedData, article: value })}
          />
        </StyledTableCell>
        <StyledTableCell align="center">
          <EditableField
            value={editedData.size || row.size}
            onChange={(value) => setEditedData({ ...editedData, size: value })}
          />
        </StyledTableCell>
        <StyledTableCell align="center">
          <EditableField
            value={editedData.pair || row.pair}
            onChange={(value) => setEditedData({ ...editedData, pair: value })}
          />
        </StyledTableCell>
        <StyledTableCell align="center">
          <EditableField
            value={editedData.category || row.category}
            onChange={(value) => setEditedData({ ...editedData, category: value })}
          />
        </StyledTableCell>
        <StyledTableCell align="center">
          <EditableField
            value={editedData.gender || row.gender}
            onChange={(value) => setEditedData({ ...editedData, gender: value })}
          />
        </StyledTableCell>
        <StyledTableCell align="center">
          <EditableField
            value={editedData.color || row.color}
            onChange={(value) => setEditedData({ ...editedData, color: value })}
          />
        </StyledTableCell>
        <StyledTableCell align="center">{row.platform}</StyledTableCell>
        <StyledTableCell align="center">{row.updated_at}</StyledTableCell>
        <StyledTableCell align="center">
          <Button onClick={() => onSave(row.model_id)}>Сохранить</Button>
          <Button onClick={onCancel}>Отмена</Button>
        </StyledTableCell>
      </>
    );
  }

  // Режим просмотра
  return (
    <>
      <StyledTableCell>{row.sku}</StyledTableCell>
      <StyledTableCell align="center">{row.brand}</StyledTableCell>
      <StyledTableCell align="center">{row.article}</StyledTableCell>
      <StyledTableCell align="center">{row.size}</StyledTableCell>
      <StyledTableCell align="center">{row.pair}</StyledTableCell>
      <StyledTableCell align="center">{row.category}</StyledTableCell>
      <StyledTableCell align="center">{row.gender}</StyledTableCell>
      <StyledTableCell align="center">{row.color}</StyledTableCell>
      <StyledTableCell align="center">{row.platform}</StyledTableCell>
      <StyledTableCell align="center">{row.updated_at}</StyledTableCell>
      <StyledTableCell align="center">
        <Button onClick={() => setEditingRowId(row.model_id)}>Редактировать</Button>
      </StyledTableCell>
    </>
  );
};

export default ModelEdit;