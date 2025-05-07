import React, { useState } from "react";
import PreLoading from "@components/preloading/preloading";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import WarehouseRemains from "./warehouseRemains";
import CostPriceList from "./costPrice";
const ReportList = () => {
  const type = "reportList";
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return <PreLoading type={loading} />;
  }

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
