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

  async getCartById(id) {
    try {
      const carts = await this.getCarts();

      // Buscar el producto con el id especificado
      const cart = carts.find(c => c.id === parseInt(id));
  
      if(!cart) return `No existe producto con id: ${id}` 
      return cart;

    } catch (error) {
      console.log('Error in getCartsById:', error);
      throw error
    }
  }

  async updateCart(id, update) {
    try {
      let carts = await this.getCarts();
  
      const cartIndex = carts.findIndex(c => c.id === parseInt(id));
    
      if (cartIndex >= 0) {
        // Actualizar el carrito con el nuevo contenido
        carts[cartIndex] = { ...carts[cartIndex], ...update };
    
        // Guardar los carritos actualizados en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      }
    
      return cartIndex >= 0;
  
    } catch (error) {
      console.log('Error in updateCart:', error);
      throw error
    }
  }

}

export default CartManager;