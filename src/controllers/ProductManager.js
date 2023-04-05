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
  
      if(!product) return `No existe producto con id: ${id}` 
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

export default ProductManager