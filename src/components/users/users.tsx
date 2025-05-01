import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, lighten, darken, display } from "@mui/system";
import "./style.css";
import StepperUserInfo from "./stepperUserInfo";
import ImageSlider from "./sliderImage";

const users = [
  {
    id: 1,
    name: "Никита",
    status: "Работает",
    job: "Программист",
    role: "Admin",
    phone: "+7 952 155 9947",
  },
  {
    id: 2,
    name: "Иван",
    status: "Работает",
    job: "Упаковщик",
    role: "User",
    phone: "+46 8 123 456",
  },
  {
    id: 3,
    name: "Мария",
    status: "Уволен",
    job: "Швея",
    role: "User",
    phone: "+86 10 1234 5678",
  },
];

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles("dark", {
    backgroundColor: darken(theme.palette.primary.main, 0.8),
  }),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

function Row({ user }: { user: (typeof users)[0] }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:hover": {
            backgroundColor: "rgba(41, 41, 41, 0.09)",
            cursor: "pointer",
          },
        }}
        onClick={() => setOpen(!open)}
      >
        <TableCell align="center">
          <Typography variant="body2">{user.id}</Typography>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton aria-label="expand row" size="small">
              <Avatar
                alt={user.name}
                src="https://mui.com/static/images/avatar/6.jpg"
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
            <Typography variant="subtitle1" fontWeight="bold">
              {user.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="center">{user.job}</TableCell>
        <TableCell align="center">
          <Typography
            variant="body2"
            sx={{
              color: user.status === "Работает" ? "green" : "red",
            }}
          >
            {user.status}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography
            variant="body2"
            sx={{
              color: user.role === "Admin" ? "yellow" : "",
            }}
          >
            {user.role}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">{user.phone}</Typography>
        </TableCell>
      </TableRow>
      {/* Развернутая часть строки */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  aria-label="Удалить пользователя"
                >
                  Удалить
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="Редактировать пользователя"
                >
                  Редактировать
                </Button>{" "}
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function UsersTable() {
  const optionsName = users.map((user) => {
    const firstLetter = user.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...user,
    };
  });

  const optionsJob = users.map((user) => {
    const firstLetter = user.job[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...user,
    };
  });

  const optionsRole = users.map((user) => {
    const firstLetter = user.role[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...user,
    };
  });

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <Autocomplete
            options={optionsName.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            sx={{ width: 200, marginBottom: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Поиск по имени" />
            )}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>
                  {params.children.map((child, index) => (
                    <li key={index}>{child}</li>
                  ))}
                </GroupItems>
              </li>
            )}
          />
          <Autocomplete
            options={optionsRole.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.job}
            sx={{ width: 200, marginBottom: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Поиск по должности" />
            )}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>
                  {params.children.map((child, index) => (
                    <li key={index}>{child}</li>
                  ))}
                </GroupItems>
              </li>
            )}
          />
          <Autocomplete
            options={optionsJob.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.role}
            sx={{ width: 200, marginBottom: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Поиск по роли" />
            )}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>
                  {params.children.map((child, index) => (
                    <li key={index}>{child}</li>
                  ))}
                </GroupItems>
              </li>
            )}
          />
        </div>
        <StepperUserInfo />
        <ImageSlider />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" sx={{ borderRadius: "20px" }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">№</TableCell>
              <TableCell align="left">Имя</TableCell>
              <TableCell align="center">Должность</TableCell>
              <TableCell align="center">Статус</TableCell>
              <TableCell align="center">Роль</TableCell>
              <TableCell align="center">Номер</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <Row key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
