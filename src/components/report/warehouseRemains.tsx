import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import response from "./warehouse"; // Убедитесь, что файл warehouse.ts существует и экспортирует данные
import "./style.css";

interface WarehouseData {
  nmId: number;
  subjectName: string;
  vendorCode: string;
  warehouses: Record<string, number>;
  total: number;
}

export default function WarehouseRemains() {
  const [remains, setRemains] = React.useState<WarehouseData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [orderBy, setOrderBy] = React.useState<keyof WarehouseData>("total");
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    try {
      setLoading(true);
      setError(false);

      const uniqueWarehouses = new Set<string>();
      response.forEach((remain) =>
        remain.warehouses.forEach((warehouse) =>
          uniqueWarehouses.add(warehouse.warehouseName)
        )
      );
      const warehouseNames = Array.from(uniqueWarehouses);

      const items: Record<string, WarehouseData> = {};
      response.forEach((remain) => {
        const vendorCode = remain.vendorCode.split("-")[0];
        if (!items[vendorCode]) {
          items[vendorCode] = {
            nmId: remain.nmId,
            subjectName: remain.subjectName,
            vendorCode: vendorCode,
            warehouses: {},
            total: 0,
          };

          warehouseNames.forEach((warehouseName) => {
            items[vendorCode].warehouses[warehouseName] = 0;
          });
        }

        remain.warehouses.forEach((warehouse) => {
          items[vendorCode].warehouses[warehouse.warehouseName] +=
            warehouse.quantity;
          items[vendorCode].total += warehouse.quantity;
        });
      });

      const result = Object.values(items);
      setRemains(result);
    } catch (err) {
      setError(true);
      console.error("Error processing data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSort = (property: keyof WarehouseData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRemains = React.useMemo(() => {
    return [...remains].sort((a, b) => {
      if (order === "asc") {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      } else {
        return a[orderBy] < b[orderBy] ? 1 : -1;
      }
    });
  }, [remains, order, orderBy]);

  const filteredRemains = React.useMemo(() => {
    return sortedRemains.filter(
      (item) =>
        item.vendorCode.includes(filter) ||
        item.subjectName.toLowerCase().includes(filter.toLowerCase())
    );
  }, [sortedRemains, filter]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const printRef = React.useRef(null);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка при загрузке данных.</div>;
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 540,
          overflow: "auto",
          border: "2px solid #000",
        }}
        className="TableReport"
        ref={printRef}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{ backgroundColor: "#c5c5c5", fontSize: "14px !important" }}
            >
              <TableCell
                align="center"
                onClick={() => handleSort("vendorCode")}
                sx={{
                  fontSize: "14px",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  fontWeight: "bold",
                  minWidth: 100,
                  border: "1px solid #aaa",
                }}
              >
                Артикул{" "}
                {orderBy === "vendorCode" && (order === "asc" ? "↑" : "↓")}
              </TableCell>

              {Object.keys(remains[0]?.warehouses || {}).map(
                (warehouseName) => (
                  <TableCell
                    key={warehouseName}
                    align="center"
                    sx={{
                      fontSize: "14px",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      fontWeight: "bold",
                      minWidth: 80,
                      border: "1px solid #aaa",
                    }}
                  >
                    {warehouseName}
                  </TableCell>
                )
              )}

              <TableCell
                align="center"
                onClick={() => handleSort("total")}
                sx={{
                  fontSize: "14px",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  fontWeight: "bold",
                  minWidth: 80,
                  border: "1px solid #aaa",
                }}
              >
                Всего {orderBy === "total" && (order === "asc" ? "↑" : "↓")}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredRemains
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.vendorCode}
                  sx={{
                    backgroundColor: row.total === 0 ? "#ffcccc" : "inherit",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "10px",
                      border: "1px solid #aaa",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.vendorCode}
                  </TableCell>

                  {Object.keys(row.warehouses).map((warehouseName) => (
                    <TableCell
                      key={warehouseName}
                      align="center"
                      sx={{
                        fontSize: "10px",
                        border: "1px solid #aaa",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.warehouses[warehouseName] === 0
                        ? ""
                        : row.warehouses[warehouseName]}
                    </TableCell>
                  ))}

                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "10px",
                      border: "1px solid #aaa",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.total}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Button variant="contained" onClick={handlePrint}>
          Печать отчета
        </Button>

        <TextField
          label="Поиск"
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ display: "flex" }}
        />

        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100, 125]}
          component="div"
          count={filteredRemains.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ display: "flex", justifyContent: "spaceBetween" }}
        />
      </Box>
    </>
  );
}
