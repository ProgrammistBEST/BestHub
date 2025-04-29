import React, { useState } from "react";
import PreLoading from "@components/preloading/preloading";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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
    }, 3000);
    return <PreLoading type={loading} />;
  }

  return (
    <>
      <Box sx={{}}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </Box>
    </>
  );
};
export default ReportList;
