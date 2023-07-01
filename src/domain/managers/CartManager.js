import container from "../../container.js";

class CartManager {
  constructor() {
    this.cartRepository = container.resolve('CartRepository');
  }

  async create(data) {
    try {
      return await this.cartRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.cartRepository.getAll();
    } catch (error) {
      throw error;
    }
  }

  async getOne(id) {
    try {
      return await this.cartRepository.getOne(id)
    } catch (error) {
      throw error
    }
  }

  async update(id, body) {
    try {
      return await this.cartRepository.update(id, body)
    } catch (error) {
      throw error
    }
  }

  async deleteCart(cartId) {
    try {
      await this.cartRepository.getOne(cartId)

      const { id } = await this.cartRepository.getOne(cartId)
      return this.cartRepository.deleteCart(cartId, { _id: id, products: []})
    } catch (error) {
      throw error
    }
  }
}

export default CartManager;