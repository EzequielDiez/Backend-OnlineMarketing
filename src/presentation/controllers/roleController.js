import RoleManager from '../../domain/managers/RoleManager.js';

class RoleController {

    static list = async (req, res, next) => {
        try {
            const roleManager = new RoleManager();
            const roles = await roleManager.getAll(req.query);
            res.status(200).send({ status: 'success', roles: roles.docs, ...roles, docs: undefined });
        } catch (error) {
            next(error)
        }
    }

    static getRoleById = async (req, res, next) => {
        try {
            const roleManager = new RoleManager();
            const role = await roleManager.getOne(req.params.id);
            res.status(200).send({ status: 'success', role, message: 'Role found' });
        } catch (error) {
            next(error)
        }
    }

    static postRole = async (req, res, next) => {
        try {
            const roleManager = new RoleManager();
            const role = await roleManager.create(req.body);
            res.status(201).send({ status: 'success', role, message: 'Role created.' });
        } catch (error) {
            next(error)
        }
    }

    static putRole = async (req, res, next) => {
        try {
            const roleManager = new RoleManager();
            const role = await roleManager.updateOne(req.params.id, req.body);
            res.status(200).send({ status: 'success', role, message: 'Role updated.' });
        } catch (error) {
            next(error)
        }
    }

    static deleteOneRole = async (req, res, next) => {
        try {
            const roleManager = new RoleManager();
            await roleManager.deleteOne(req.params.id);
            res.send({ status: 'success', message: 'Role deleted.' });
        } catch (error) {
            next(error)
        }
    }
}

export default RoleController