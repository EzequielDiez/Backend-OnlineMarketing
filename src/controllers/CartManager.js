import fs from 'fs';

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async addCart() {
    try {
      const carts = await this.getCarts();
        // Asignar un id autoincrementable  
      let autoId = 0;
      if (carts.length > 0) {
        autoId = carts[carts.length - 1].id;
      }
      const newCart = { id: autoId + 1, products: [] };

      // Agregar el nuevo producto al array
      carts.push(newCart);

      // Guardar los productos en el archivo      
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

      return newCart;
    } catch (error) {
      console.log('Error in addCart:', error);
      throw error;
    }
  }

  async getCarts() {
    try {
      // Obtener los productos del archivo, si no existe, lo crea.
      let carts = [];
      if (fs.existsSync(this.path)) {
        const fileData = await fs.promises.readFile(this.path, 'utf8');
        carts = JSON.parse(fileData);
      } else {
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
      }
  
      return carts;
    } catch (error) {
      console.log('Error in getCarts:', error);
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