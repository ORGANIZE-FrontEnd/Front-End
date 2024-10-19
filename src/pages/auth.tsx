import { encryptToken } from "@/app/services/auth/cookieService";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body; // Assume the token is sent in the request body
    const secretKeyBase64 = process.env.NEXT_PUBLIC_SECRET_KEY; // Ensure it's Base64-encoded

    if (!secretKeyBase64 || !token) {
      return res.status(400).json({ error: 'Missing secret key or token' });
    }

    try {
      // Encrypt the token
      const encryptedToken = await encryptToken(token, secretKeyBase64);

      // Set the encrypted token as an HttpOnly cookie
      res.setHeader('Set-Cookie', `accessToken=${encryptedToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${30 * 60}`); // 30 minutes expiry
      return res.status(200).json({ message: 'Token saved as HttpOnly cookie' });
    } catch (error) {
      console.error('Error encrypting token:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle any other HTTP method
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
