import CartManager from '../services/CartManager.js';

  export const getCarts = async (req, res) => {
    try {
      const manager = new CartManager();
      const carts = await manager.getAll();
      console.log(carts);
      res.send({ status: 'success', carts });
    } catch (error) {
      res.status(500).send('Error Server');
    }
  };

  export const addCart = async (req, res) => {
    try {
      const manager = new CartManager();
      const newCart = await manager.create();
      res.send({ status: 'success', newCart });
    } catch (error) {
      res.status(500).send('Error Server');
    }
  };

  export const getCartById = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const manager = new CartManager();
      const cart = await manager.getOne(cartId);
      res.send({ status: 'success', cart });
    } catch (error) {
      res.status(500).send('Error Server');
    }
  };
  

  export const updateCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const manager = new CartManager();
      const cart = await manager.getOne(cid);
      const quantity = 1;
  
      const productIndex = cart.products.findIndex((p) => p.product === parseInt(pid));
  
      if (productIndex === -1) {
        cart.products.push({ product: parseInt(pid), quantity });
      } else {
        cart.products[productIndex].quantity += quantity;
      }
  
      await manager.update(cid, cart);
  
      res.send({ status: 'success', cart });
    } catch (error) {
      res.status(500).send('Error Server');
    }
  };
