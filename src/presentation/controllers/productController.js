import ProductManager from '../../domain/managers/ProductManager.js';


class ProductController {

    static getProducts = async (req, res, next) => {
        try {
            const manager = new ProductManager();
            const paginatedProducts = await manager.getAll(req.query);
            res.status(200).send({ status: "success", ...paginatedProducts });
        } catch (error) {
            next(error);
        }
    };

    static getProductById = async (req, res, next) => {
        try {
            const manager = new ProductManager();
            const product = await manager.getOne(req.params.pid);
            res.status(200).json({ status: 'success', product, message: 'Product found.'});
        } catch (error) {
            next(error)
        }
    }
}

export default ProductController

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
        const productId = await manager.create({ product: newProduct, user: req.user }); // newProduct
        console.log('productId', productId);
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
        const productDeleted = await manager.delete({ id: productId, user: req.user });

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