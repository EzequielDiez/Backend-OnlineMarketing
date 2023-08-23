import container from '../../container.js';

class UserManager
{
    constructor()
    {
        this.userRepository = container.resolve('UserRepository');
    }

    async paginate(criteria)
    {
        try
        {
            return this.userRepository.paginate(criteria);
        }
        catch (error)
        {
            throw error;
        }
    }

    async getOneByEmail(email)
    {
        try
        {
            return this.userRepository.getOneByEmail(email);
        }
        catch (error)
        {
            throw error;
        }
    }

    async getOne(id)
    {
        try
        {
            return this.userRepository.getOne(id);
        }
        catch (error)
        {
            throw error;
        }
    }

    async create(data)
    {
        try
        {
            const user = await this.userRepository.create(data);

            return { ...user, password: undefined };
        }
        catch (error)
        {
            throw error;
        }
    }

    async updateOne(id, data)
    {
        try
        {
            return this.userRepository.updateOne(id, data);
        }
        catch (error)
        {
            throw error;
        }
    }

    async deleteOne(id)
    {
        try
        {
            return this.userRepository.deleteOne(id);
        }
        catch (error)
        {
            throw error;
        }
    }
}

export default UserManager;
