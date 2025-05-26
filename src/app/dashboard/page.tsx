"use client";
import {
  Container,
  Box,
  Fade,
  Tabs,
  Tab,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import Users from "@components/users/users";
import "./style.css";
import Database from "../../components/database/database";
import DeviceInventoryManager from "@components/deviceInventoryManager";

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
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
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
  const [selectedDatabase, setSelectedDatabase] = React.useState("WB");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDatabaseChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedDatabase(event.target.value as string);
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
              <Tab label="Учет техн." {...a11yProps(2)} />
            </Tabs>
            <TabPanel
              value={value}
              index={0}
              //   className="Dashboard__User__TabPanel"
            >
              <Users />
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              //   className="Dashboard__User__TabPanel"
            >
              <Database />
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
              //   className="Dashboard__User__TabPanel"
            >
              <DeviceInventoryManager />
            </TabPanel>
          </Box>
        </Box>
      </Fade>
    </>
  );
}

export default Dashboard;
