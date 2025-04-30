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
import response from "./warehouse"; // Убедитесь, что файл warehouse.ts существует и экспортирует данные
import Box from "@mui/material/Box";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

interface WarehouseData {
  nmId: number;
  subjectName: string;
  vendorCode: string;
  warehouses: Record<string, number>; // Склады и их количества
  total: number; // Общее количество товаров
}

export default function WarehouseRemains() {
  const [remains, setRemains] = React.useState<WarehouseData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  // Сортировка
  const [orderBy, setOrderBy] = React.useState<keyof WarehouseData>("total");
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");

  // Фильтрация
  const [filter, setFilter] = React.useState("");

  React.useEffect(() => {
    try {
      setLoading(true);
      setError(false);

      // Получаем уникальные названия складов
      const uniqueWarehouses = new Set<string>();
      response.forEach((remain) =>
        remain.warehouses.forEach((warehouse) =>
          uniqueWarehouses.add(warehouse.warehouseName)
        )
      );
      const warehouseNames = Array.from(uniqueWarehouses);

      // Группируем данные по артикулам
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

          // Инициализируем все склады для данного артикула
          warehouseNames.forEach((warehouseName) => {
            items[vendorCode].warehouses[warehouseName] = 0;
          });
        }

        // Заполняем количество товаров на складах
        remain.warehouses.forEach((warehouse) => {
          items[vendorCode].warehouses[warehouse.warehouseName] +=
            warehouse.quantity;
          items[vendorCode].total += warehouse.quantity;
        });
      });

      // Преобразуем объект в массив
      const result = Object.values(items);
      console.log("Processed data: ", result);
      setRemains(result);
    } catch (err) {
      setError(true);
      console.error("Error processing data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Логика сортировки
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

  // Логика фильтрации
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
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка при загрузке данных.</div>;
  }

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer
        sx={{ maxHeight: 540, maxWidth: "100%", overflowX: "auto" }}
        ref={printRef}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ minWidth: 100 }}
                onClick={() => handleSort("vendorCode")}
              >
                Артикул{" "}
                {orderBy === "vendorCode" && (order === "asc" ? "↑" : "↓")}
              </TableCell>
              {Object.keys(remains[0]?.warehouses || {}).map(
                (warehouseName) => (
                  <TableCell
                    key={warehouseName}
                    sx={{ minWidth: 20, maxWidth: 120 }}
                  >
                    {warehouseName}
                  </TableCell>
                )
              )}
              <TableCell
                sx={{ minWidth: 100 }}
                onClick={() => handleSort("total")}
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
                  <TableCell>{row.vendorCode}</TableCell>
                  {Object.keys(row.warehouses).map((warehouseName) => (
                    <TableCell key={warehouseName}>
                      {row.warehouses[warehouseName] === 0
                        ? ""
                        : row.warehouses[warehouseName]}
                    </TableCell>
                  ))}
                  <TableCell>{row.total}</TableCell>
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
          p: 1,
        }}
      >
        {/* Поиск */}
        <TextField
          label="Поиск"
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ display: "flex" }}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={{ textAlign: "center", pl: "25px" }}
          onClick={handlePrint}
          startIcon={<LocalPrintshopIcon />}
        ></Button>

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
    </Paper>
  );
}
