// ModelTable.js
import React, { useState } from "react";
import { Box, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TextField, Typography, Button } from "@mui/material";
import ModelSearch from "../search/ModelSearch";
import ModelEdit from "./ModelEdit";
import ModelPagination from "../pagination/ModelPagination";
import { styled } from "@mui/system";
import { AddModelModal } from "./modalModel/AddModelModal";

// Стилизация для таблицы
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: 14,
  padding: "12px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

const ModelTable = ({
  data,
  onSearch,
  editingRowId,
  editedData,
  setEditingRowId,
  setEditedData,
  onSave,
  onCancel,
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [filterValues, setFilterValues] = useState({
    sku: "",
    brand: "",
    article: "",
    size: "",
    pair: "",
    category: "",
    gender: "",
    color: "",
    compound: "",
    platform: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const filteredData = data.filter((row) =>
    Object.entries(filterValues).every(([key, value]) => {
      if (!value) return true;
      return row[key]?.toString().toLowerCase().includes(value.toLowerCase());
    })
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* Кнопка для добавления модели */}
        <Button onClick={() => { setModalMode("add"); setIsModalOpen(true); }}>
          Управление моделями
        </Button>

        {/* Таблица */}
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <TextField
                    label="SKU"
                    variant="standard"
                    value={filterValues.sku}
                    onChange={(e) => setFilterValues({ ...filterValues, sku: e.target.value })}
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    label="Бренд"
                    variant="standard"
                    value={filterValues.brand}
                    onChange={(e) => setFilterValues({ ...filterValues, brand: e.target.value })}
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    label="Артикул"
                    variant="standard"
                    value={filterValues.article}
                    onChange={(e) => setFilterValues({ ...filterValues, article: e.target.value })}
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    label="Размер"
                    variant="standard"
                    value={filterValues.size}
                    onChange={(e) => setFilterValues({ ...filterValues, size: e.target.value })}
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    label="Пары"
                    variant="standard"
                    value={filterValues.pair}
                    onChange={(e) => setFilterValues({ ...filterValues, pair: e.target.value })}
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    label="Категория"
                    variant="standard"
                    value={filterValues.category}
                    onChange={(e) => setFilterValues({ ...filterValues, category: e.target.value })}
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    label="Пол"
                    variant="standard"
                    value={filterValues.gender}
                    onChange={(e) => setFilterValues({ ...filterValues, gender: e.target.value })}
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    label="Цвет"
                    variant="standard"
                    value={filterValues.color}
                    onChange={(e) => setFilterValues({ ...filterValues, color: e.target.value })}
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    label="Состав"
                    variant="standard"
                    value={filterValues.compound}
                    onChange={(e) => setFilterValues({ ...filterValues, compound: e.target.value })}
                    fullWidth
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    label="Платформа"
                    variant="standard"
                    value={filterValues.platform}
                    onChange={(e) => setFilterValues({ ...filterValues, platform: e.target.value })}
                    fullWidth
                  />
                </StyledTableCell>
                {/* Эти два не фильтруются */}
                <StyledTableCell align="center">
                  <Typography variant="body2" fontWeight="bold">Дата изменения</Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Typography variant="body2" fontWeight="bold">Редактирование</Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <StyledTableRow key={row.model_id}>
                  <ModelEdit
                    row={row}
                    editingRowId={editingRowId}
                    editedData={editedData}
                    setEditingRowId={setEditingRowId}
                    setEditedData={setEditedData}
                    onSave={onSave}
                    onCancel={onCancel}
                  />
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Пагинация */}
        <ModelPagination
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />

        {/* Модальное окно */}
        <AddModelModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          onAdd={(newModel) => {
            // Логика добавления новой модели
            console.log("Добавленная модель:", newModel);
          }}
          onDelete={(modelId) => {
            // Логика удаления модели
            console.log("Удаленная модель ID:", modelId);
          }}
        />
      </Paper>
    </Box>
  );
};

export default ModelTable;