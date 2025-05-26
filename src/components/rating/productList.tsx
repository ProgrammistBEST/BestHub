import React, { useState } from "react";
import debounce from "lodash.debounce";
import { useMemo } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Fade,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AppsIcon from "@mui/icons-material/Apps";
import { Stack } from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { styled } from "@mui/material/styles";

const ProductList = ({ products }) => {
  // Состояния
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [sortType, setSortType] = useState("rating-desc");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alignment, setAlignment] = React.useState("list");
  const printRef = React.useRef(null);

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
    filtered.sort((a, b) => b.article - a.article);
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
      default:
        sorted.sort((a, b) => b.article - a.article);
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

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  const children = [
    <ToggleButton value="list" key="list">
      <FormatListBulletedIcon />
    </ToggleButton>,
    <ToggleButton value="card" key="card">
      <AppsIcon />
    </ToggleButton>,
  ];

  // Печать определенного блока
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <Box sx={{}}>
      {/* Панель фильтрации и сортировки */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
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

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={{ textAlign: "center", pl: "25px" }}
          onClick={handlePrint}
          startIcon={<LocalPrintshopIcon />}
        ></Button>
      </Box>
      <ToggleButtonGroup
        sx={{ display: "flex", mb: 2 }}
        size="small"
        {...control}
        aria-label="Small sizes"
      >
        {children}
      </ToggleButtonGroup>

      {/* Список товаров */}
      <Fade in={true} timeout={400}>
        <Box
          sx={{
            display: alignment === "list" ? "block" : "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
          ref={printRef}
        >
          {filteredProducts.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
              По вашему запросу ничего не найдено.
            </Typography>
          ) : (
            filteredProducts.map((product) => (
              <Card
                key={product.id}
                sx={{
                  width: alignment === "list" ? "100%" : 300,
                  mb: alignment === "list" ? "" : "block",
                  pl: alignment === "list" ? "10px" : "",
                  p: alignment === "list" ? "" : "",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s",
                  "&:hover": { boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" },
                  borderRadius: alignment === "list" ? "0" : "4",
                  border:
                    alignment === "list" ? "1px solid rgba(0, 0, 0, 0.1)" : "",
                  //   transition: "background 0.1s",
                  //   "&:hover": { background: " rgba(0, 0, 0, 0.2)" },
                }}
                onClick={() => openModal(product)}
              >
                <CardContent
                  sx={{
                    display: alignment === "list" ? "flex" : "block",
                    p: alignment === "list" ? "5px" : "",
                    pb: alignment === "list" ? "5px !important" : "",
                    gap: alignment === "list" ? "10px" : "",
                  }}
                >
                  <Typography variant="h6">{product.article}</Typography>
                  <Typography variant="overline" sx={{ fontSize: "12px" }}>
                    Рейтинг: {product.rating}
                  </Typography>
                  {/* <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
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
                            ? "half"
                            : "disabled"
                        }
                      />
                    </>
                  ))}
                </Box> */}
                  {/* <Typography variant="body2" sx={{ mt: 1 }}>
                  {product.title.replace("/", "").slice(0, 50)}...
                </Typography> */}
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Fade>

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
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Арт: {selectedProduct?.article}
            <Typography sx={{ mt: 1 }}>
              WB ID: {selectedProduct?.nmId}
            </Typography>
          </Typography>

          <Typography sx={{ marginBottom: 1 }}>
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
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductList;
