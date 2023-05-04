import fs from 'fs';
import cartSchema from '../models/cartSchema.js';


class CartMongooseDao 
{
  async create(data) {
    try {
      const cartDocument = await cartSchema.create(data)

      return{
        id: cartDocument._id,
        products: [{
          productId: cartDocument.productId,
          quantity: cartDocument.quantity
        }]
      }
    } catch (error) {
      console.log('Error in addCart:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      const cartsDocument = await cartSchema.find()

      return cartsDocument.map(document => ({
        id: document._id,
        products: [{
          productId: document.productId,
          quantity: document.quantity
        }]
      }))

    } catch (error) {
      console.log('Error in getCarts:', error);
      throw error;
    }
  }

  async getOne(id) {
    try {
      const cartDocument = await cartSchema.findById(id)
      if (!cartDocument) return null

      return{
        id: cartDocument._id,
        products: [{
          productId: cartDocument.productId,
          quantity: cartDocument.quantity
        }]
      }

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

export default CartMongooseDao;