import container from "../../container.js";

class CartManager {
  constructor() {
    this.cartRepository = container.resolve('CartRepository');
    this.productRepository = container.resolve('ProductRepository')
    this.ticketRepository = container.resolve('TicketRepository')
  }

  async create(data) {
    try {
      return await this.cartRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  async paginate(limit) {
    try {
      return await this.cartRepository.paginate(limit);
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

/*   async createCheckout(data)
  {
    const { id, user } = data
    const cart = await this.cartRepository.getOne(id)
    let total = 0

    for (const productInCart of cart.products) 
    {
      const newStock = productInCart.product.stock - productInCart.quantity

      if ( newStock < 0 ) throw new Error(`The product ${productInCart.product.title} - ${productInCart.product.code} doesn't have stock`)
      
      total += productInCart.product.price * productInCart.quantity

      await this.productRepository.update(productInCart.product.id, { stock: newStock, status: newStock > 0 ? true : false})
    }

    const code = nanoid(15)

    return await this.ticketRepository.save({
      code,
      date: new Date(),
      total,
      user
    })
  } */

  async createCheckout(data) {
    console.log('Entering createCheckout function');
    
    const { id, user } = data;
    console.log('Data:', data);
    
    const cart = await this.cartRepository.getOne(id);
    console.log('Cart:', cart);
    
    let total = 0;
    
    for (const productInCart of cart.products) {
      console.log('Processing product:', productInCart.product);
      
      const newStock = productInCart.product.stock - productInCart.quantity;
      
      if (newStock < 0) {
        throw new Error(`The product ${productInCart.product.title} - ${productInCart.product.code} doesn't have stock`);
      }
      
      console.log('New stock:', newStock);
      
      total += productInCart.product.price * productInCart.quantity;
      
      await this.productRepository.update(productInCart.product.id, { stock: newStock, status: newStock > 0 ? true : false});
      console.log('Product updated:', productInCart.product);
    }
    
    const code = nanoid(15);
    
    const ticketData = {
      code,
      date: new Date(),
      total,
      user
    };
    
    console.log('Ticket data:', ticketData);
    
    const ticket = await this.ticketRepository.save(ticketData);
    console.log('Ticket saved:', ticket);
    
    console.log('Exiting createCheckout function');
    
    return ticket;
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