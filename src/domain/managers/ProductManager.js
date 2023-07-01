import container from "../../container.js";

class ProductManager {

  constructor() {
    this.productRepository = container.resolve('ProductRepository')
  }

  async getAll(limit, sort) {
    try {
        let products = await this.productRepository.getAll(limit);
        if (sort === 'asc') {
          products = products.sort((a, b) => a.price - b.price)
        } else if (sort === 'desc') {
          products = products.sort((a, b) => b.price - a.price)
        }
        return products
    } catch (error) {
        throw error;
    }
  };

  async getOne(id) {
      try {
          return this.productRepository.getOne(id);
      } catch (error) {
          throw error;
      }
  };

  async create(data) {
      try {
          return this.productRepository.create(data);
      } catch (error) {
          throw error;
      }
  };

  async update(id, body) {
      try {
          return this.productRepository.update(id, body, { new: true });
      } catch (error) {
          throw error;
      }
  };

  async delete(id) {
      try {
          return this.productRepository.delete(id, { status: false }, { new: true });
      } catch (error) {
          throw error;
      }
  };
  }

export default ProductManager;