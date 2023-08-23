import ProductManager from '../../domain/managers/ProductManager.js';


export const getProducts = async(req, res) =>
{
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;
    const manager = new ProductManager();

    try
    {
        const criteria = {
            limit,
            page
        };

        const paginatedProducts = await manager.paginate(criteria);
        res.send({ status: 'success', ...paginatedProducts });
    }
    catch (error)
    {
        res.status(500).send({ status: 'error', message: 'Internal Server Error' });
    }
};

export const getProductById = async(req, res) =>
{
    try
    {
        const productId = req.params.pid;
        const manager = new ProductManager();
        const product = await manager.getOne(productId);

        if (product)
        {
            res.status(200).json({ status: 'success', product, message: 'Product found.' });
        }
        else
        {
            res.status(404).json({ message: 'Product not found.' });
        }
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error Server' });
    }
};

export const addProduct = async(req, res) =>
{
    try
    {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails)
        {
            return res.status(400).json({ message: 'Missing required fields.' });
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

        const manager = new ProductManager();
        const productId = await manager.create(newProduct);
        res.status(201).json({ status: 'success', productId, message: 'Product created.' });
    }
    catch (error)
    {
        console.log('Error in POST /api/products:', error);
        res.status(500).json({ message: 'Ocurrió un error al agregar el producto.' });
    }
};


export const updateProduct = async(req, res) =>
{
    try
    {
        const pid = req.params.pid;
        const update = req.body;

        delete update.id;

        const manager = new ProductManager();
        const success = await manager.update(pid, update);

        if (success)
        {
            res.status(200).json({ status: 'success', success, message: 'Product updated.' });
        }
        else
        {
            res.status(404).json({ message: 'Producto no encontrado.' });
        }
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error al actualizar el producto.' });
    }
};


export const deleteProduct = async(req, res) =>
{
    const productId = req.params.pid;

    try
    {
        const manager = new ProductManager();
        const productDeleted = await manager.delete(productId);

        if (productDeleted)
        {
            res.send({ status: 'success', message: 'Product deleted.' });
        }
        else
        {
            res.status(404).json({ message: `El producto con ID: ${productId} no fue encontrado.` });
        }
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error Server' });
    }
};
