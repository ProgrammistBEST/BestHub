export const uploadReport = async (formData) => {
  const response = await fetch(
    `http://192.168.100.170:2024/api/v1/costPriceExcel`,
    {
      method: "POST",
      body: formData,
    }
  );
  return await response.json();
};

export const addArticle = async (article, price, generalArticle) => {
  const response = await fetch(`http://192.168.100.170:2024/add-article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article, price, generalArticle }),
  });
  return await response.json();
};
