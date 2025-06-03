import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from 'axios';
import { AddModelModal } from './modalModel/AddModelModal';

// Получение данных моделей
const fetchModels = async () => {
  try{ 
    const response = await axios.get('http://localhost:8001/api/models');
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
    return []
  }
}

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

// Основной компонент таблицы
export default function ModelTable() {
  const [data, setData] = useState(mockData);
  const [filteredData, setFilteredData] = useState(mockData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchQuery, setSearchQuery] = useState("");

  // Редактирование моделей
  const putModels = async (model_id) => {
    try {
      await axios.put(`/api/models/${model_id}`, editedData);
      setData(
        data.map((item) =>
          item.model_id === model_id ? { ...item, ...editedData } : item
        )
      );
      setEditingRowId(null); // Закрываем редактирование
    } catch (error) {
      console.error("Ошибка при обновлении модели:", error);
    }
  };

  useEffect(() => {
    const loadModels = async () => {
      const models = await fetchModels();
      setData(models);
      setFilteredData(models);
    };
    loadModels();
  }, []);

  // Поиск по артикулу или названию
  const handleSearch = (query) => {
    const filtered = data.filter(
      (item) =>
        item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.article?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(0); // Сброс страницы при новом поиске
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
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

        {/* Панель поиска */}
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
        <Button onClick={() => { setModalMode("add"); setIsModalOpen(true); }}>
          Управление моделями
        </Button>
        <Button onClick={() => { setModalMode("delete"); setIsModalOpen(true); }}>
          Удалить модель
        </Button>

        <AddModelModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={(newModel) => setData([...data, newModel])}
        />

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
              {visibleRows.map((row) => (
                <StyledTableRow key={row.model_id}>
                  {editingRowId === row.model_id ? (
                    // Режим редактирования
                    <>
                      <StyledTableCell>{row.sku}</StyledTableCell>
                      <StyledTableCell align="center">{row.brand}</StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          value={('article' in editedData) ? editedData.article : row.article}
                          onChange={(e) =>
                            setEditedData({ ...editedData, article: e.target.value })
                          }
                          sx={{ width: '12ch' }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          value={('size' in editedData) ? editedData.size : row.size}
                          onChange={(e) =>
                            setEditedData({ ...editedData, size: e.target.value })
                          }
                          sx={{ width: '12ch' }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          value={('pair' in editedData) ? editedData.pair : row.pair}
                          onChange={(e) =>
                            setEditedData({ ...editedData, pair: e.target.value })
                          }
                          sx={{ width: '12ch' }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          value={('category' in editedData) ? editedData.category : row.category}
                          onChange={(e) =>
                            setEditedData({ ...editedData, category: e.target.value })
                          }
                          sx={{ width: '12ch' }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          value={('gender' in editedData) ? editedData.gender : row.gender}
                          onChange={(e) =>
                            setEditedData({ ...editedData, gender: e.target.value })
                          }
                          sx={{ width: '12ch' }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <TextField
                          value={('color' in editedData) ? editedData.color : row.color}
                          onChange={(e) =>
                            setEditedData({ ...editedData, color: e.target.value })
                          }
                          sx={{ width: '12ch' }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.platform}</StyledTableCell>
                      <StyledTableCell align="center">{row.updated_at}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          onClick={() => putModels(row.model_id)}
                        >
                          Сохранить
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingRowId(null);
                            setEditedData({}); // Очистка данных
                          }}
                        >
                          Отмена
                        </Button>
                      </StyledTableCell>
                    </>
                  ) : (
                    // Режим просмотра
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
                        <Button onClick={() => setEditingRowId(row.model_id)}>
                          Редактировать
                        </Button>
                      </StyledTableCell>
                    </>
                  )}
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