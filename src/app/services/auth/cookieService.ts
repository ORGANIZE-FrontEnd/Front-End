import Cookies from "js-cookie";

// Helper function to convert string to ArrayBuffer
const strToArrayBuffer = (str: string) => new TextEncoder().encode(str);

// Helper function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const byteArray = new Uint8Array(buffer);
  let binaryString = "";
  byteArray.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });
  return btoa(binaryString);
};

// Encrypt the JWT using Web Crypto API
export const encryptToken = async (token: string, secretKeyBase64: string) => {
  if (!secretKeyBase64 || !token) {
    throw new Error("Invalid secret key or token");
  }

  // Decode the Base64-encoded secret key
  const secretKeyBytes = Uint8Array.from(atob(secretKeyBase64), (c) =>
    c.charCodeAt(0)
  );

  // Create a CryptoKey from the secret key bytes
  const key = await crypto.subtle.importKey(
    "raw",
    secretKeyBytes.slice(0, 16), // AES key length of 128-bit
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  // Initialization vector (IV) - Same as in Java ('BaeldungIsGreat!')
  const iv = strToArrayBuffer("BaeldungIsGreat!");

  // Encrypt the token using AES-CBC
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    strToArrayBuffer(token)
  );

  // Return Base64 encoded encrypted token
  return arrayBufferToBase64(encrypted);
};

export const saveEncryptedToken = async (token: string) => {
  const secretKeyBase64 = process.env.NEXT_PUBLIC_SECRET_KEY; // Ensure it's Base64-encoded

  if (!secretKeyBase64 || !token) {
    return;
  }

  try {
    // Encrypt the token
    const encryptedToken = await encryptToken(token, secretKeyBase64);
    // Set the encrypted token in a cookie (same as the Java implementation)
    Cookies.set("accessToken", encryptedToken, {
      secure: true,
      sameSite: "strict",
      expires: 6000,
      path: "/",
    });
  } catch (error) {
    console.error("Error encrypting token:", error);
  }
};

export const eraseCookie = (cookieName: string) => {
  if (!cookieName) {
    return;
  }
  Cookies.set(cookieName, "", {
    secure: true,
    sameSite: "strict",
    expires: 0,
    path: "/",
  });
};

// Helper function to convert Base64 to ArrayBuffer
const base64ToArrayBuffer = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// Decrypt the token using Web Crypto API
export const decryptToken = async (
  encryptedToken: string | undefined,
  secretKeyBase64: string
) => {
  if (!secretKeyBase64 || !encryptedToken) {
    throw new Error("Invalid secret key or encrypted token");
  }

  // Decode the Base64-encoded secret key
  const secretKeyBytes = Uint8Array.from(atob(secretKeyBase64), (c) =>
    c.charCodeAt(0)
  );

  // Create a CryptoKey from the secret key bytes
  const key = await crypto.subtle.importKey(
    "raw",
    secretKeyBytes.slice(0, 16), // AES key length of 128-bit
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  // Initialization vector (IV) - Same as in Java ('BaeldungIsGreat!')
  const iv = strToArrayBuffer("BaeldungIsGreat!");

  // Decrypt the token using AES-CBC
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    base64ToArrayBuffer(encryptedToken)
  );

  // Convert decrypted ArrayBuffer back to string
  return new TextDecoder().decode(decrypted);
};
