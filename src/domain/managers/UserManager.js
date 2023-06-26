import UserMongooseDao from "../../data/daos/userMongooseDao.js";

class UserManager {

    constructor() {
        this.userDao = new UserMongooseDao();
    }

    async paginate(criteria) {
        try {
            return this.userDao.paginate(criteria);
        } catch (error) {
            throw error
        }    
    }

    async getOneByEmail(email) {
        try {
            return this.userDao.getOneByEmail(email);        
        } catch (error) {
            throw error
        }
    }
  
    async getOne(id) {
        try {
            return this.userDao.getOne(id);    
        } catch (error) {
            throw error
        }
    }

    async create(data) {
        try {
            const user = await this.userDao.create(data);

            return { ...user, password: undefined };    
        } catch (error) {
            throw error
        }
    }

    async updateOne(id, data) {
        try {
            return this.userDao.updateOne(id, data);    
        } catch (error) {
            throw error
        }
    }

    async deleteOne(id) {
        try {
            return this.userDao.deleteOne(id);    
        } catch (error) {
            throw error
        }
    }
}

export default UserManager;