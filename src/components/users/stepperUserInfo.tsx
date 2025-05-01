import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const steps = [
  {
    id: 1,
    label: "Управление пользователями",
    description: `Краткое описание того, что можно сделать категории "Пользователи".`,
  },
  {
    id: 2,
    label: "Редактирование",
    description:
      "Отредактируйте информацию о пользователе: Имя, должность, статус, роль и т.д.",
  },
  {
    id: 3,
    label: "Удаление",
    description: `Чтобы удалить пользователя нажмите на красную кнопку.`,
  },
];

export default function StepperUserInfo() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        flexGrow: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        textAlign: "center",
        mb: 2,
        ml: 2,
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography variant="subtitle1">{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{ height: 95, p: 2 }}>
        <Typography variant="body2">{steps[activeStep].description}</Typography>
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
