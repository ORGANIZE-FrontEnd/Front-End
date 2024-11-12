import { encryptToken } from "@/app/services/auth/cookieService";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  const secretKeyBase64 = process.env.SECRET_KEY || "";

  const encryptedToken = await encryptToken(token, secretKeyBase64);

  const cookie = serialize("accessToken", encryptedToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "accessToken Cookie set successfully" });
}
