import container from '../../container.js';

class ProductManager
{
    constructor()
    {
        this.productRepository = container.resolve('ProductRepository');
        this.roleRepository = container.resolve('RoleRepository');
    }

    async paginate(criteria)
    {
        return await this.productRepository.paginate(criteria);
    }

    async getOne(id)
    {
        return await this.productRepository.getOne(id);
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
        if (!product)
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
