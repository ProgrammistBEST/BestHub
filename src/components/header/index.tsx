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
  Divider,
  Chip,
  Backdrop,
} from "@mui/material";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React, { useContext, useState } from "react";
import {
  EmailOutlined,
  CalendarTodayOutlined,
  AccessTimeOutlined,
  BadgeOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";

import ThemeSwitcher from "../../contexts/color-mode/themeSwitcher";

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditProfile = () => {
    setIsModalOpen(false);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    // Получаем день, месяц и год
    const day = date.getDate();
    const month = date.toLocaleString("ru", { month: "long" });
    const year = date.getFullYear();

    // Получаем время (часы и минуты)
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  return (
    <>
      <AppBar position={sticky ? "sticky" : ""}>
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
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography id="modal-title" variant="h6" gutterBottom>
              Профиль пользователя
            </Typography>
            {user ? (
              <Grid container spacing={3} alignItems="center">
                {/* Аватар */}
                <Grid item xs={12} sm={4}>
                  <Box display="flex" justifyContent="center">
                    <Avatar
                      src={user.avatar}
                      alt={user.login}
                      sx={{
                        width: 150,
                        height: 150,
                        border: "2px solid #e0e0e0",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Box>
                </Grid>

                {/* Информация о пользователе */}
                <Grid item xs={12} sm={8}>
                  <Stack spacing={1}>
                    {/* Логин */}
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <AccountCircleOutlined sx={{ mr: 1 }} />
                      {user.login}
                    </Typography>

                    {/* Почта */}
                    <Box display="flex" alignItems="center">
                      <EmailOutlined sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>

                    {/* Роль */}
                    <Box display="flex" alignItems="center">
                      <BadgeOutlined sx={{ mr: 1, color: "text.secondary" }} />
                      <Chip
                        label={user.role}
                        size="small"
                        sx={{
                          backgroundColor: "#f0f8ff",
                          color: "#007bff",
                          fontWeight: "bold",
                        }}
                      />
                      {/* Статус */}
                      <Chip
                        label={user.status}
                        size="small"
                        sx={{
                          backgroundColor:
                            user.status === "Активен" ? "#e8f5e9" : "#fff3e0",
                          color:
                            user.status === "Активен" ? "#2e7d32" : "#d84315",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>

                    {/* Последний визит */}
                    <Box display="flex" alignItems="center">
                      <AccessTimeOutlined
                        sx={{ mr: 1, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Последний визит: {formatDate(user.last_visit)}
                      </Typography>
                    </Box>

                    {/* Дата регистрации */}
                    <Box display="flex" alignItems="center">
                      <CalendarTodayOutlined
                        sx={{ mr: 1, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Дата регистрации: {formatDate(user.registration_date)}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                {/* Разделитель */}
                <Grid item xs={12}>
                  <Divider sx={{ mt: 2, borderColor: "#ddd" }} />
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
              <ThemeSwitcher />
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
