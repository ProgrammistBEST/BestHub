import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { ApiData } from "../../app/api/types/apiData";
import ProductList from "./productList";

const RatingList = () => {
  const [rating, setRating] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRating = async () => {
      try {
        setLoading(true);
        setError(null);

        let token = localStorage.getItem("token");
        if (!token) {
          token = "root";
        }

        const response = await axios.get(
          "http://192.168.100.170:2024/api/v1/rating",
          {
            params: {
              company_name: "Armbest",
              place: "WB",
            },
          }
        );
        if (response.status !== 200) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        if (!response.data || !Array.isArray(response.data.items)) {
          throw new Error("Invalid data format");
        }
        const data = response.data;

        setRating(data.items);

        console.log("rating.length: ", rating.length);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred while fetching APIs");
      } finally {
        setLoading(false);
      }
    };

    getRating();
  }, []);

  {
    /* Индикатор загрузки */
  }
  {
    loading && (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  {
    /* Сообщение об ошибке */
  }
  {
    error && (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Box>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && rating.length > 0 && (
          <ProductList products={rating}></ProductList>
        )}

        {!loading && !error && rating.length === 0 && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Нет доступных рейтингов.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default RatingList;
