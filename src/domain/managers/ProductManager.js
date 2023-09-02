import container from '../../container.js';

class ProductManager
{
    constructor()
    {
        this.productRepository = container.resolve('ProductRepository');
        this.roleRepository = container.resolve('RoleRepository');
    }

    async getAll(queryParams)
    {
        const { limit = 10, page = 1 } = queryParams;
        const result = await this.productRepository.getAll({
            limit: parseInt(limit, 10),
            page: parseInt(page, 10)
        });
        if (!result)
        {
            throw new Error ('No products found');
        }

        return result;
    }

    async getOne(id)
    {
        const result = await this.productRepository.getOne(id);

        if (!result)
        {
            throw new Error ('No product found');
        }

        return result;
    }

    async create(data)
    {
        const { product, user } = data;
        const owner = user.role.name === 'admin' ? 'admin' : user.email;
        const createdProduct = await this.productRepository.create({ ...product, owner });

        return createdProduct;
    }


    async update(pid, update)
    {
        return await this.productRepository.update(pid, update, { new: true });
    }

    async delete(data)
    {
        const { id, user } = data;

        const product = await this.productRepository.getOne(id);
        if (!product || !product.status)
        {
            throw new Error('Product not found');
        }

        if (user.role.name === 'admin' || (user.role.name === 'premium' && user.email === product.owner))
        {
        }
        else
        {
            throw new Error('This product can\'t be deleted');
        }

        const deletedProduct = await this.productRepository.delete(id, { status: false }, { new: true });

        return deletedProduct;
    }
}

export default ProductManager;
