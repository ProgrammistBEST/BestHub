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
import ApiList from "../../components/apis/apiList";

function ApisPage() {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 3,
        textAlign: "center",
      }}
    >
      <Container sx={{ my: 4, maxWidth: "10000px !important" }}>
        {/* Заголовок */}
        <Typography variant="h4" gutterBottom>
          API
        </Typography>
        <ApiList />
      </Container>
    </Box>
  );
}

export default ApisPage;
