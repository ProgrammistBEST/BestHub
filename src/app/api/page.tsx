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
    <Fade in={true} timeout={400}>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Container sx={{ maxWidth: "10000px !important" }}>
          <ApiList />
        </Container>
      </Box>
    </Fade>
  );
}

export default ApisPage;
