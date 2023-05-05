import CartManager from '../services/CartManager.js';

  export const getCarts = async (req, res) => {

    const manager = new CartManager()
    const carts = await manager.getAll();
    console.log(carts);
    res.send({ status: 'success', carts})
    }

  export const addCart = async (req, res) => {

    const manager = new CartManager()
    const newCart = await manager.create();
    res.send({ status: 'success', newCart });
    }

  export const getCartById = async (req, res) => {

    const cartId = req.params.cid;
    const manager = new CartManager()
    const cart = await manager.getOne(cartId);
    res.send({ status: 'success', cart });
  }

  export const updateCart = async (req, res) => {
  try {
    // Obtener el id del carrito y del producto
    const { cid, pid } = req.params;

    // Obtener el carrito y el producto
    const manager = new CartManager()
    const cart = await manager.getOne(cid);
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
    await manager.update(cid, cart);

    res.send({ status: 'success', cart });
  } catch (error) {
    res.status(500).send('Error Server');
  }
  }
