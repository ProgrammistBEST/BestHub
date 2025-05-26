import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { LineChart } from "@mui/x-charts/LineChart";
import { mangoFusionPalette } from "@mui/x-charts/colorPalettes";
import AreaChartIcon from "@mui/icons-material/AreaChart";
import { useNavigate, useLocation } from "react-router-dom";
import Link from "next/link";
import { Box, Tabs, Tab, Fade } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Graphics = () => {
  const [nbSeries, setNbSeries] = useState(3);
  const items = [{ label: "100" }, { label: "200" }];
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [chipData, setChipData] = useState<readonly ChipData[]>([]);
  const [brand, setBrand] = useState("Armbest");

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    setSelectedModels((prev) =>
      prev.filter((model) => model !== chipToDelete.label)
    );
  };

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
          "http://192.168.100.170:2024/api/v2/rating",
          {
            params: {
              brand: brand,
              place: "WB",
              startDate: "2025-04-22",
              endDate: "2025-04-28",
            },
          }
        );
        console.log(response.data);
        if (response.status !== 200) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        // if (!response.data || !Array.isArray(response.data.items)) {
        //   throw new Error("Invalid data format");
        // }
        const data = response.data;

        setRating(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred while fetching APIs");
      } finally {
        setLoading(false);
      }
    };

    getRating();
  }, [brand]);

  // Формирование данных для графика

  const chartData = selectedModels.map((model) => {
    const modelRatings = rating.filter((item) => item.article === model);
    console.log("rating: ", rating);
    return {
      id: model,
      data: modelRatings.map((item) => Number(item.rating)),
    };
  });

  // Динамический xAxis
  const xAxisData =
    chartData.length > 0
      ? rating
          .filter((item) => item.article === selectedModels[0])
          .map((item) => new Date(item.date).toLocaleDateString())
      : [];

  return (
    <>
      <Fade in={true} timeout={400}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            {/* График */}
            {!loading && (
              <LineChart
                xAxis={[{ data: Array.from({ length: 7 }, (_, i) => i + 1) }]}
                series={chartData}
                height={400}
              />
            )}
          </div>
        </div>
      </Fade>
      <Fade in={true} timeout={400}>
        <Autocomplete
          multiple
          disablePortal
          options={Array.from(new Set(rating.map((item) => item.article)))} // Уникальные артикулы
          value={selectedModels}
          onChange={(event, newValue) => setSelectedModels(newValue)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Выберите модели" />
          )}
        />
      </Fade>
    </>
  );
};

export default Graphics;
