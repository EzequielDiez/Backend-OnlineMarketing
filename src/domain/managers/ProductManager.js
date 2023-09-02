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

        const parsedLimit = parseInt(limit, 10);
        const parsedPage = parseInt(page, 10);

        if (isNaN(parsedLimit) || isNaN(parsedPage) || parsedLimit <= 0 || parsedPage <= 0) {
            throw new Error('Invalid pagination parameters');
        }

        const result = await this.productRepository.getAll({
            limit: parsedLimit,
            page: parsedPage
        });
        if (!result) throw new Error ('No products found');

        return result;
    }

    async getOne(id)
    {
        const result = await this.productRepository.getOne(id);

        if (!result) throw new Error ('No product found');

        return result;
    }

    async create(data)
    {
        const { product, user } = data;
        const owner = user.role.name === 'admin' ? 'admin' : user.email;
        const result = await this.productRepository.create({ ...product, owner });

        return result;
    }


    async update(data)
    {
        const { pid, user, ...update } = data

        const product = await this.productRepository.getOne(pid)

        if (!(user.role.name === 'admin' || (user.role.name === 'premium' && user.email === product.owner))) throw new Error("Unauthorized");

        const result = await this.productRepository.update(pid, update, { new: true });
        
        if(!result) throw new Error ('Product not updated')

        return result
    }

    async delete(data)
    {
        const { id, user } = data;

        const product = await this.productRepository.getOne(id);

        if (!product || !product.status) throw new Error('Product not found');

        if (!(user.role.name === 'admin' || (user.role.name === 'premium' && user.email === product.owner))) throw new Error("Unauthorized");

        const result = await this.productRepository.delete(id, { status: false }, { new: true });
        
        return result;
    }
}

export default ProductManager;
