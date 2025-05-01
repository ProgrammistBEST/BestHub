import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const images = [
  {
    label: "Image 1",
    imgPath:
      "https://content-03.wbbasket.ru/8f5dd608-008d-4efa-9e6c-6ae29304e6bb/8.webp",
  },
  {
    label: "Image 2",
    imgPath:
      "https://content-01.wbbasket.ru/810f36bd-be05-4b26-9953-1b1a12da30e3/2.webp",
  },
  {
    label: "Image 3",
    imgPath:
      "https://content-01.wbbasket.ru/a6231f67-ca70-4fd9-bfe3-5357bf6e6472/2.webp",
  },
];

export default function ImageSlider() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  // Автоматическое переключение каждые 5 секунд
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    }, 5000);
    return () => clearInterval(interval);
  }, [maxSteps]);
  console.log("!");
  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1, margin: "auto", mb: 2, ml: 2 }}>
      {/* Контейнер для изображений */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          position: "relative",
          width: "100%",
          height: 200,
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        {/* Текущее изображение */}
        <Box
          component="img"
          sx={{
            height: 200,
            width: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            transition: "opacity 0.5s ease-in-out", // Плавный переход
            opacity: 1,
          }}
          src={images[activeStep].imgPath}
          alt={images[activeStep].label}
        />
      </Box>
    </Box>
  );
}
