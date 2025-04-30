import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Select, MenuItem, Slider } from "@mui/material";
import { ApiData } from "../../app/api/types/apiData";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShieldIcon from "@mui/icons-material/Shield";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";

const ApiList = () => {
  const [apis, setApis] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    access_level: "",
    category: "",
    company_name: "",
    progress: [0, 100],
  });

  useEffect(() => {
    const fetchApis = async () => {
      try {
        setLoading(true);
        setError(null);

        let token = localStorage.getItem("token");
        if (!token) {
          token = "root";
        }

        const response = await axios.get(
          "http://192.168.100.170:2024/api/v1/apislist"
        );
        if (response.status !== 200) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid data format");
        }

        setApis(response.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred while fetching APIs");
      } finally {
        setLoading(false);
      }
    };

    fetchApis();
  }, []);

  const pluralizeDays = (days: number): string => {
    if (days === 0) return "Срок истек";
    if (days === 1) return "день";
    if (days >= 2 && days <= 4) return "дня";
    return "дней";
  };

  // Функция для расчета прогресса (сколько осталось до конца)
  const calculateProgress = (expirationDate: string): number => {
    if (!expirationDate) return 0;

    // Текущая дата в миллисекундах
    const now = new Date().getTime();

    // Дата истечения срока в миллисекундах
    const expiration = new Date(expirationDate).getTime();

    // Разница между датами в миллисекундах
    const timeDifference = expiration - now;

    // Если срок уже истек
    if (timeDifference <= 0) return 0;

    // Переводим миллисекунды в дни (1 день = 24 часа * 60 минут * 60 секунд * 1000 миллисекунд)
    const daysLeft = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

    return daysLeft;
  };

  // Функция для расчета цвета прогресса
  const getProgressColor = (progress: number): string => {
    if (progress > 80) return "#4caf50"; // Зеленый
    if (progress > 50) return "#ff9800"; // Оранжевый
    return "#f44336"; // Красный
  };

  const filteredApis =
    apis.length > 0
      ? apis.filter((api) => {
          const progress = calculateProgress(api.expiration_date || "");
          return (
            (!filters.access_level ||
              api.access_level === filters.access_level) &&
            (!filters.category || api.category === filters.category) &&
            (!filters.company_name ||
              api.company_name === filters.company_name) &&
            progress >= filters.progress[0] &&
            progress <= filters.progress[1]
          );
        })
      : [];

  return (
    <>
      <Box sx={{ ml: 0, pt: 3 }}>
        {/* <Typography variant="h4" gutterBottom>
        Список доступных API
      </Typography> */}

        {/* Индикатор загрузки */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Сообщение об ошибке */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* Отображение списка API */}
        {!loading && !error && apis.length > 0 && (
          <>
            {/* Фильтры */}
            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                displayEmpty
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">Все категории</MenuItem>
                <MenuItem value="WB">WB</MenuItem>
                <MenuItem value="OZON">OZON</MenuItem>
                <MenuItem value="Another">Another</MenuItem>
              </Select>

              <Select
                value={filters.company_name}
                onChange={(e) =>
                  setFilters({ ...filters, company_name: e.target.value })
                }
                displayEmpty
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">Все компании</MenuItem>
                <MenuItem value="Armbest">Armbest</MenuItem>
                <MenuItem value="Bestshoes">Bestshoes</MenuItem>
              </Select>

              <Box sx={{ width: 200 }}>
                <Typography variant="caption">
                  Прогресс: {filters.progress[0]}% - {filters.progress[1]}%
                </Typography>
                <Slider
                  value={filters.progress}
                  onChange={(e, newValue) =>
                    setFilters({ ...filters, progress: newValue as number[] })
                  }
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
              </Box>
            </Box>
            <List>
              {filteredApis.map((api) => {
                const formattedDate = api.expiration_date
                  ? new Date(api.expiration_date).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Дата не указана";
                const progress = calculateProgress(api.expiration_date || "");
                const progressColor = getProgressColor(progress);
                const progressText =
                  progress === 0
                    ? "Срок истек"
                    : `Осталось времени: ${progress} ${pluralizeDays(
                        progress
                      )}`;
                return (
                  <React.Fragment key={api.id}>
                    <ListItem
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: 2,
                      }}
                    >
                      <Card
                        sx={{
                          width: "100%",
                          boxShadow: "none",
                          border: "1px solid rgba(212, 212, 212, 0.64)",
                          transition: "box-shadow 0.2s ease-in-out",
                          "&:hover": {
                            boxShadow:
                              "10px 8px 0px 2px rgba(112, 112, 112, 0.64)",
                          },
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <BusinessIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Компания: {api.company_name}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <CategoryIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Категория: {api.category}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Описание: {api.description}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <CalendarTodayIcon
                              fontSize="small"
                              sx={{ mr: 1 }}
                            />
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Годен до: {formattedDate}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            <ShieldIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Уровень доступа: {api.access_level || "-"}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 2,
                            }}
                          >
                            <Typography variant="caption" sx={{ mr: 1 }}>
                              {progressText}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                              sx={{
                                flexGrow: 1,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: "#e0e0e0",
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor: progressColor,
                                },
                              }}
                            />
                          </Box>{" "}
                        </CardContent>
                      </Card>
                    </ListItem>

                    <Divider sx={{ width: "100%" }} />
                  </React.Fragment>
                );
              })}
            </List>
          </>
        )}

        {/* Если список пуст */}
        {!loading && !error && apis.length === 0 && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Нет доступных API.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default ApiList;
