import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  Button,
  TextField,
  DialogContent,
  Autocomplete,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { styled } from "@mui/system";
import { QRCodeSVG } from "qrcode.react";
import { FilterList, Add } from "@mui/icons-material";
import AddNewModelButton from "./addingModel";
const mockData = {
  equipment: Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    serialNumber: `EQP-${String(index + 1).padStart(3, "0")}`,
    purchaseDate: randomDate(new Date(2020, 0, 1), new Date())
      .toISOString()
      .split("T")[0],
    registrationDate: randomDate(new Date(2020, 0, 1), new Date())
      .toISOString()
      .split("T")[0],
    type: randomItem(["Ноутбук", "Принтер", "Монитор", "Сканер", "Сервер"]),
    manufacturer: randomItem(["Dell", "HP", "LG", "Lenovo", "Apple", "Asus"]),
    model: randomModel(),
    warrantyEndDate: randomDate(new Date(), new Date(2027, 0, 1))
      .toISOString()
      .split("T")[0],
    purchaseCost: Math.floor(Math.random() * 150000 + 10000),
    status: randomItem(["в эксплуатации", "списан", "свободен", "в ремонте"]),
    location: randomLocation(),
    qrCode: `https://example.com/qr/EQP- ${String(index + 1).padStart(3, "0")}`,
  })),
  responsiblePersons: [
    {
      id: 1,
      fullName: "Иванов Иван Иванович",
      employeeId: "EMP-001",
      email: "ivanov@example.com",
      department: "IT-отдел",
      position: "Системный администратор",
    },
    {
      id: 2,
      fullName: "Петров Петр Петрович",
      employeeId: "EMP-002",
      email: "petrov@example.com",
      department: "Бухгалтерия",
      position: "Главный бухгалтер",
    },
    {
      id: 3,
      fullName: "Сидорова Анна Сергеевна",
      employeeId: "EMP-003",
      email: "sidorova@example.com",
      department: "HR",
      position: "HR-менеджер",
    },
  ],
  changeHistory: Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    equipmentId: Math.floor(Math.random() * 130) + 1,
    action: randomItem(["добавлен", "передан", "изменен", "списан"]),
    performedBy: randomItem([
      "Иванов Иван Иванович",
      "Петров Петр Петрович",
      "Сидорова Анна Сергеевна",
    ]),
    actionDate: randomDate(new Date(2020, 0, 1), new Date())
      .toISOString()
      .split("T")[0],
    description: randomDescription(),
  })),
};

// Вспомогательные функции для генерации случайных данных
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomModel() {
  const models = [
    "XPS 13",
    "LaserJet Pro MFP M227fdw",
    "UltraFine 27UN850-W",
    "ThinkPad X1 Carbon",
    "MacBook Pro 16",
    "ProDisplay XDR",
    "ZenBook 14",
    "OfficeJet Pro 9025",
    "Ultrasharp U2723QE",
    "PowerEdge R750",
  ];
  return randomItem(models);
}

function randomLocation() {
  const locations = [
    "Офис A, кабинет 101",
    "Офис B, кабинет 202",
    "Склад, стойка 5",
    "Офис C, кабинет 303",
    "Офис D, кабинет 404",
    "Серверная, стойка 1",
    "Офис E, кабинет 505",
  ];
  return randomItem(locations);
}

function randomDescription() {
  const descriptions = [
    "Техника зарегистрирована в системе.",
    "Техника передана в отдел бухгалтерии.",
    "Статус изменен на 'свободен'.",
    "Техника списана по причине выхода из строя.",
    "Техника отправлена в ремонт.",
    "Техника возвращена из ремонта.",
  ];
  return randomItem(descriptions);
}
// Стилизация для таблицы
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: 14,
  padding: "12px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

const StatusChip = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case "в эксплуатации":
        return "success";
      case "списан":
        return "error";
      case "свободен":
        return "info";
      default:
        return "warning";
    }
  };

  return (
    <Box
      sx={{
        display: "inline-block",
        px: 2,
        py: 0.5,
        borderRadius: 20,
        bgcolor: `${getColor()}.light`,
        color: `white`,
        fontWeight: "bold",
        fontSize: 12,
      }}
    >
      {status}
    </Box>
  );
};

const Row = ({ equipment }) => {
  const [open, setOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Функция для открытия модального окна
  const handleQRButtonClick = () => {
    console.log("!");
    setIsQRModalOpen(true);
  };

  // Функция для закрытия модального окна
  const handleCloseQRModal = () => {
    setIsQRModalOpen(false);
  };

  return (
    <React.Fragment>
      <StyledTableRow>
        <StyledTableCell align="center">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="center">
          {equipment.serialNumber}
        </StyledTableCell>
        <StyledTableCell align="center">{equipment.type}</StyledTableCell>
        <StyledTableCell align="center">
          {equipment.manufacturer}
        </StyledTableCell>
        <StyledTableCell align="center">{equipment.model}</StyledTableCell>
        <StyledTableCell align="center">
          <StatusChip status={equipment.status} />
        </StyledTableCell>
        <StyledTableCell align="center">{equipment.location}</StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Дополнительная информация
              </Typography>
              <Table size="small" aria-label="details">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Дата покупки
                    </TableCell>
                    <TableCell>{equipment.purchaseDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Дата окончания гарантии
                    </TableCell>
                    <TableCell>{equipment.warrantyEndDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Стоимость
                    </TableCell>
                    <TableCell>{equipment.purchaseCost} руб.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      QR-код
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleQRButtonClick}
                      >
                        Показать QR-код
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Модальное окно для QR-кода */}
                  <Dialog open={isQRModalOpen} onClose={handleCloseQRModal}>
                    <DialogTitle>QR-код для оборудования</DialogTitle>
                    <DialogContent>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <QRCodeSVG
                          value={JSON.stringify({
                            serialNumber: equipment.serialNumber,
                            purchaseDate: equipment.purchaseDate,
                            registrationDate: equipment.registrationDate,
                            type: equipment.type,
                            manufacturer: equipment.manufacturer,
                            model: equipment.model,
                            warrantyEndDate: equipment.warrantyEndDate,
                            purchaseCost: equipment.purchaseCost,
                            status: equipment.status,
                            location: equipment.location,
                          })}
                          size={256}
                          level="L"
                        />{" "}
                        <Typography variant="body2" sx={{ mt: 2 }}>
                          QR-код содержит всю информацию об оборудовании.
                        </Typography>
                      </Box>
                    </DialogContent>
                  </Dialog>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default function DeviceInventoryManager() {
  const [equipmentList, setEquipmentList] = useState(mockData.equipment);

  // Функция для добавления новой модели
  const handleAddNewModel = (newModel) => {
    const newEquipment = {
      id: equipmentList.length + 1,
      ...newModel,
      qrCode: `https://example.com/qr/EQP- ${String(
        equipmentList.length + 1
      ).padStart(3, "0")}`,
    };
    setEquipmentList((prev) => [...prev, newEquipment]);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          //   backgroundColor: (theme) => theme.palette.grey[200],
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      >
        {/* Фильтр по работнику */}
        <Autocomplete
          getOptionLabel={(option) => option.fullName || "Все"}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Фильтр по работнику"
              placeholder="Выберите работника"
              size="small"
            />
          )}
          sx={{ width: "25%", marginRight: "16px" }}
        />

        {/* Фильтр по статусу */}
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Фильтр по статусу"
              placeholder="Выберите статус"
              size="small"
            />
          )}
          sx={{ width: "25%", marginRight: "16px" }}
        />

        {/* Фильтр по расположению */}
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              label="Фильтр по расположению"
              placeholder="Выберите расположение"
              size="small"
            />
          )}
          sx={{ width: "25%", marginRight: "16px" }}
        />

        {/* Кнопка фильтрации */}
        <IconButton color="primary" sx={{ marginRight: "16px" }}>
          <FilterList />
        </IconButton>

        {/* Кнопка добавления новой модели */}
        <AddNewModelButton onAdd={handleAddNewModel} />
      </Box>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell align="center">Серийный номер</StyledTableCell>
            <StyledTableCell align="center">Тип</StyledTableCell>
            <StyledTableCell align="center">Производитель</StyledTableCell>
            <StyledTableCell align="center">Модель</StyledTableCell>
            <StyledTableCell align="center">Статус</StyledTableCell>
            <StyledTableCell align="center">Расположение</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.equipment.map((equipment) => (
            <Row key={equipment.id} equipment={equipment} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
