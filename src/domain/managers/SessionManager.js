import jwt from "jsonwebtoken";
import container from "../../container.js";
import EmailManager from "./EmailManager.js";
import { createHash, generateToken, isValidPassword, generateResetToken } from "../../shared/index.js";
import userCreateValidation from "../validations/user/userCreateValidation.js";
import loginValidation from "../validations/session/loginValidation.js";

class SessionManager {
    constructor() {
        this.userRepository = container.resolve('UserRepository');
    }

    async login(email, password) {
        await loginValidation.parseAsync({ email, password });

        const user = await this.userRepository.getOneByEmail(email);
        const isHashedPassword = await isValidPassword(password, user.password);

        if (!isHashedPassword) {
            throw new Error('Login failed, invalid password.');
        }

        return await generateToken(user);
    }

    async signup(payload) {
        await userCreateValidation.parseAsync(payload);

        const dto = {
            ...payload,
            password: await createHash(payload.password, 10)
        };

        const user = await this.userRepository.create(dto);

        return { ...user, password: undefined };
    }

    async forgotPassword(data) {
        const email = data;

        const user = await this.userRepository.getOneByEmail(email);

        if (!user) {
            throw new Error("User not found");
        } 

        const token = generateResetToken(user);

        await EmailManager.send({
            templateFile: "forgotPasswordTemplate.hbs",
            payload: {
                email,
                subject: "Change password",
                token,
                serverPort: process.env.NODE_PORT
            }
        });

        return true;
    }

    async resetPassword(data) {
        const { token, newPassword } = data;

        try {
            const { user } = jwt.verify(token, process.env.JWT_RESET_KEY)

            const userUpdated = await this.userRepository.update({
                uid: user.id,
                update: { password: await createHash(newPassword) },
            });
            
            if (!userUpdated) {
                throw new Error("User not found");
            }

            return true;

        } catch (error) {
            throw new Error("Your token has expired");
        }
    }   
}

export default SessionManager;