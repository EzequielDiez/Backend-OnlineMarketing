import container from '../../container.js';

import dayjs from 'dayjs';

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

    async changePremium(data) {
        try {
            console.log("data", data);
            /* const user = await this.userRepository.getOne(data.id);
    
             if (user.role === 'premium') {
                // Registro: El usuario ya es premium
                console.log('User is already premium');
                throw new Error('User is already premium');
            } 
    
            const role = await this.roleRepository.getOneByName('premium');
    
            const requiredDocs = ["dni", "address", "account"];
    
            const docsFilter = requiredDocs.map((requiredDoc) => user.documents.some((doc) => doc.name.includes(requiredDoc)));
    
            const userHasRequiredDocs = docsFilter.every((value) => value);
    
            if (!userHasRequiredDocs) {
                throw new Error("All documents are required.");
            }
    
            const result = await this.userRepository.update({ uid: user.id, update: { role: role.id } });
    
            return result; */ 
        } catch (error) {

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

        const user = await this.userRepository.getOne(id)

        if (!user) throw new Error('User not found')

        await this.userRepository.update(
            {
                uid: user.id,
                update: { documents: files.map((file) => ({ name: file.filename, reference: `public/images/${file.fieldname}`}))}
            }
        )

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

    async deleteInactives() {
        const usersPaginate = await this.userRepository.paginate({ limit: 500, page: 1 })
        const users = usersPaginate.users
        console.log("users", users);

        if (!users) throw new Error('Users not found')

        const dateNow = dayjs(Date.now())

        let deletedUsers = 0

        for (const user of users) {
            const dateLastConnection = dayjs(user.lastConnection)

            const inactiveDays = dateNow.diff(dateLastConnection, 'day')

            if (inactiveDays >= 10) {
                await this.userRepository.deleteOne(user.id)
                deletedUsers++
            }
        }

        return deletedUsers
    }
}

export default UserManager;
