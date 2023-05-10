import cartSchema from '../models/cartSchema.js';


class CartMongooseDao 
{
  async create(data) {
    try {
      const cartDocument = await cartSchema.create(data)

      return{
        id: cartDocument._id,
        products: cartDocument.products.map(product => ({
          product: product._id,
          quantity: product.quantity
        }))
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
        products: document.products.map(product => ({
          product: product._id,
          quantity: product.quantity
        }))
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
        products: cartDocument.products.map(product => ({
          product: product._id,
          quantity: product.quantity
        }))
      }

    } catch (error) {
      console.log('Error in getCartsById:', error);
      throw error
    }
  }

  async update(id, body) {
    try {
      const cartDocument = await cartSchema.findByIdAndUpdate(id, body, { new: true })

      return{
        id: cartDocument.id,
        products: cartDocument.products.map(product => ({
          product: product._id,
          quantity: product.quantity
        }))
      }
    } catch (error) {
      console.log('Error in updateCart:', error);
      throw error
    }
  } 

}

export default CartMongooseDao;