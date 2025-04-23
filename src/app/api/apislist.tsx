import { getApis } from "./apis";
// import { verifyToken } from "./src/auth/jwt.util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getApisHandler(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const getApisHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // const decoded = verifyToken(token);
    const decoded = 1234;

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const apis = await getApis();
    return res.json(apis);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
