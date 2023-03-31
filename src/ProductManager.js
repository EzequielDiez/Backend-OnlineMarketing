import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    try{
    const products = await this.getProducts();
    // Asignar un id autoincrementable
    let autoId = 0;
    if (products.length > 0) {
      autoId = products[products.length - 1].id;
    }
    product.id = autoId + 1;

    // Agregar el nuevo producto al array
    products.push(product);

    // Guardar los productos en el archivo
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

    return product.id;
    } catch (error) {
      console.log('Error in addProduct:', error);
      throw error
    }
  } 

  async getProducts(limit) {
    try {
      // Obtener los productos del archivo
      let products = [];
      if (fs.existsSync(this.path)) {
        const fileData = await fs.promises.readFile(this.path, 'utf8');
        products = JSON.parse(fileData);
      }

      // Aplicar el limite si esta presente
      if (limit) {
        products = products.slice(0, limit);
      }

      return products;
    } catch (error) {
      console.log('Error in getProducts:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();

      // Buscar el producto con el id especificado
      const product = products.find(p => p.id === parseInt(id));
  
      return product;

    } catch (error) {
      console.log('Error in getProductById:', error);
      throw error
    }
  }

  async updateProduct(id, update) {
    try {
      let products = await this.getProducts();

      const productIndex = products.findIndex(p => p.id === id);
  
      if (productIndex >= 0) {
        // Actualizar el producto con el nuevo contenido
        products[productIndex] = { ...products[productIndex], ...update };
  
        // Guardar los productos actualizados en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      }
  
      return productIndex >= 0;

    } catch (error) {
      console.log('Error in updateProduct:', error);
      throw error
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.getProducts();

      const productIndex = products.findIndex(p => p.id === id);
  
      if (productIndex >= 0) {
        // Eliminar el producto del arreglo
        products.splice(productIndex, 1);
  
        // Guardar los productos actualizados en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      }
  
      return productIndex >= 0;

    } catch (error) {
      console.log('Error in deleteProduct:', error);
      throw error
    }
  }
}


// Probando la funcionalidad del codigo. //

/* const productManager = new ProductManager('products.json'); */

/* // Algunos productos:
const product1 = { title: 'Template x9', description: 'Diseño de Feed x9 plantillas editables', price: 5000, thumbnail: '/producto1.jpg', code: 'TMP001', stock: 100};
const product2 = { title: 'Template x12', description: 'Diseño de Feed x12 plantillas editables', price: 6500, thumbnail: '/producto2.jpg', code: 'TMP002', stock: 100};
const product3 = { title: 'Template x15', description: 'Diseño de Feed x15 plantillas editables', price: 7500, thumbnail: '/producto3.jpg', code: 'TMP003', stock: 100};
 */
/* const testProductManager = async () => {
  console.log('Agregando productos...');
  const productId1 = await productManager.addProduct(product1);
  console.log(`Producto agregado con id ${productId1}`);
  const productId2 = await productManager.addProduct(product2);
  console.log(`Producto agregado con id ${productId2}`);
  const productId3 = await productManager.addProduct(product3);
  console.log(`Producto agregado con id ${productId3}`);

  // Obtener un producto por id
  console.log('Obteniendo producto por id...');
  const product = await productManager.getProductById(productId2);
  console.log(`Producto obtenido:`, product);

  // Actualizar un producto
  console.log('Actualizando producto...');
  const updatedProduct = { price: 7000 };
  const updated = await productManager.updateProduct(productId2, updatedProduct);
  if (updated) {
    console.log('Producto actualizado correctamente');
  } else {
    console.log('No se pudo actualizar el producto');
  }

  // Eliminar un producto
  console.log('Eliminando producto...');
  const deleted = await productManager.deleteProduct(productId1);
  if (deleted) {
    console.log('Producto eliminado correctamente');
  } else {
    console.log('No se pudo eliminar el producto');
  }

  // Obtener todos los productos
  console.log('Obteniendo todos los productos...');
  const allProducts = await productManager.getProducts();
  console.log(`Productos obtenidos:`, allProducts);
}

testProductManager(); */

export default ProductManager