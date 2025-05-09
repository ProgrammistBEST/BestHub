import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  TextField,
  Button,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/system";

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

// Генерация мок-данных
const generateMockData = () => {
  const categories = [
    "Электроника",
    "Одежда",
    "Обувь",
    "Книги",
    "Игрушки",
    "Бытовая техника",
  ];

  const platforms = ["WB", "OZON"];

  return Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    name: `Модель-${String(index + 1).padStart(3, "0")}`,
    article: `ART-${String(index + 1).padStart(5, "0")}`,
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 50000 + 1000),
    addedDate: randomDate(new Date(2020, 0, 1), new Date())
      .toISOString()
      .split("T")[0],
  }));
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const mockData = generateMockData();

// Компонент панели инструментов
const EnhancedTableToolbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Поле поиска */}
      <TextField
        label="Поиск по артикулу или названию"
        variant="outlined"
        placeholder="Введите запрос"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
        autoComplete="off"
      />

      {/* Кнопка WB */}
      <Button
        variant="contained"
        sx={{
          height: "56px",
          background: "#a362ff",
          fontWeight: 600,
          px: 2,
          "&:hover": { background: "#8e44d6" },
        }}
      >
        WB
      </Button>

      {/* Кнопка OZON */}
      <Button
        variant="contained"
        sx={{
          height: "56px",
          background: "#0082ff",
          fontWeight: 600,
          px: 2,
          "&:hover": { background: "#005fcc" },
        }}
      >
        OZON
      </Button>
    </Toolbar>
  );
};

// Основной компонент таблицы
export default function ModelTable() {
  const [data, setData] = useState(mockData);
  const [filteredData, setFilteredData] = useState(mockData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Поиск по артикулу или названию
  const handleSearch = (query) => {
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.article.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(0); // Сброс страницы при новом поиске
  };

  // Изменение страницы
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  // Изменение количества строк на странице
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Получение данных для текущей страницы
  const visibleRows = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {/* Панель инструментов */}
        <EnhancedTableToolbar onSearch={handleSearch} />

        {/* Таблица */}
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <StyledTableCell>Название</StyledTableCell>
                <StyledTableCell align="center">Артикул</StyledTableCell>
                <StyledTableCell align="center">Платформа</StyledTableCell>
                <StyledTableCell align="center">Категория</StyledTableCell>
                <StyledTableCell align="center">Цена</StyledTableCell>
                <StyledTableCell align="center">
                  Дата добавления
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.article}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.platform}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.category}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.price} ₽
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.addedDate}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Пагинация */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
