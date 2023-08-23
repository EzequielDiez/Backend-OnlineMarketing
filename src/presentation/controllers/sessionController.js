import SessionManager from '../../domain/managers/SessionManager.js';
import loginValidation from '../../domain/validations/session/loginValidation.js';

export const login = async(req, res, next) =>
{
    try
    {
        const { email, password } = req.body;

        await loginValidation.parseAsync(req.body);

        const manager = new SessionManager();
        const accessToken = await manager.login(email, password);

        res.cookie('accessToken', accessToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        }).status(200).send({ message: 'You have successfully logged in', accessToken });
    }
    catch (error)
    {
        next(error);
    }
};

export const current = async(req, res, next) =>
{
    try
    {
        res.status(200).send({ status: 'Success', payload: req.user });
    }
    catch (error)
    {
        next(error);
    }
};

export const signup = async(req, res, next) =>
{
    try
    {
        const manager = new SessionManager();
        const user = await manager.signup(req.body);

        res.status(201).send({ status: 'success', user, message: 'You have successfully registered' });
    }
    catch (error)
    {
        next(error);
    }
};

export const forgotPassword = async(req, res, next) =>
{
    try
    {
        const { email } = req.body;
        const manager = new SessionManager();
        await manager.forgotPassword(email);
        res.status(200).send({ status: 'success', message: 'We have sent you an email with instructions to reset your password. Please check your inbox.' });
    }
    catch (error)
    {
        next(error);
    }
};

export const resetPassword = async(req, res, next) =>
{
    try
    {
        const manager = new SessionManager();
        await manager.resetPassword({ ...req.query, ...req.body });
        res.status(200).send({ status: 'success', message: 'Your password has been successfully reset. You can now log in with your new password.' });
    }
    catch (error)
    {
        next(error);
    }
};
