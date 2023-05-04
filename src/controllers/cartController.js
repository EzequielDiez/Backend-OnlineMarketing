import CartManager from '../services/CartManager.js';
import ProductManager from "../services/ProductManager.js";


  export const getCarts = async (req, res) => {

    const manager = new CartManager()
    const carts = await manager.getAll();
    console.log(carts);
    res.send({ status: 'success', carts})
    }

/*   CartRouter.post('/', async (req, res) => {
    try {
      const newCart = await cartManager.addCart();
      res.status(201).json({ cart: newCart });
    } catch (error) {
      console.log('Error in addCart:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  CartRouter.get('/:cid', async (req, res) => {
        
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(cartId);
    res.status(200).json(cart);
  });

  // Agregar un producto a un carrito
  CartRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    // Obtener el id del carrito y del producto
    const { cid, pid } = req.params;

    // Obtener el carrito y el producto
    const cart = await cartManager.getCartById(cid);
    const quantity = 1

    // Buscar si el producto ya existe en el carrito
    const productIndex = cart.products.findIndex(p => p.product === parseInt(pid));

    if (productIndex === -1) {
      // Si el producto no existe en el carrito, lo agregamos con quantity = 1
      cart.products.push({ product: parseInt(pid), quantity });
    } else {
      // Si el producto ya existe en el carrito, incrementamos quantity en 1
      cart.products[productIndex].quantity += quantity;
    }

    // Guardar el carrito actualizado en el archivo
    await cartManager.updateCart(cid, cart);

    res.json(cart);
  } catch (error) {
    res.status(500).send('Error Server');
  }
  }); */
