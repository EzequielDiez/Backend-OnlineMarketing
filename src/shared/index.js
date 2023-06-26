/* import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const createHash = async (password) =>
{
    return await bcrypt.hash(password, 10)
}

export const isValidPassword = async (password, passwordHash) =>
{
    return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user) =>
{
    return new Promise((resolve, reject) =>
    {
      const token = jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '1m' });
      resolve(token);
    });
} */

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const createHash = async (password) =>
{
    console.log("Creating hash:", password);
    return await bcrypt.hash(password, 10)
}

export const isValidPassword = async (password, passwordHash) =>
{
    console.log("Checking password:", password);
    console.log("Checking passwordhash", passwordHash)
    return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user) =>
{
    return new Promise((resolve, reject) =>
    {
      console.log("Generating token for user:", user);
      const token = jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '1m' });
      resolve(token);
    });
}