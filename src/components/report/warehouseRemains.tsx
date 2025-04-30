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

  // Пагинация
  const [page, setPage] = React.useState(() => {
    const savedPage = localStorage.getItem("paginationPage");
    return savedPage ? parseInt(savedPage, 10) : 0;
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(() => {
    const savedRowsPerPage = localStorage.getItem("paginationRowsPerPage");
    return savedRowsPerPage ? parseInt(savedRowsPerPage, 10) : 25;
  });

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

  // Сохраняем состояние пагинации в localStorage
  React.useEffect(() => {
    localStorage.setItem("paginationPage", page.toString());
    localStorage.setItem("paginationRowsPerPage", rowsPerPage.toString());
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer
        sx={{ maxHeight: 540, maxWidth: "100%", overflowX: "auto" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 50 }}>Артикул</TableCell>
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
              <TableCell sx={{ minWidth: 100 }}>Всего</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {remains
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100, 125]}
        component="div"
        count={remains.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
