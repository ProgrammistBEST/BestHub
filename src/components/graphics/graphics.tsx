import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { LineChart } from "@mui/x-charts/LineChart";
import { mangoFusionPalette } from "@mui/x-charts/colorPalettes";
import AreaChartIcon from "@mui/icons-material/AreaChart";
import RatingList from "../../components/rating/ratingList";
import { useNavigate, useLocation } from "react-router-dom";
import Link from "next/link";
import { Box, Tabs, Tab } from "@mui/material";

const defaultSeries = [
  { id: "1", data: [4, 5, 1, 2, 3, 3, 2], area: false, stack: "7" },
  { id: "2", data: [7, 4, 6, 7, 2, 3, 5], area: false, stack: "1" },
].map((item, index) => ({
  ...item,
  color: mangoFusionPalette("light")[index],
}));

const Graphics = () => {
  const [series, setSeries] = React.useState(defaultSeries);
  const [nbSeries, setNbSeries] = React.useState(3);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={false} aria-label="basic tabs example">
          {/* Ссылка на главную страницу */}
          <Tab label="Рейтинг товаров" component={Link} href="/" />

          {/* Ссылка на страницу графиков */}
          <Tab label="Графики" component={Link} href="/graphic" />

          {/* Ссылка на другую страницу */}
          <Tab label="И ещё что-то" component={Link} href="/something" />
        </Tabs>
      </Box>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
            series={[
              ...series.slice(0, Math.min(nbSeries, 8)),
              ...series.slice(8, 10),
            ]}
            skipAnimation={skipAnimation}
            height={400}
          />
        </div>
      </div>
      <RatingList />
    </>
  );
};

export default Graphics;
