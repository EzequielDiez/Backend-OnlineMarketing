import UserManager from '../../domain/managers/UserManager.js';

class UserController {

    static getUsers = async (req, res, next) => {
        try {
            const userManager = new UserManager();
            const paginatedUsers = await userManager.getAll(req.query);
            res.status(200).send({ status: "success", ...paginatedUsers });
        } catch (error) {
            next(error)
        }
    }

    static getUserById = async (req, res, next) => {
        try {
            const userManager = new UserManager();
            const user = await userManager.getOne(req.params.id);
            res.status(200).send({ status: 'success', user, message: 'User found' });
        } catch (error) {
            next(error)
        }
    }

    static postUser = async (req, res, next) => {
        try {
            const userManager = new UserManager();
            const user = await userManager.create(req.body);
            res.status(201).send({ status: 'success', user, message: 'User created.' });
        } catch (error) {
            next(error)
        }
    }

    static changeToPremium = async (req, res, next) => {
        try {
            const userManager = new UserManager();
            const result = await userManager.changePremium({ id: req.user.id });
            res.status(200).send({ status: 'success', result, message: 'User updated to Premium' });
        } catch (error) {
            next(error)
        }
    }

    static postDocuments = async (req, res, next) => {
        try {
            const userManager = new UserManager();
            await userManager.addDocuments({ id: req.user.id, files: req.files });
            res.status(200).send({ status: 'success', message: 'The documents has been added' });
        } catch (error) {
            next(error)
        }
    }

    static putUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const userManager = new UserManager();
            const result = await userManager.update(id, req.body);
            res.status(200).send({ status: 'success', result, message: 'User updated.' });
        } catch (error) {
            next(error)
        }
    }

    static deleteOneUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const userManager = new UserManager();
            await userManager.deleteOne(id);
            res.status(200).send({ status: 'success', message: 'User deleted.' });
        } catch (error) {
            next(error)
        }
    }

    static deleteInactiveUsers = async (req, res, next) => {
        try {
            const userManager = new UserManager()
            const result = await userManager.deleteInactives()
            res.status(200).send({ status: 'success', message: 'Inactive users deleted.', result });
        } catch (error) {
            next(error)
        }
    }
}

export default UserController