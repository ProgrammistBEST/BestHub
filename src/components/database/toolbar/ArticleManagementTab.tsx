import React, { useState, useEffect } from "react";
import { Box, Paper, Button, TablePagination, Snackbar, Alert } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { fetchArticles, createArticle, updateArticle, deleteArticle } from "../../../services/apiService";
import ArticleTable from "./ArticleTable";
import ArticleModal from "./ArticleModal";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

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
  const [formState, setFormState] = useState({ article: "", association: "" });

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const allArticles = await fetchArticles();
      const startIndex = page * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      setArticles(allArticles.slice(startIndex, endIndex));
      setTotal(allArticles.length);
    } catch (error) {
      setSnackbar({ message: "Ошибка загрузки данных", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      if (!formState.article.trim()) {
        setSnackbar({ message: "Поле 'Артикул' не может быть пустым", severity: "error" });
        return;
      }

      if (currentArticle) {
        await updateArticle(currentArticle.article_id, formState);
      } else {
        await createArticle(formState);
      }

      fetchData();
      setOpenModal(false);
      setSnackbar({ message: "Успешно сохранено", severity: "success" });
    } catch (error) {
      setSnackbar({ message: error.message || "Ошибка сохранения", severity: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(deleteConfirm.article_id);
      fetchData();
      setDeleteConfirm(null);
      setSnackbar({ message: "Успешно удалено", severity: "success" });
    } catch (error) {
      setSnackbar({ message: "Ошибка удаления", severity: "error" });
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<AddCircleOutline />}
        onClick={() => setOpenModal(true)}
        sx={{ mb: 2 }}
      >
        Добавить артикул
      </Button>

      <Paper>
        <ArticleTable
          articles={articles}
          loading={loading}
          onEdit={(article) => {
            setCurrentArticle(article);
            setFormState({ article: article.article, association: article.article_association });
            setOpenModal(true);
          }}
          onDelete={(article) => setDeleteConfirm(article)}
        />
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
      </Paper>

      <ArticleModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setCurrentArticle(null);
          setFormState({ article: "", association: "" });
        }}
        onSave={handleSave}
        isSaving={isSaving}
        formState={formState}
        setFormState={setFormState}
        title={currentArticle ? "Редактировать" : "Добавить"}
      />

      <DeleteConfirmationDialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onDelete={handleDelete}
        article={deleteConfirm}
      />

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