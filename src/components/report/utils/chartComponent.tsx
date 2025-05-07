import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Получаем метки (например, номер дня)
    const labels = data.map((item) => item.label);

    // Формируем данные для каждого датасета
    const datasets = [
      {
        label: "Продано шт.",
        data: data.map((item) => item.sold),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Продано на сумму",
        data: data.map((item) => item.soldPrice),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Возврат шт.",
        data: data.map((item) => item.return),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Сумма возврата",
        data: data.map((item) => item.returnPrice),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Прибыль",
        data: data.map((item) => item.profit),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Перевод наличных",
        data: data.map((item) => item.cashTransfer),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
      {
        label: "Налог",
        data: data.map((item) => item.tax),
        backgroundColor: "rgba(100, 149, 237, 0.6)",
        borderColor: "rgba(100, 149, 237, 1)",
        borderWidth: 1,
      },
      {
        label: "Финальная прибыль",
        data: data.map((item) => item.finalProfit),
        backgroundColor: "rgba(34, 139, 34, 0.6)",
        borderColor: "rgba(34, 139, 34, 1)",
        borderWidth: 1,
      },
    ];

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Статистика продаж",
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <canvas
      ref={chartRef}
      id="dynamicChart"
      //   style={{ width: "4px", height: "100px" }}
    />
  );
};

export default ChartComponent;
