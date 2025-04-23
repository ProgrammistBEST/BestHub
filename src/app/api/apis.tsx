import pool from "../db";

export const getApis = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM api_data");
    console.log(rows);
    return rows;
  } catch (error) {
    console.error("Error fetching APIs:", error);
    throw error;
  }
};
