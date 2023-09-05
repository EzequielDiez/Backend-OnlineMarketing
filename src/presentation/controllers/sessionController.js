import SessionManager from '../../domain/managers/SessionManager.js';

class SessionController {

    static login = async (req, res, next) => {
        try {
            const sessionManager = new SessionManager()
            const accessToken = await sessionManager.login(req.body)
            res.cookie('accessToken', accessToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }).status(200).send({ status: 'Success', message: 'You have logged in', accessToken });
        } catch (error) {
            next(error)
        }
    }

    static current = async (req, res, next) => {
        try {
            res.status(200).send({ status: 'Success', payload: req.user });
        } catch (error) {
            next(error)
        }
    }

    static signup = async (req, res, next) => {
        try {
            const sessionManager = new SessionManager();
            const user = await sessionManager.signup(req.body);
            res.status(201).send({ status: 'Success', user, message: 'You have registered' });
        } catch (error) {
            next(error)
        }
    }

    static logout = async (req, res, next) => {
        try {
            const sessionManager = new SessionManager()
            const token = await sessionManager.logout(req.user.email)
            req.user = undefined
            res.clearCookie('accessToken', {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }).send({ status: 'Success', message: 'You have logged out', token });
        } catch (error) {
            next(error)
        }
    }

    static forgotPassword = async (req, res, next) => {
        try {
            const { email } = req.body;
            const sessionManager = new SessionManager();
            await sessionManager.forgotPassword(email);
            res.status(200).send({ status: 'Success', message: 'We have sent you an email.' });
        } catch (error) {
            next(error)
        }
    }

    static resetPassword = async (req, res, next) => {
        try {
            const sessionManager = new SessionManager()
            await sessionManager.resetPassword({ ...req.query, ...req.body });
            res.status(200).send({ status: 'Success', message: 'Your password has been changed.' });
        } catch (error) {
            next(error)
        }
    }
}

export default SessionController
