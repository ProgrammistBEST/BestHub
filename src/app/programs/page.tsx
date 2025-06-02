"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Fade,
  ToggleButtonGroup,
  ToggleButton,
  CardActionArea,
  CardContent,
  Card,
} from "@mui/material";
import MainMenu from "../../components/stickers/component/MainMenu";
import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp";
import LoyaltySharpIcon from "@mui/icons-material/LoyaltySharp";
import HelpOutlineSharpIcon from "@mui/icons-material/HelpOutlineSharp";
import GetBarcodes from "@components/barcodes/barcodes";

const programs = [
  {
    id: 1,
    name: "Стикеры",
    description: "Программа для получения стикеров по номерам заданий",
    component: <Stickers />,
    image: <AssignmentSharpIcon />,
  },
  {
    id: 2,
    name: "Баркоды",
    description: "Программа для создания баркодов",
    component: <Barcodes />,
    image: <MonetizationOnSharpIcon />,
  },
  {
    id: 3,
    name: "Акции",
    description:
      "Программа для получения доступных акций и товаров участвующих в акциях",
    component: <Promotions />,
    image: <LoyaltySharpIcon />,
  },
  {
    id: 4,
    name: "Что-то ещё",
    description: "Программа для чего-то ещё",
    component: <Promotions />,
    image: <HelpOutlineSharpIcon />,
  },
];

function Stickers() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5">Стикеры</Typography>
      <MainMenu />
    </Box>
  );
}

function Barcodes() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5">Баркоды</Typography>
      <GetBarcodes />
    </Box>
  );
}

function Promotions() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5">Акции</Typography>
    </Box>
  );
}

function ProgramPage() {
  const [selectedProgramId, setSelectedProgramId] = useState<number>(1);
  const selectedProgram = programs.find((p) => p.id === selectedProgramId);

  return (
    <Fade in={true} timeout={400}>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          minHeight: "85vh",
        }}
      >
        <Container sx={{ my: 4, maxWidth: "10000px !important" }}>
          {/* Заголовок */}
          <Typography variant="h4" gutterBottom>
            Выберите программу
          </Typography>

          {/* Кнопки выбора программы */}
          <ToggleButtonGroup
            value={selectedProgramId}
            exclusive
            onChange={(_, newValue) => setSelectedProgramId(newValue)}
            fullWidth
            sx={{ mb: 4, gap: "20px" }}
          >
            {programs.map((program) => (
              <Card key={program.id} sx={{ Width: "345px" }}>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                      }}
                    >
                      {program?.image}
                      {program.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", height: "40px" }}
                    >
                      {program.description}
                    </Typography>
                    <ToggleButton
                      key={program.id}
                      value={program.id}
                      sx={{
                        borderLeft:
                          "1 solid rgba(255, 255, 255, 0.12) !important",
                      }}
                    >
                      Войти
                    </ToggleButton>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </ToggleButtonGroup>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 3,
              textAlign: "center",
            }}
          >
            {selectedProgram?.component}
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}

export default ProgramPage;
