import cartSchema from "../models/cartSchema.js";
import userSchema from "../models/userSchema.js";

class UserMongooseDao
{
    async paginate(criteria){
        try {
            const { limit, page } = criteria;
            const userDocuments = await userSchema.paginate({}, { limit, page });

            userDocuments.docs = userDocuments.docs.map(document => ({
            id: document._id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            cart: document.cart,
            role: document.role,
            }));

            return userDocuments;

        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getOne(id) {
        try {
            const userDocument = await userSchema.findOne({ _id: id });

            if(!userDocument) return null

            return {
                id: userDocument?._id,
                firstName: userDocument?.firstName,
                lastName: userDocument?.lastName,
                email: userDocument?.email,
                age: userDocument?.age,
                cart: userDocument?.cart,
                role: userDocument?.role,              
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async getOneByEmail(email) {
        try {
            const userDocument = await userSchema.findOne({ email });

            if(!userDocument) return null

            return {
                id: userDocument?._id,
                firstName: userDocument?.firstName,
                lastName: userDocument?.lastName,
                email: userDocument?.email,
                age: userDocument?.age,
                cart: userDocument?.cart,
                role: userDocument.role,
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async create(data) {
        try {
            const userDocument = await userSchema.create(data);

            const cartDocument = await cartSchema.create({ products: [] })
            
            userDocument.cart = cartDocument._id
            await userDocument.save()

            return {
                id: userDocument._id,
                firstName: userDocument.firstName,
                lastName: userDocument.lastName,
                email: userDocument.email,
                age: userDocument.age,
                cart: userDocument.cart,
                role: userDocument.role,
                password: userDocument.password,
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async updateOne(id, data) {
        try {
            const userDocument = await userSchema.findOneAndUpdate({ _id: id }, data, { new: true});

            if(!userDocument) return null

            return {
                id: userDocument._id,
                firstName: userDocument.firstName,
                lastName: userDocument.lastName,
                email: userDocument.email,
                age: userDocument.age,
                cart: userDocument.cart,
                role: userDocument.role,
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async deleteOne(id) {
        try {
            return userSchema.deleteOne({ _id: id });
        } catch (error) {
            console.error(error);
            throw error    
        }   
    }
}

export default UserMongooseDao;