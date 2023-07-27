import cartSchema from '../models/cartSchema.js';
import Product from '../../domain/entities/product.js';
import Cart from '../../domain/entities/cart.js';

class CartMongooseRepository 
{
  async create(data) {
    try {
      const cartDocument = await cartSchema.create(data);

      return new Cart ({
        id: cartDocument._id,
        products: cartDocument.products.map(product => ({
          product: product._id,
          title: product.title,
          description: product.description,
          code: product.code,
          price: product.price,
          status: product.status,
          stock: product.stock,
          category: product.category,
          thumbnails: product.thumbnails,
          quantity: product.quantity
        }))
      })

    } catch (error) {
      console.log('Error in addCart:', error);
      throw error;
    }
  }

  async paginate(criteria) {
    try {
      const { limit, page } = criteria
      const cartDocuments = await cartSchema.paginate({}, {limit, page })
      const { docs, ...pagination } = cartDocuments

      const carts = docs.map((document) => {  
      return new Cart ({
        id: document._id,
        products: document.products.map(product => new Product ({
          product: product._id,
          title: product.title,
          description: product.description,
          code: product.code,
          price: product.price,
          status: product.status,
          stock: product.stock,
          category: product.category,
          thumbnails: product.thumbnails,
          quantity: product.quantity
        }))
      })})

      return {
        carts,
        pagination
      }

    } catch (error) {
      console.log('Error in getCarts:', error);
      throw error;
    }
  }

  async getOne(id) {
    try {
      console.log('Fetching cart by ID:', id);
      const cartDocument = await cartSchema.findById(id);
      console.log('Fetched cartDocument:', cartDocument);
  
      if (!cartDocument) {
        console.log('Cart not found');
        return null;
      }
  
      const cart = new Cart({
        id: cartDocument._id,
        products: cartDocument.products.map(product => ({
          product: product._id,
          title: product.title,
          description: product.description,
          code: product.code,
          price: product.price,
          status: product.status,
          stock: product.stock,
          category: product.category,
          thumbnails: product.thumbnails,
          quantity: product.quantity
        }))
      });
  
      console.log('Constructed cart:', cart);
      return cart;
    } catch (error) {
      console.log('Error in getCartsById:', error);
      throw error;
    }
  }

  async update(id, body) {
    try {
      const cartDocument = await cartSchema.findByIdAndUpdate(id, body, { new: true })

      return new Cart ({
        id: cartDocument.id,
        products: cartDocument.products.map(product => ({
          product: product._id,
          title: product.title,
          description: product.description,
          code: product.code,
          price: product.price,
          status: product.status,
          stock: product.stock,
          category: product.category,
          thumbnails: product.thumbnails,
          quantity: product.quantity
        }))
      })

    } catch (error) {
      console.log('Error in updateCart:', error);
      throw error
    }
  } 

  async deleteCart(id, cart) {
    try {
        const cartDocument = await cartSchema.findByIdAndUpdate({ _id: id }, cart, { new: true });
        return {
            _id: cartDocument._id
        }
    } catch (error) {
      console.log('Error in deleteCart:', error);
        throw error;
    }
  }

  async deleteProductFromCart(cid, newProducts) {
    try {
        const cartDocument = await cartSchema.findByIdAndUpdate({ _id: cid }, newProducts, { new: true });
        return new Cart ({
            _id: cartDocument._id,
            products: cartDocument.products.map(item => {
                return {
                    product: item._id,
                    quantity: item.quantity
                }
            })
        })
        
    } catch (error) {
        throw error;
    }
};

}

export default CartMongooseRepository;