import cartSchema from '../models/cartSchema.js';
import userSchema from '../models/userSchema.js';
import User from '../../domain/entities/user.js';
import Role from '../../domain/entities/role.js';

class UserMongooseRepository
{
    async paginate(criteria)
    {
        try
        {
            const { limit, page } = criteria;
            const userDocuments = await userSchema.paginate({}, { limit, page });
            const { docs, ...pagination } = userDocuments;

            const users = docs.map(document => new User ({
                id: document._id,
                firstName: document.firstName,
                lastName: document.lastName,
                email: document.email,
                age: document.age,
                cart: document.cart,
                role: document.role,
                documents: document.documents,
                lastConnection: document.lastConnection
            }));

            return {
                users,
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
            const userDocument = await userSchema.findOne({ _id: id });

            if (!userDocument)
            {
                return null;
            }

            return new User ({
                id: userDocument?._id,
                firstName: userDocument?.firstName,
                lastName: userDocument?.lastName,
                email: userDocument?.email,
                age: userDocument?.age,
                cart: userDocument?.cart,
                role: userDocument?.role,
                documents: userDocument?.documents,
                lastConnection: userDocument?.lastConnection
            });
        }
        catch (error)
        {
            console.error(error);
            throw error;
        }
    }

    async getOneByEmail(email)
    {
        try
        {
            const userDocument = await userSchema.findOne({ email });

            if (!userDocument)
            {
                return null;
            }

            return new User ({
                id: userDocument?._id,
                firstName: userDocument?.firstName,
                lastName: userDocument?.lastName,
                email: userDocument?.email,
                age: userDocument?.age,
                cart: userDocument?.cart,
                role: userDocument.role,
                password: userDocument.password,
                documents: userDocument.documents,
                lastConnection: userDocument.lastConnection
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
            const userDocument = await userSchema.create(data);

            const cartDocument = await cartSchema.create({ products: [] });

            userDocument.cart = cartDocument._id;
            await userDocument.save();

            return new User ({
                id: userDocument._id,
                firstName: userDocument.firstName,
                lastName: userDocument.lastName,
                email: userDocument.email,
                age: userDocument.age,
                cart: userDocument.cart,
                role: userDocument.role,
                password: userDocument.password,
                documents: userDocument.documents,
                lastConnection: userDocument.lastConnection
            });
        }
        catch (error)
        {
            console.error(error);
            throw error;
        }
    }

    async update(data)
    {
        const { uid, update } = data;

        const userDoc = await userSchema.findByIdAndUpdate(uid, update, { new: true });

        return userDoc ? new User({
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            age: userDoc.age,
            role: userDoc.role ? new Role(userDoc.role) : null,
            password: userDoc.password,
            document: userDoc.documents,
            lastConnection: userDoc.lastConnection
        }) : null;
    }

    async deleteOne(id)
    {
        try
        {
            return userSchema.deleteOne({ _id: id });
        }
        catch (error)
        {
            console.error(error);
            throw error;
        }
    }
}

export default UserMongooseRepository;
