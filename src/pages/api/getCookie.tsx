import { decryptToken } from "@/app/services/auth/cookieService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const encryptedToken = req.cookies.accessToken;
  const secretKey = process.env.SECRET_KEY || "";

  if (encryptedToken) {
    try {
      const decryptedToken = await decryptToken(encryptedToken, secretKey);
      return res.status(200).json({ decryptedToken });
    } catch (error) {
      console.error("Error decrypting token:", error);
      return res.status(400).json({ message: "Error decrypting cookie" });
    }
  } else {
    return res.status(400).json({ message: "Token not found in cookies" });
  }
}
