// ModelTable.js
import React, { useState } from "react";
import { Box, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* Кнопка для добавления модели */}
        <Button onClick={() => { setModalMode("add"); setIsModalOpen(true); }}>
          Управление моделями
        </Button>
        {/* Кнопка для удаления модели */}
        <Button onClick={() => { setModalMode("delete"); setIsModalOpen(true); }}>
          Удалить модель
        </Button>

        {/* Панель поиска */}
        <ModelSearch onSearch={onSearch} />

        {/* Таблица */}
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <StyledTableCell>SKU</StyledTableCell>
                <StyledTableCell align="center">Бренд</StyledTableCell>
                <StyledTableCell align="center">Артикул</StyledTableCell>
                <StyledTableCell align="center">Размер</StyledTableCell>
                <StyledTableCell align="center">Пары</StyledTableCell>
                <StyledTableCell align="center">Категория</StyledTableCell>
                <StyledTableCell align="center">Пол</StyledTableCell>
                <StyledTableCell align="center">Цвет</StyledTableCell>
                <StyledTableCell align="center">Платформа</StyledTableCell>
                <StyledTableCell align="center">Дата изменения</StyledTableCell>
                <StyledTableCell align="center">Редактирование</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
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