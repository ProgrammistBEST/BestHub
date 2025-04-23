import axios from "axios";
import { PDFDocument } from "pdf-lib";

// Интерфейс для описания данных стикера
interface Sticker {
  file: string; // Base64-encoded строка изображения
}

const brandMap = {
  WB: {
    Armbest: {
      id: 3,
      category: "WB",
      company_name: "Armbest",
    },
    Bestshoes: {
      id: 6,
      category: "WB",
      company_name: "Bestshoes",
    },
    Best26: {
      id: 9,
      category: "WB",
      company_name: "Best26",
    },
  },
  OZON: {
    Armbest: {
      id: {
        key: 12,
        ClientId: 13,
      },
      category: "OZON",
      company_name: "Armbest",
    },
    Bestshoes: {
      id: {
        key: 14,
        ClientId: 15,
      },
      category: "OZON",
      company_name: "Bestshoes",
    },
  },
};



// Функция для получения и сохранения стикеров в PDF
export default async function getStickerFile(
  brand: string,
  place: string,
  ids: number[]
) {
  try {
    const infoBrand = brandMap[brand];
    const key = await getApiKey(infoBrand);
    const headers = {
      Authorization: key,
      "Content-Type": "application/json",
    };

    const params = { type: "png", width: "58", height: "40" };

    console.log("Запрос стикеров...");
    console.log(
      "Параметры:",
      params,
      "IDs:",
      ids,
      "Headers:",
      headers,
      "key:",
      key
    );

    // Запрос к API Wildberries
    const response = await axios.post<{ stickers: Sticker[] }>(
      "https://marketplace-api.wildberries.ru/api/v3/orders/stickers",
      { orders: ids },
      { headers, params }
    );

    console.log("Ответ API:", response.data);
    if (response.data.stickers.length == 0) {
      return;
    }
    // Создание PDF документа
    const pdfDoc = await PDFDocument.create();
    const images: Uint8Array[] = [];

    for (const sticker of response.data.stickers) {
      const imageBuffer = Uint8Array.from(atob(sticker.file), (c) =>
        c.charCodeAt(0)
      );
      images.push(imageBuffer);
    }

    console.log("Обработаны все изображения:", images);

    // Добавление изображений в PDF
    for (const image of images) {
      const embeddedImage = await pdfDoc.embedPng(image);
      const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
      page.drawImage(embeddedImage, { x: 0, y: 0 });
    }

    // Сохранение PDF
    const pdfBytes = await pdfDoc.save();
    console.log("PDF создан.");

    // Создание ссылки для скачивания PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    // Создание временной ссылки для скачивания
    const a = document.createElement("a");
    a.href = url;
    a.download = "stickers.pdf";
    document.body.appendChild(a);
    a.click();

    // Очистка URL объекта
    URL.revokeObjectURL(url);
    document.body.removeChild(a);

    console.log("PDF успешно скачан.");
  } catch (error) {
    console.error("Ошибка при получении стикеров:", error);
    return false;
  }
}

async function getApiKey(brand: object) {
  try {
    const response = await axios.get(
      `http://192.168.100.170:2024/api/v1/api?company_name=${brand.company_name}&id=${brand.id}&category=${brand.category}`
    );

    if (response.status !== 200) {
      throw new Error(`Server error: ${response.statusText}`);
    }
    if (!response.data) {
      throw new Error("Token not found in the response");
    }
    return response.data;
  } catch (err) {
    console.error("Ошибка: ", err);
  }
}
