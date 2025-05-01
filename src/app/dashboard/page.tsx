"use client";
import { Container, Box, Fade, Tabs, Tab, Typography } from "@mui/material";
import React, { useState } from "react";
import TabPanel from "@mui/material/TabPanel";
import Users from "@components/users/users";
import "./style.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Fade in={true} timeout={400}>
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "100%",
              borderRadius: 2,
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="Пользователи" {...a11yProps(0)} />
              <Tab label="База данных" {...a11yProps(1)} />
            </Tabs>
            <TabPanel
              value={value}
              index={0}
              className="Dashboard__User__TabPanel"
            >
              <Users />
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              className="Dashboard__User__TabPanel"
            >
              Item Two
            </TabPanel>
          </Box>
        </Box>
      </Fade>
    </>
  );
}

export default Dashboard;
