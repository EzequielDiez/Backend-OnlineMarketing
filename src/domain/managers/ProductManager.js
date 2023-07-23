import container from "../../container.js";

class ProductManager {

    constructor() {
      this.productRepository = container.resolve('ProductRepository');
    }
  
    async paginate(criteria) {
      try {
        let products = await this.productRepository.paginate(criteria);
        return products;
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