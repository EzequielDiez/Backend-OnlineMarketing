import CartManager from '../services/CartManager.js';

  export const getCarts = async (req, res) => {
    try {
      const manager = new CartManager();
      const carts = await manager.getAll();
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
  
      const productIndex = cart.products.findIndex((p) => p._id.toString() == pid);
  
      if (productIndex === -1) {
        cart.products.push({ _id: pid , quantity})
      } else {
        cart.products[productIndex].quantity += quantity;
      }
  
      await manager.update(cid, cart);
  
      res.send({ status: 'success', cart });
    } catch (error) {
      res.status(500).send('Error Server');
    }
  };

  export const deleteCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const manager = new CartManager();
      const result = await manager.deleteCart(cid)
      res.send({ status: 'success', result})
    } catch (error) {
      res.status(500).send('Error Server')
    }
  }

  export const deleteProductFromCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const manager = new CartManager();
      const result = await manager.deleteProductFromCart(cid, pid)
      res.send({ status: 'success', result})
    } catch (error) {
      res.status(500).send('Error Server')
    }
  }
