import container from '../../container.js';

class RoleManager
{
    constructor()
    {
        this.roleRepository = container.resolve('RoleRepository');
    }

    async getAll(queryParams)
    {
        const { limit = 10, page = 1 } = queryParams;

        const parsedLimit = parseInt(limit, 10);
        const parsedPage = parseInt(page, 10);

        if (isNaN(parsedLimit) || isNaN(parsedPage) || parsedLimit <= 0 || parsedPage <= 0)
        {
            throw new Error('Invalid pagination parameters');
        }

        const result = await this.roleRepository.getAll({
            limit: parsedLimit,
            page: parsedPage
        });
        if (!result)
        {
            throw new Error ('No roles found');
        }

        return result;
    }

    async getOne(id)
    {
        const result = await this.roleRepository.getOne(id);

        if (!result)
        {
            throw new Error ('No role found');
        }

        return result;
    }

    async getOneByName(data)
    {
        const result = await this.roleRepository.getOneByName(data);

        if (!result)
        {
            throw new Error ('No role name found');
        }

        return result;
    }

    async create(data)
    {
        const result = await this.roleRepository.create(data);

        if (!result)
        {
            throw new Error ('The role was not created');
        }

        return result;
    }

    async updateOne(id, data)
    {
        const result = this.roleRepository.updateOne(id, data);

        if (!result)
        {
            throw new Error ('The role was not updated');
        }

        return result;
    }

    async deleteOne(id)
    {
        const result = this.roleRepository.deleteOne(id);

        if (!result)
        {
            throw new Error ('The role was not deleted');
        }

        return result;
    }
}

export default RoleManager;
