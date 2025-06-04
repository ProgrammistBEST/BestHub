import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress
} from "@mui/material";
import { EditOutlined, DeleteOutline } from "@mui/icons-material";

const ExternalArticleTable = ({ articles, loading, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Артикул</TableCell>
          <TableCell>Внешний артикул</TableCell>
          <TableCell>Платформа</TableCell>
          <TableCell align="right">Действия</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={4} align="center">
              <CircularProgress />
            </TableCell>
          </TableRow>
        ) : articles.length > 0 ? (
          articles.map((article) => (
            <TableRow key={article.external_article_id}>
              <TableCell>{article.article || "—"}</TableCell>
              <TableCell>{article.external_article || "—"}</TableCell>
              <TableCell>{article.platform || "—"}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit(article)}>
                  <EditOutlined />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(article)}>
                  <DeleteOutline />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} align="center">
              Нет данных
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ExternalArticleTable;