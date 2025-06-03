import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import { EditOutlined, DeleteOutline } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

const ArticleTable = ({ articles, loading, onEdit, onDelete }) => {
  return (
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
            <TableCell colSpan={3} align="center">
              Нет данных
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ArticleTable;