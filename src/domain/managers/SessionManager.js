import jwt from 'jsonwebtoken';
import container from '../../container.js';
import EmailManager from './EmailManager.js';
import { createHash, generateToken, isValidPassword, generateResetToken, generateLogoutToken } from '../../shared/index.js';

class SessionManager
{
    constructor()
    {
        this.userRepository = container.resolve('UserRepository');
    }

    async login(data)
    {
        const { email, password } = data;

        const user = await this.userRepository.getOneByEmail(email);
        const isHashedPassword = await isValidPassword(password, user.password);

        if (!isHashedPassword)
        {
            throw new Error('Login failed, invalid password.');
        }

        await this.userRepository.update({ uid: user.id, update: { lastConnection: Date.now() } });

        return generateToken(user);
    }

    async signup(payload)
    {
        const dto = {
            ...payload,
            password: await createHash(payload.password, 10)
        };

        const user = await this.userRepository.create(dto);

        return { ...user, password: undefined };
    }

    async logout(data)
    {
        const user = await this.userRepository.getOneByEmail(data);

        await this.userRepository.update({ uid: user.id, update: { lastConnection: Date.now() } });

        return generateLogoutToken;
    }

    async forgotPassword(data)
    {
        const email = data;

        const user = await this.userRepository.getOneByEmail(email);

        if (!user)
        {
            throw new Error('User not found');
        }

        const token = generateResetToken(user);

        await EmailManager.sendEmail({
            templateFileName: 'forgotPasswordTemplate.hbs',
            payload: {
                email,
                subject: 'Change password',
                token,
                serverPort: process.env.NODE_PORT
            }
        });

        return true;
    }

    async resetPassword(data)
    {
        const { token, newPassword } = data;

        try
        {
            const { user } = jwt.verify(token, process.env.JWT_RESET_KEY);

            const userUpdated = await this.userRepository.update({
                uid: user.id,
                update: { password: await createHash(newPassword) }
            });

            if (!userUpdated)
            {
                throw new Error('User not found');
            }

            return true;
        }
        catch (error)
        {
            throw new Error('Your token has expired');
        }
    }
}

export default SessionManager;
