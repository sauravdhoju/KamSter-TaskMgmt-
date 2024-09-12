import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT;
export const mongo_uri = process.env.MONGO_URI;
export const secret = process.env.SECRET;
export const token_expire = process.env.TOKEN_EXPIRE;
export const jwt_token_expire = process.env.JWT_TOKEN_EXPIRE;
