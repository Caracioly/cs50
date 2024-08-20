import jwt from "jsonwebtoken";

const tokenSecret = process.env.TOKEN_SECRET || "default_secret";

export function generateToken(id: string) {
  return jwt.sign({ id }, tokenSecret, {
    expiresIn: "1h",
  });
}

export function isValidToken(authHeader: string) {
  const token = authHeader;

  try {
    jwt.verify(token, tokenSecret);
  } catch (err) {
    return false;
  }
  return true;
}
