"use client";

import { ColorModeContext } from "@contexts/color-mode";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useGetIdentity } from "@refinedev/core";
import {
  Modal,
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Fade,
  Backdrop,
} from "@mui/material";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React, { useContext, useState } from "react";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useGetIdentity<IUser>();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Функция для закрытия модального окна
  const handleEditProfile = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AppBar position={sticky ? "sticky" : "relative"}>
        <Toolbar>
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <HamburgerMenu />
            <Stack
              direction="row"
              width="100%"
              justifyContent="flex-end"
              alignItems="center"
            >
              <IconButton
                color="inherit"
                onClick={() => {
                  setMode();
                }}
              >
                {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
              </IconButton>

              {(user?.avatar || user?.name) && (
                <Stack
                  direction="row"
                  gap="16px"
                  alignItems="center"
                  justifyContent="center"
                >
                  {user?.name && (
                    <Typography
                      sx={{
                        display: {
                          xs: "none",
                          sm: "inline-block",
                        },
                      }}
                      variant="subtitle2"
                    >
                      {user?.name}
                    </Typography>
                  )}
                  <IconButton onClick={handleOpenModal}>
                    <Avatar src={user?.avatar} alt={user?.name} />
                  </IconButton>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      {/* Модальное окно */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby="modal-title"
      >
        <Fade in={isModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: 600, // Максимальная ширина
              width: "90%", // Занимает 90% ширины экрана на маленьких устройствах
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography id="modal-title" variant="h6" gutterBottom>
              Профиль пользователя
            </Typography>
            {user ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Avatar
                    src={user.avatar}
                    alt={user.login}
                    sx={{ width: 56, height: 56 }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography variant="body1" fontWeight="bold">
                    {user.login}
                  </Typography>
                  <Typography variant="body2">Почта: {user.email}</Typography>
                  <Typography variant="body2">Роль: {user.role}</Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="body1">Загрузка данных...</Typography>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditProfile}
              >
                Редактировать
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleCloseModal}
                sx={{ marginLeft: 2 }}
              >
                Закрыть
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
