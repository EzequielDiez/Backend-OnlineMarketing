import UserManager from '../../domain/managers/UserManager.js';

export const list = async(req, res) =>
{
    const { limit, page } = req.query;
    const manager = new UserManager();

    const users = await manager.paginate({ limit, page });

    res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
};

export const getOne = async(req, res) =>
{
    const { id } = req.params;

    const manager = new UserManager();
    const user = await manager.getOne(id);

    res.send({ status: 'success', user });
};

export const changePremium = async(req, res) =>
{
    const { uid } = req.params;
    const manager = new UserManager();
    const result = await manager.changePremium(uid);

    res.send({ status: 'success', result, message: 'User update to Premium' });
};

export const save = async(req, res) =>
{
    const manager = new UserManager();
    const user = await manager.create(req.body);

    res.send({ status: 'success', user, message: 'User created.' });
};

export const insertDocuments = async(req, res) =>
{
    const { uid } = req.params;
    const manager = new UserManager();
    await manager.addDocuments({ id: uid, files: req.files });
    res.status(200).send({ status: 'success', message: 'The documents has been added successfully' })
}

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
