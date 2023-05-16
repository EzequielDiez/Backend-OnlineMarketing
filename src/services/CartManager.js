import CartMongooseDao from '../daos/cartMongooseDaos.js';

class CartManager {
  constructor() {
    this.dao = new CartMongooseDao;
  }

  async create(data) {
    try {
      return await this.dao.create(data);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw error;
    }
  }

  async getOne(id) {
    try {
      return await this.dao.getOne(id)
    } catch (error) {
      throw error
    }
  }

  async update(id, body) {
    try {
      return await this.dao.update(id, body)
    } catch (error) {
      throw error
    }
  }

  async deleteCart(cartId) {
    try {
      await this.dao.getOne(cartId)

      const { id } = await this.dao.getOne(cartId)
      return this.dao.deleteCart(cartId, { _id: id, products: []})
    } catch (error) {
      throw error
    }
  }
}

export default CartManager;