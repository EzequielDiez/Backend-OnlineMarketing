import RoleSchema from "../models/roleSchema.js";

class RoleMongooseDao
{
    async paginate(criteria){
        try {
            const { limit, page } = criteria;
            const roleDocuments = await RoleSchema.paginate({}, { limit, page });

            roleDocuments.docs = roleDocuments.docs.map(document => ({
            id: document._id,
            name: document.name,
            permissions: document.permissions
            }));

            return roleDocuments;

        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getOne(id) {
        try {
            const roleDocument = await RoleSchema.findOne({ _id: id });

            if(!roleDocument) return null

            return {
                id: roleDocument?._id,
                name: roleDocument?.name,
                permissions: roleDocument?.permissions
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async create(data) {
        try {
            const roleDocument = await RoleSchema.create(data);

            return {
                id: roleDocument._id,
                name: roleDocument.name,
                permissions: roleDocument.permissions
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async updateOne(id, data) {
        try {
            const roleDocument = await RoleSchema.findOneAndUpdate({ _id: id }, data, { new: true});

            if(!roleDocument) return null

            return {
                id: roleDocument._id,
                name: roleDocument.name,
                permissions: roleDocument.permissions
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async deleteOne(id) {
        try {
            return RoleSchema.deleteOne({ _id: id });
        } catch (error) {
            console.error(error);
            throw error    
        }   
    }
}

export default RoleMongooseDao;