import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "./style.css";

import UploadForm from "./utils/uploadForm";
import ChartComponent from "./utils/chartComponent";

// Подсчет итогов

export default function CostPriceList() {
  const [reportData, setReportData] = useState(null);

  const [sortConfig, setSortConfig] = React.useState({
    key: null,
    direction: "asc",
  });

  const totals = useMemo(() => {
    if (!reportData || !Array.isArray(reportData)) return {};

    const totals = {
      soldUnits: 0,
      costOfSales: 0,
      returnsUnits: 0,
      costOfReturns: 0,
      residualCost: 0,
      toTransfer: 0,
      tax7Percent: 0,
      finalProfit: 0,
    };

    reportData.forEach((item) => {
      totals.soldUnits += item.soldUnits || 0;
      totals.costOfSales += item.costOfSales || 0;
      totals.returnsUnits += item.returnsUnits || 0;
      totals.costOfReturns += item.costOfReturns || 0;
      totals.residualCost += item.residualCost || 0;
      totals.toTransfer += item.toTransfer || 0;
      totals.tax7Percent += item.tax7Percent || 0;
      totals.finalProfit += item.finalProfit || 0;
    });

    return totals;
  }, [reportData]);

  const sortedData = useMemo(() => {
    if (!reportData || !Array.isArray(reportData)) return [];
    console.log(sortedData);

    const data = [...reportData];
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [reportData, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const printButton = () => {
    window.print();
  };

  const handleUploadSuccess = (data) => {
    setReportData(data);
  };
  return (
    <>
      <div style={{ display: "flex", maxWidth: "85%" }}>
        <UploadForm onUploadSuccess={handleUploadSuccess} />

        {reportData && (
          <>
            <ChartComponent data={reportData.rows} />
          </>
        )}
      </div>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 540,
          overflow: "auto",
          border: "2px solid #000",
        }}
        className="TableReport"
      >
        <Table aria-label="sales table" stickyHeader>
          <TableHead sx={{ backgroundColor: "#c5c5c5" }}>
            <TableRow>
              <TableCell
                align="center"
                onClick={() => requestSort("model")}
                sx={{ fontWeight: "bold" }}
              >
                Модель
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                align="center"
                onClick={() => requestSort("soldUnits")}
              >
                Прод. шт.
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                align="center"
                onClick={() => requestSort("costOfSales")}
              >
                Себест. прод.
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                align="center"
                onClick={() => requestSort("returnsUnits")}
              >
                Возвр. шт.
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                align="center"
                onClick={() => requestSort("costOfReturns")}
              >
                Себест. возвр.
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                align="center"
                onClick={() => requestSort("residualCost")}
              >
                Себест.
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                align="center"
                onClick={() => requestSort("toTransfer")}
              >
                К перечисл.
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                align="center"
                onClick={() => requestSort("tax7Percent")}
              >
                Налог 7%
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold" }}
                align="center"
                onClick={() => requestSort("finalProfit")}
              >
                Прибыль оконч.
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.label}</TableCell>
                <TableCell align="right">{row.sold}</TableCell>
                <TableCell align="right">
                  {row.soldPrice?.toLocaleString()}
                </TableCell>
                <TableCell align="right">{row.return}</TableCell>
                <TableCell align="right">
                  {row.returnPrice?.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {row.profit?.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {row.cashTransfer?.toLocaleString()}
                </TableCell>
                <TableCell align="right">{row.tax?.toLocaleString()}</TableCell>
                <TableCell align="right">
                  {row.finalProfit?.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            {/* Итоговая строка */}
            <TableRow
              className="totalRowTable"
              sx={{
                fontWeight: "bold",
                backgroundColor: "#cdcdcd",
                "& td": {
                  fontSize: "12px !important",
                },
              }}
            >
              <TableCell>Итого</TableCell>
              <TableCell align="right">{reportData?.totals.sumSold}</TableCell>
              <TableCell align="right">
                {reportData?.totals.sumSoldPrice?.toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {reportData?.totals.sumReturn}
              </TableCell>
              <TableCell align="right">
                {reportData?.totals.sumReturnPrice?.toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {reportData?.totals.sumReturnPrice?.toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {reportData?.totals.sumCashTransfer?.toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {reportData?.totals.sumTax?.toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {reportData?.totals.sumFinalProfit?.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        spacing={2}
        direction="row"
        className="groupButtonTable"
        sx={{ p: 2 }}
      >
        <Button variant="contained" onClick={printButton}>
          Печать отчета
        </Button>
        <Tooltip title="Filter list">
          <IconButton>
            <FilterAltIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
}
