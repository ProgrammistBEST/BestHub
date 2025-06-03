// App.js
import React, { useState, useEffect } from "react";
import { fetchModels, updateModel } from "../../services/apiService";
import ModelTable from "./ModelTable";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const loadModels = async () => {
      const models = await fetchModels();
      setData(models);
      setFilteredData(models);
    };
    loadModels();
  }, []);

  const handleSearch = (query) => {
    const filtered = data.filter(
      (item) =>
        item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.article?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setPage(0); // Сброс страницы при новом поиске
  };

  const handleSave = async (modelId) => {
    // Логика сохранения данных
  };

  const visibleRows = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ModelTable
      data={visibleRows}
      onSearch={handleSearch}
      editingRowId={editingRowId}
      editedData={editedData}
      setEditingRowId={setEditingRowId}
      setEditedData={setEditedData}
      onSave={handleSave}
      onCancel={() => setEditingRowId(null)}
      count={filteredData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(_, newPage) => setPage(newPage)}
      onRowsPerPageChange={(e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
      }}
    />
  );
};

export default App;