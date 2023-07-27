import CartManager from "../../domain/managers/CartManager.js";

  export const getCarts = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10
      const manager = new CartManager();
      const carts = await manager.paginate(limit);
      res.send({ status: 'success', carts });
    } catch (error) {
      res.status(500).send('Error Server');
    }
  };

  export const addCart = async (req, res) => {
    try {
      const manager = new CartManager();
      const newCart = await manager.create();
      res.status(201).send({ status: 'success', newCart, message: "Cart has been created successfully" });
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
  
  export const checkout = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { email } = req.user;
      const manager = new CartManager();
      const result = await manager.createCheckout({ id: cid, user: email });
      console.log("Checkout created:", result);
      res.status(200).send({ status: "success", data: result });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send("Error Server");
    }
  };

  export const updateCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;  
      const manager = new CartManager();
      const cart = await manager.getOne(cid);
      const quantity = 1;
      const productIndex = cart.products.findIndex((p) => p._id.toString() === pid);
  
      if (productIndex === -1) {
        cart.products.push({ _id: pid , quantity});
      } else {
        cart.products[productIndex].quantity += quantity;
      }
    
      await manager.update(cid, cart);
  
      res.status(200).send({ status: 'success', cart, message: "Product has been added to the cart successfully" });
    } catch (error) {
      res.status(500).send('Error Server');
    }
  };

  export const updateQuantityOnCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      
      const manager = new CartManager();
      const cart = await manager.getOne(cid);
      
      const productIndex = cart.products.findIndex((p) => p._id.toString() === pid);
      
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;
        const updatedCart = await manager.update(cid, cart);
        res.status(200).send({ status: 'success', cart: updatedCart, message: "Product inside the cart has been updated successfully" });
      } else {
        res.status(404).send('Product not found in cart');
      }
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };

  export const deleteCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const manager = new CartManager();
      const result = await manager.deleteCart(cid)
      res.status(200).send({ status: 'success', result, message: "Cart has been deleted successfully"})
    } catch (error) {
      res.status(500).send('Error Server')
    }
  }

  export const deleteProductFromCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      
      const manager = new CartManager();
      const cart = await manager.getOne(cid);
      
      const productIndex = cart.products.findIndex((p) => p._id.toString() === pid);
      
      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        const updatedCart = await manager.update(cid, cart);
        res.status(200).send({ status: 'success', cart: updatedCart, message: "Product inside the cart has been deleted successfully" });
      } else {
        res.status(404).send('Product not found in cart');
      }
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };
