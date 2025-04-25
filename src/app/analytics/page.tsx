"use client";
import { Tab, Box, Fade, Tabs, CustomTabPanel } from "@mui/material";
import React, { useState } from "react";
import RatingList from "../../components/rating/ratingList";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Analytics() {
  const [category, setCategory] = useState(0);
  const handleChange = (event, newValue) => {
    setCategory(newValue);
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Fade in={true} timeout={500}>
          <div>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={category}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Рейтинг товаров" {...a11yProps(0)} />
                <Tab label="Что-то ещё" {...a11yProps(1)} />
                <Tab label="И ещё что-то" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={category} index={0}>
              <RatingList />
            </CustomTabPanel>
            <CustomTabPanel value={category} index={1}>
              Item Two
            </CustomTabPanel>
            <CustomTabPanel value={category} index={2}>
              Item Three
            </CustomTabPanel>
          </div>
        </Fade>
      </Box>
    </>
  );
}

export default Analytics;
