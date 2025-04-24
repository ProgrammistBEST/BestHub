"use client";
import { Container, Box, Fade } from "@mui/material";
import React, { useState } from "react";

function Analytics() {
  return (
    <>
      <Fade in={true} timeout={500}>
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
          }}
        ></Box>
      </Fade>
    </>
  );
}

export default Analytics;
