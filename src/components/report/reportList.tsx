import React, { useState } from "react";
import PreLoading from "@components/preloading/preloading";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import WarehouseRemains from "./warehouseRemains";
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
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          sx={{ p: 0 }}
        >
          <Tab label="Остатки на складе" />
          <Tab label="Ещё что-то" />
          <Tab label="И ещё что-то" />
        </Tabs>
        <Box sx={{ mt: 2 }}>{value === 0 && <WarehouseRemains />}</Box>
      </Box>
    </>
  );
};
export default ReportList;
