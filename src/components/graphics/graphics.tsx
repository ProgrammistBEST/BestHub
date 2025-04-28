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
import { Box, Tabs, Tab } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";

const defaultSeries = [
  { id: "1", data: [4, 5, 1, 2, 3, 3, 2], area: false, stack: "2" },
  { id: "2", data: [7, 4, 6, 7, 2, 3, 5], area: false, stack: "1" },
  { id: "3", data: [1, 2, 3, 4, 5, 6, 7], area: false, stack: "3" },
].map((item, index) => ({
  ...item,
  color: mangoFusionPalette("light")[index],
}));

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Graphics = () => {
  const [series, setSeries] = useState(defaultSeries);
  const [nbSeries, setNbSeries] = useState(3);
  const items = [{ label: "100" }, { label: "200" }];
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [chipData, setChipData] = useState<readonly ChipData[]>([]);

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
        console.log(data.items);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred while fetching APIs");
      } finally {
        setLoading(false);
      }
    };

    getRating();
  }, []);

  // Формирование данных для графика
  const chartData = selectedModels.map((model) => {
    const modelData = rating.find((item) => item.label === model);
    return {
      id: model,
      data: modelData?.data || [],
      label: model,
    };
  });

  return (
    <>
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
      <Autocomplete
        multiple
        disablePortal
        options={rating.map((item) => item?.article || item.nmId)}
        value={selectedModels}
        onChange={(event, newValue) => {
          setSelectedModels(newValue);
          const newChips = newValue.map((label, index) => ({
            key: index,
            label,
          }));
          setChipData(newChips);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Выберите модели" />
        )}
      />

      <Paper
        sx={{
          display: "flex",
          justifyContent: "left",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
          boxShadow: "none",
          mt: 1,
        }}
        component="ul"
      >
        {chipData.map((data) => {
          return (
            <ListItem key={data.key}>
              <Chip
                label={data.label}
                onDelete={handleDelete(data)}
                color="primary"
              />
            </ListItem>
          );
        })}
      </Paper>
    </>
  );
};

export default Graphics;
