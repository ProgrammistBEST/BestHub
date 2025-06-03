import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { DeleteOutline, EditOutlined, AddCircleOutline } from "@mui/icons-material";
import axios from "axios";

const ArticleManagementTab = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);

  const [formState, setFormState] = useState({
    article: "",
    association: "",
  });

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const fetchData = async () => {
    try {
        setLoading(true);
        const response = await axios.get("http://localhost:8001/api/articles");

        // Проверка структуры данных
        if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Неверный формат данных");
        }

        // Все данные загружаются сразу
        const allArticles = response.data;

        // Ограничиваем данные для текущей страницы
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedArticles = allArticles.slice(startIndex, endIndex);

        setArticles(paginatedArticles);
        setTotal(allArticles.length);
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        setSnackbar({ message: "Ошибка загрузки данных", severity: "error" });
    } finally {
        setLoading(false);
    }
  };

  const handleOpenModal = (article) => {
    if (article) {
      setCurrentArticle(article);
      setFormState({
        article: article.article || "",
        association: article.article_association || ""
      });
    } else {
      setCurrentArticle(null);
      setFormState({
        article: "",
        association: ""
      });
    }
    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true); // Включаем индикатор загрузки

      // Валидация формы
      if (!formState.article.trim()) {
        setSnackbar({ message: "Поле 'Артикул' не может быть пустым", severity: "error" });
        return;
      }

      const payload = {
        article: formState.article,
        article_association: formState.association,
      };

      if (currentArticle) {
        await axios.put(`http://localhost:8001/api/articles/${currentArticle.article_id}`, payload);
      } else {
        await axios.post("http://localhost:8001/api/articles", payload);
      }

      fetchData(); // Обновляем данные после сохранения
      setOpenModal(false);
      setSnackbar({ message: "Успешно сохранено", severity: "success" });
    } catch (error) {
      console.error("Ошибка при сохранении:", error);

      // Если сервер вернул ошибку дублирования
      if (error.response && error.response.status === 409) {
        setSnackbar({ message: "Артикул уже существует. Дубликаты запрещены.", severity: "error" });
      } else {
        setSnackbar({ message: "Ошибка сохранения", severity: "error" });
      }
    } finally {
      setIsSaving(false); // Выключаем индикатор загрузки
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8001/api/articles/${deleteConfirm.article_id}`);
      fetchData(); // Обновляем данные после удаления
      setDeleteConfirm(null);
      setSnackbar({ message: "Успешно удалено", severity: "success" });
    } catch (error) {
      setSnackbar({ message: "Ошибка удаления", severity: "error" });
    }
  };

  return (
    <Box>
      {/* Кнопка добавления */}
      <Button
        variant="contained"
        startIcon={<AddCircleOutline />}
        onClick={() => handleOpenModal(null)}
        sx={{ mb: 2 }}
      >
        Добавить артикул
      </Button>

      {/* Таблица артикулов */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Артикул</TableCell>
              <TableCell>Ассоциация</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <TableRow key={article.article_id}>
                  <TableCell>{article.article}</TableCell>
                  <TableCell>{article.article_association}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenModal(article)}
                    >
                      <EditOutlined />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => setDeleteConfirm(article)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Нет данных
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* Модальное окно */}
      <Dialog open={openModal}
        onClose={() => {
          setOpenModal(false);
          setCurrentArticle(null);
          setFormState({ article: "", association: "" }); // Очищаем форму
        }}
      >
        <DialogTitle>{currentArticle ? "Редактировать" : "Добавить"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Артикул"
            fullWidth
            value={formState.article}
            onChange={(e) =>
              setFormState({ ...formState, article: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Ассоциация"
            fullWidth
            value={formState.association}
            onChange={(e) =>
              setFormState({ ...formState, association: e.target.value })
            }
          />
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Отмена
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            disabled={isSaving} // Отключаем кнопку во время загрузки
          >
            {isSaving ? <CircularProgress size={24} /> : "Сохранить"}
          </Button>
        </Box>
      </Dialog>

      {/* Подтверждение удаления */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          Вы действительно хотите удалить артикул "{deleteConfirm?.article}"?
        </DialogContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <Button onClick={() => setDeleteConfirm(null)} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Удалить
          </Button>
        </Box>
      </Dialog>

      {/* Уведомления */}
      {!!snackbar && (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={() => setSnackbar(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ArticleManagementTab;