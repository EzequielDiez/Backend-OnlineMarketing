import RoleSchema from '../models/roleSchema.js';
import Role from '../../domain/entities/role.js';

class RoleMongooseRepository
{
    async paginate(criteria)
    {
        try
        {
            const { limit, page } = criteria;
            const roleDocuments = await RoleSchema.paginate({}, { limit, page });
            const { docs, ...pagination } = roleDocuments;

            const roles = docs.map(document => new Role ({
                id: document._id,
                name: document.name,
                permissions: document.permissions
            }));

            return {
                roles,
                pagination
            };
        }
        catch (error)
        {
            console.error(error);
            throw error;
        }
    }

    async getOne(id)
    {
        try
        {
            const document = await RoleSchema.findOne({ _id: id });

            if (!document)
            {
                return null;
            }

            return new Role({
                id: document._id,
                name: document.name,
                permissions: document.permissions
            });
        }
        catch (error)
        {
            console.error(error);
            throw error;
        }
    }

    async create(data)
    {
        try
        {
            const document = await RoleSchema.create(data);

            return new Role({
                id: document._id,
                name: document.name,
                permissions: document.permissions
            });
        }
        catch (error)
        {
            console.error(error);
            throw error;
        }
    }

    async updateOne(id, data)
    {
        try
        {
            const document = await RoleSchema.findOneAndUpdate({ _id: id }, data, { new: true });

            if (!document)
            {
                return null;
            }

            return new Role({
                id: document._id,
                name: document.name,
                permissions: document.permissions
            });
        }
        catch (error)
        {
            console.error(error);
            throw error;
        }
    }

    async deleteOne(id)
    {
        try
        {
            return RoleSchema.deleteOne({ _id: id });
        }
        catch (error)
        {
            console.error(error);
            throw error;
        }
    }
}

export default RoleMongooseRepository;
