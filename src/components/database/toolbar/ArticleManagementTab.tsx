import React, { useState, useEffect } from "react";
import {
  Box, Paper, Button, TablePagination, Snackbar, Alert
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import {
  fetchExternalArticles,
  createExternalArticle,
  updateExternalArticle,
  deleteExternalArticle,
  fetchPlatforms,
  fetchArticles,
  createArticle,
} from "../../../services/apiService";
import ArticleTable from "./ArticleTable";
import ExternalArticleModal from "./ExternalArticleModal";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const ArticleManagementTab = () => {
  const [articles, setArticles] = useState([]);
  const [articleOptions, setArticleOptions] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddingStandaloneArticle, setIsAddingStandaloneArticle] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);

  const [formState, setFormState] = useState({
    external_article: "",
    article_id: "",
    platform_id: ""
  });

  useEffect(() => {
    let isMounted = true;
    const loadInitialData = async () => {
      try {
        const [platformData, articleData] = await Promise.all([
          fetchPlatforms(),
          fetchArticles()
        ]);
        if (isMounted) {
          setPlatforms(platformData);
          setArticleOptions(articleData);
        }
      } catch (error) {
        if (isMounted) setSnackbar({ message: "Ошибка загрузки справочников", severity: "error" });
      }
    };
    loadInitialData();
    return () => { isMounted = false };
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchExternalArticles(); // уже возвращает нужные поля
      const startIndex = page * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      setArticles(data.slice(startIndex, endIndex));
      setTotal(data.length);
    } catch (error) {
      setSnackbar({ message: "Ошибка загрузки данных", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const { external_article, article_id, platform_id } = formState;

      if (!external_article.trim() || !article_id || !platform_id) {
        setSnackbar({ message: "Все поля обязательны", severity: "error" });
        return;
      }

      const payload = {
        external_article,
        article_id: Number(article_id),
        platform_id: Number(platform_id)
      };

      if (currentArticle) {
        await updateExternalArticle(currentArticle.external_article_id, payload);
      } else {
        await createExternalArticle(payload);
      }

      fetchData();
      setOpenModal(false);
      setCurrentArticle(null);
      setFormState({ external_article: "", article_id: "", platform_id: "" });
      setSnackbar({ message: "Успешно сохранено", severity: "success" });
    } catch (error) {
      const message = error?.response?.data?.error || "Ошибка при сохранении";
      setSnackbar({ message, severity: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteExternalArticle(deleteConfirm.external_article_id);
      fetchData();
      setDeleteConfirm(null);
      setSnackbar({ message: "Успешно удалено", severity: "success" });
    } catch (error) {
      setSnackbar({ message: "Ошибка удаления", severity: "error" });
    }
  };

  const handleCreateAndAttachArticle = async (name) => {
    try {
      setIsSaving(true);

      // Шаг 1: Создаем артикул
      const createdArticle = await createArticle({ article: name });

      // Если вернулась ошибка — прерываем
      if (createdArticle.error) {
        return { error: createdArticle.error };
      }

      // Шаг 2: Создаем внешний артикул
      const payload = {
        external_article: name,
        article_id: createdArticle.article_id,
        platform_id: platforms.find(p => p.platform === "BestHub")?.platform_id,
      };

      await createExternalArticle(payload);

      setSnackbar({ message: "Артикул и внешний артикул успешно добавлены", severity: "success" });
      setOpenModal(false);
      setFormState({ external_article: "", article_id: "", platform_id: "" });
      fetchData();

      return { message: "Артикул успешно создан" };
    } catch (error) {
      const message = error?.response?.data?.error || "Ошибка при добавлении артикула";
      return { error: message };
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<AddCircleOutline />}
        onClick={() => {
          setOpenModal(true);
          setCurrentArticle(null);
          setFormState({ external_article: "", article_id: "", platform_id: "" });
          setIsAddingStandaloneArticle(false);
        }}
      >
        Добавить внешний артикул
      </Button>

      <Button
        variant="outlined"
        startIcon={<AddCircleOutline />}
        onClick={() => {
          setOpenModal(true);
          setCurrentArticle(null);
          setFormState({ external_article: "", article_id: "", platform_id: "" });
          setIsAddingStandaloneArticle(true);
        }}
      >
        Добавить артикул
      </Button>

      <Paper>
        <ArticleTable
          articles={articles}
          loading={loading}
          onEdit={(article) => {
            setCurrentArticle(article);
            setFormState({
              external_article: article.external_article,
              article_id: article.article_id,
              platform_id: article.platform_id
            });
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

      <ExternalArticleModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setCurrentArticle(null);
          setFormState({ external_article: "", article_id: "", platform_id: "" });
        }}
        onSave={handleSave}
        isSaving={isSaving}
        formState={formState}
        setFormState={setFormState}
        title={currentArticle ? "Редактировать внешний артикул" : "Добавить внешний артикул"}
        platformOptions={platforms}
        articleOptions={articleOptions}
        isAddingStandaloneArticle={isAddingStandaloneArticle}
        onCreateArticle={handleCreateAndAttachArticle}
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