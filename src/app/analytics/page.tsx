"use client";
import { Tab, Box, Fade, Tabs, CustomTabPanel } from "@mui/material";
import React, { useState } from "react";
import RatingList from "../../components/rating/ratingList";
import Graphics from "../../components/graphics/graphics";
import { useGetIdentity } from "@refinedev/core";
import ReportList from "@components/report/reportList";
type IUser = {
  id: number;
  name: string;
  avatar: string;
};

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
  const { data: user } = useGetIdentity<IUser>();
  const [category, setCategory] = useState(0);
  const handleChange = (event, newValue) => {
    setCategory(newValue);
  };

  return (
    <>
      <Fade in={true} timeout={400}>
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
                  <Tab label="Графики" {...a11yProps(1)} />
                  {user?.role == "Admin" && (
                    <Tab label="Отчёты" {...a11yProps(2)} />
                  )}
                </Tabs>
              </Box>
              <CustomTabPanel value={category} index={0}>
                <RatingList />
              </CustomTabPanel>
              <CustomTabPanel value={category} index={1}>
                <Graphics />
              </CustomTabPanel>
              <CustomTabPanel value={category} index={2}>
                <ReportList />
              </CustomTabPanel>
            </div>
          </Fade>
        </Box>
      </Fade>
    </>
  );
}

export default Analytics;
