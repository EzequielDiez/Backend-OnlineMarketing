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
            res.send({ status: 'success', result, message: 'User updated to Premium' });
        } catch (error) {
            next(error)
        }
    }
}

export default UserController

/* export const getUsers = async(req, res) =>
{
    const { limit, page } = req.query;
    const userManager = new UserManager();

    const users = await userManager.getAll({ limit, page });

    res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
};

export const getOne = async(req, res) =>
{
    const { id } = req.params;

    const manager = new UserManager();
    const user = await manager.getOne(id);

    res.send({ status: 'success', user });
}; */

export const changePremium = async(req, res) =>
{
    const manager = new UserManager();
    const result = await manager.changePremium({ id: req.user.id });

    res.send({ status: 'success', result, message: 'User updated to Premium' });
};


/* export const save = async(req, res) =>
{
    const manager = new UserManager();
    const user = await manager.create(req.body);

    res.send({ status: 'success', user, message: 'User created.' });
}; */

export const insertDocuments = async(req, res) =>
{
    const manager = new UserManager();
    await manager.addDocuments({ id: req.user.id, files: req.files });
    res.status(200).send({ status: 'success', message: 'The documents has been added successfully' });
};

export const update = async(req, res) =>
{
    const { id } = req.params;

    const manager = new UserManager();
    const result = await manager.updateOne(id, req.body);

    res.send({ status: 'success', result, message: 'User updated.' });
};

export const deleteOne = async(req, res) =>
{
    const { id } = req.params;

    const manager = new UserManager();
    await manager.deleteOne(id);

    res.send({ status: 'success', message: 'User deleted.' });
};
