import container from '../../container.js';

import dayjs from 'dayjs';

class UserManager
{
    constructor()
    {
        this.userRepository = container.resolve('UserRepository');
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

        const result = await this.userRepository.getAll({
            limit: parsedLimit,
            page: parsedPage
        });
        if (!result)
        {
            throw new Error ('No users found');
        }

        return result;
    }

    async getOne(id)
    {
        const result = await this.userRepository.getOne(id);

        if (!result)
        {
            throw new Error ('No user found');
        }

        return result;
    }

    async getOneByEmail(email)
    {
        return this.userRepository.getOneByEmail(email);
    }

    async create(data)
    {
        const user = await this.userRepository.create(data);

        return { ...user, password: undefined };
    }

    async changePremium(data)
    {
        const user = await this.userRepository.getOne(data.id);

        if (user.role.name === 'premium')
        {
            throw new Error('User is already premium');
        }

        const role = await this.roleRepository.getOneByName('premium');

        const requiredDocs = ['dni', 'address', 'account'];

        const docsFilter = requiredDocs.map((requiredDoc) => user.documents.some((doc) => doc.name.includes(requiredDoc)));

        const userHasRequiredDocs = docsFilter.every((value) => value);

        if (!userHasRequiredDocs)
        {
            throw new Error('All documents are required.');
        }

        const result = await this.userRepository.update({ uid: user.id, update: { role: role.id } });

        return result;
    }

    async addDocuments(data)
    {
        const { id, files } = data;

        if (!files)
        {
            throw new Error('The files wasn\'t provided');
        }

        const user = await this.userRepository.getOne(id);

        if (!user)
        {
            throw new Error('User not found');
        }

        await this.userRepository.update(
            {
                uid: user.id,
                update: { documents: files.map((file) => ({ name: file.filename, reference: `public/images/${file.fieldname}` })) }
            }
        );

        return true;
    }

    async update(id, data)
    {
        return this.userRepository.update(id, data);
    }

    async deleteOne(id)
    {
        return this.userRepository.deleteOne(id);
    }

    async deleteInactives()
    {
        const usersPaginate = await this.userRepository.getAll({ limit: 500, page: 1 });
        const users = usersPaginate.users;

        if (!users)
        {
            throw new Error('Users not found');
        }

        const dateNow = dayjs(Date.now());

        let deletedUsers = 0;

        for (const user of users)
        {
            const dateLastConnection = dayjs(user.lastConnection);

            const inactiveDays = dateNow.diff(dateLastConnection, 'day');

            if (inactiveDays >= 10)
            {
                await this.userRepository.deleteOne(user.id);
                deletedUsers++;
            }
        }

        return deletedUsers;
    }
}

export default UserManager;
