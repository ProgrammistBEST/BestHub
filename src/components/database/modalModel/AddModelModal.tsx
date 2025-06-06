import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box
} from "@mui/material";
import CreateModel from "../toolbar/CreateModel";
import axios from "axios";
import ArticleManagementTab from "../toolbar/ArticleManagementTab";
import ApiSyncTab from "../toolbar/ApiSyncTab";

export const AddModelModal = ({ isOpen, onClose, onAdd }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [sizesList, setSizesList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/sizes");
        setSizesList(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке размеров:", error);
      }
    };
    fetchSizes();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/brands");
        setBrandsList(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке брендов:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Управление моделями</DialogTitle>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Создать модель" />
        <Tab label="Работа с внешними артикулами" />
        <Tab label="Работа с API" />
      </Tabs>
            
      <DialogContent sx={{ minHeight: '400px' }}>
        {activeTab === 0 && (
          <CreateModel 
            onAdd={onAdd}
            sizesList={sizesList}
            brandsList={brandsList}
          />
        )}
        
        {activeTab === 1 && (
          <ArticleManagementTab 
            brandsList={brandsList} 
            sizesList={sizesList} 
          />
        )}
        {activeTab === 2 && (
          <ApiSyncTab brandsList={brandsList} />
        )}
      </DialogContent>
    </Dialog>
  );
};