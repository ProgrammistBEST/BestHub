import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import WarehouseRemains from "./warehouseRemains";
import CostPriceList from "./costPrice";
const ReportList = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Остатки на складе" />
        <Tab label="Отчет по продажам" />
        <Tab label="И ещё что-то" />
      </Tabs>
      {value === 0 && <WarehouseRemains />}
      {value === 1 && <CostPriceList />}
    </>
  );
};
export default ReportList;
