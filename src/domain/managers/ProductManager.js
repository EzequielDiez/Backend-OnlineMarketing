import container from "../../container.js";

class ProductManager {
    constructor() {
        this.productRepository = container.resolve('ProductRepository');
    }

    async paginate(criteria) {
        return await this.productRepository.paginate(criteria);
    }

    async getOne(id) {
        return await this.productRepository.getOne(id);
    }

    async create(data) {
        return await this.productRepository.create(data);
    }

    async update(pid, update) {
        return await this.productRepository.update(pid, update, { new: true });
    }

    async delete(id) {
        return await this.productRepository.delete(id, { status: false }, { new: true });
    }
}

export default ProductManager;
