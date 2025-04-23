"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Fade,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import MainMenu from "../../components/stickers/component/MainMenu";

const programs = [
  {
    id: 1,
    name: "Стикеры",
    description: ".",
    component: <Stickers />,
  },
  {
    id: 2,
    name: "Себестоимость",
    description: ".",
    component: <CostPrice />,
  },
  {
    id: 3,
    name: "Акции",
    description: ".",
    component: <Promotions />,
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

function CostPrice() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5">Себестоимость</Typography>
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
        sx={{ mb: 4 }}
      >
        {programs.map((program) => (
          <ToggleButton key={program.id} value={program.id}>
            {program.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Плавное отображение выбранной программы */}
      <Fade in={true} timeout={500}>
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
      </Fade>
    </Container>
  );
}

export default ProgramPage;
