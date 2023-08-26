import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const createHash = async(password) =>
{
    return await bcrypt.hash(password, 10);
};

export const isValidPassword = async(password, passwordHash) =>
{
    return await bcrypt.compare(password, passwordHash);
};

export const generateToken = async(user) =>
{
    return new Promise((resolve, reject) =>
    {
        const token = jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '2h' });
        resolve(token);
    });
};

export const generateResetToken = (user) =>
{
    return jwt.sign({ user: { id: user.id } }, process.env.JWT_RESET_KEY, { expiresIn: '10m' });
};

export const generateLogoutToken = () => 
{
    return jwt.sign({}, process.env.JWT_LOGOUT_KEY, { expiresIn: '0.1s' })
}
