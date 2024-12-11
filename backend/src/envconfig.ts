import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT;
export const mongo_uri = process.env.MONGO_URI;
export const secret = process.env.SECRET;
export const token_expire = process.env.TOKEN_EXPIRE;
export const jwt_token_expire = process.env.JWT_TOKEN_EXPIRE;
export const frontend_url = process.env.FRONTEND_URL;
export const email_user = process.env.EMAIL_USER;
export const email_password = process.env.EMAIL_PASSWORD;
