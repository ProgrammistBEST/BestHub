// src/app/programs/page.tsx
"use client"; // Для использования клиентских хуков

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

const programs = [
  {
    id: 1,
    name: "Этикетки",
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
      <Typography variant="h5">Первая программа</Typography>
      <Typography variant="body1">Этикетки</Typography>
    </Box>
  );
}

function CostPrice() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5">Вторая программа</Typography>
      <Typography variant="body1">Себестоимость</Typography>
    </Box>
  );
}

function Promotions() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5">Третья программа</Typography>
      <Typography variant="body1">Акции</Typography>
    </Box>
  );
}

function ProgramPage() {
  const [selectedProgramId, setSelectedProgramId] = useState<number>(1);
  const selectedProgram = programs.find((p) => p.id === selectedProgramId);

  return (
    <Container sx={{ my: 4 }}>
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
