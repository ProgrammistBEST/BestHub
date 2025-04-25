import React, { useState } from "react";
import debounce from "lodash.debounce";
import { useMemo } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Slider,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";

const ProductList = ({ products }) => {
  // Состояния
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [sortType, setSortType] = useState("rating-desc");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Обработчики событий
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterProducts(term, ratingRange);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortProducts(e.target.value);
  };

  const filterProducts = (term, range) => {
    const filtered = products.filter(
      (product) =>
        (product.article?.toLowerCase().includes(term) ||
          product.title?.toLowerCase().includes(term)) &&
        product.rating >= range[0] &&
        product.rating <= range[1]
    );
    setFilteredProducts(filtered);
  };

  const sortProducts = (type) => {
    let sorted = [...filteredProducts];
    switch (type) {
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-asc":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case "description-length":
        sorted.sort((a, b) => a.title.length - b.title.length);
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <Box sx={{}}>
      {/* Панель фильтрации и сортировки */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          label="Поиск по модели"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ flexGrow: 1 }}
        />
        <Select value={sortType} onChange={handleSortChange}>
          <MenuItem value="rating-desc">Рейтинг (по убыванию)</MenuItem>
          <MenuItem value="rating-asc">Рейтинг (по возрастанию)</MenuItem>
        </Select>
      </Box>

      {/* Список товаров */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {filteredProducts.length === 0 ? (
          <Typography>Товары не найдены</Typography>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              sx={{
                width: 300,
                cursor: "pointer",
                border: "0.1px solid rgba(0, 110, 255, 0.47)",
                transition: "box-shadow 0.3s",
                "&:hover": { boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" },
                borderRadius: 4,
              }}
              onClick={() => openModal(product)}
            >
              <CardContent>
                <Typography variant="h6">{product.article}</Typography>
                <Typography variant="overline">
                  Рейтинг: {product.rating}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <>
                      <StarIcon
                        key={index}
                        fontSize="small"
                        color={
                          index < Math.floor(product.rating)
                            ? "warning"
                            : index === Math.floor(product.rating) &&
                              product.rating % 1 !== 0
                            ? "half" // Половинчатая звезда
                            : "disabled"
                        }
                      />
                    </>
                  ))}
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {product.title.replace("/", "").slice(0, 50)}...
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* Модальное окно для детального просмотра */}
      <Dialog open={!!selectedProduct} onClose={closeModal}>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            {selectedProduct?.article}
          </Typography>

          <Typography sx={{ marginBottom: 2 }}>
            {selectedProduct?.title.replace("/", "")}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {selectedProduct?.rating}
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                fontSize="small"
                color={index < selectedProduct?.rating ? "warning" : "disabled"}
              />
            ))}
          </Box>
          {/* <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => alert("Добавлено в избранное")}
          >
            Добавить в избранное
          </Button> */}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductList;
