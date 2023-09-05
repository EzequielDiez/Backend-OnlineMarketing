import RoleSchema from '../models/roleSchema.js';
import Role from '../../domain/entities/role.js';

class RoleMongooseRepository
{
    async getAll(criteria)
    {
        const { limit, page } = criteria;
        const roleDocuments = await RoleSchema.paginate({}, { limit, page });
        const { docs, ...paginationInfo } = roleDocuments;

        const roles = docs.map(document => new Role ({
            id: document._id,
            name: document.name,
            permissions: document.permissions
        }));

        return {
            roles,
            paginationInfo
        };
    }

    async getOne(id)
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

    async getOneByName(data)
    {
        const document = await RoleSchema.findOne({ name: data });

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

    async create(data)
    {
        const document = await RoleSchema.create(data);

        return new Role({
            id: document._id,
            name: document.name,
            permissions: document.permissions
        });
    }

    async updateOne(id, data)
    {
        const document = await RoleSchema.findOneAndUpdate({ _id: id }, data, { new: true });

        return new Role({
            id: document._id,
            name: document.name,
            permissions: document.permissions
        });
    }

    async deleteOne(id)
    {
        return RoleSchema.deleteOne({ _id: id });
    }
}

export default RoleMongooseRepository;
