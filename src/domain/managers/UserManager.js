import container from '../../container.js';

class UserManager
{
    constructor()
    {
        this.userRepository = container.resolve('UserRepository');
        this.roleRepository = container.resolve('RoleRepository');
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

    async changePremium(id)
    {
        try
        {
            const role = await this.roleRepository.getOneByName('premium');
            console.log('role', role);

            const result = await this.userRepository.update({ uid: id, update: { role: role.id } });

            console.log('result', result);

            return result;
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

    async addDocuments(data)
    {
        const { id, files } = data

        if(!files) throw new Error("The files wasn't provided");

        const user = await this.userRepository.update(
            {
                uid: id,
                update: { documents: files.map((file) => ({ name: file.filename, reference: `public/images/${file.fieldname}`}))}
            }
        )
        if (!user) throw new Error('User not found')

        return true
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
