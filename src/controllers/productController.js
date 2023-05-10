import ProductManager from "../services/ProductManager.js";

export const getProducts = async (req, res) => {
        
    const limit = parseInt(req.query.limit) || 10
    const sort = req.query.sort
    const manager = new ProductManager()
    const products = await manager.getAll(limit, sort);
    res.send({ status: 'success', products });
};

export const getProductById = async (req, res) => {
    
    const productId = req.params.pid;
    const manager = new ProductManager()
    const product = await manager.getOne(productId);
    res.send({ status: 'success', product });
};

export const addProduct = async (req, res) => {
    
    try {
      const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  
      if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
        return res.status(400).json({ message: 'Faltan campos obligatorios.' });
      }
  
      const newProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
      };
      
      const manager = new ProductManager()
      const productId = await manager.create(newProduct);
      res.send({ status: 'success', productId, message: 'Product created.' })
    } catch (error) {
      console.log('Error in POST /api/products:', error);
      res.status(500).json({ message: 'Ocurrió un error al agregar el producto.' });
    }
};


export const updateProduct = async (req, res) => {
    
    try {
      const id = req.params.pid;
      const update = req.body;

      // No se debe actualizar el id del producto
      delete update.id;

      const manager = new ProductManager()
      const success = await manager.update(id, update);
  
      if (success) {
        res.send({ status: 'success', success, message: 'Product updated.' })
      } else {
        res.status(404).json({ message: 'Producto no encontrado.' });
      }
    } catch (error) {
      console.log('Error en PUT /:pid:', error);
      res.status(500).json({ message: 'Error al actualizar el producto.' });
    }
  };

export const deleteProduct = async (req, res) => {
    
    const productId = req.params.pid;

    try {
        const manager = new ProductManager()
      const productDeleted = await manager.delete(productId);

      if (productDeleted) {
        res.send({ status: 'success', message: 'Product deleted.' })
      } else {
        res.status(404).json({ message: `El producto con ID: ${productId} no fue encontrado.` });
      }
  
    } catch (error) {
      res.status(500).json({ message: 'Error Server' });
    }
  };