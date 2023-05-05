import fs from 'fs';
import CartMongooseDao from '../daos/cartMongooseDaos.js';

class CartManager {
  constructor() {
    this.dao = new CartMongooseDao;
  }

  async create(data) {
    try {
      return this.dao.create(data);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return this.dao.getAll();
    } catch (error) {
      throw error;
    }
  }

  async getOne(id) {
    try {
      return this.dao.getOne(id)
    } catch (error) {
      throw error
    }
  }

  async update(id, body) {
    try {
      return this.dao.update(id, body, { new: true })
    } catch (error) {
      throw error
    }
  }
}

export default CartManager;