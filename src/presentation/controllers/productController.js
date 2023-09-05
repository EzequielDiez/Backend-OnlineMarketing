import ProductManager from '../../domain/managers/ProductManager.js';


class ProductController {

    static getProducts = async (req, res, next) => {
        try {
            const productManager = new ProductManager();
            const paginatedProducts = await productManager.getAll(req.query);
            res.status(200).send({ status: "success", ...paginatedProducts });
        } catch (error) {
            next(error);
        }
    };

    static getProductById = async (req, res, next) => {
        try {
            const productManager = new ProductManager();
            const product = await productManager.getOne(req.params.pid);
            res.status(200).send({ status: 'success', product, message: 'Product found.'});
        } catch (error) {
            next(error)
        }
    }

    static postProduct = async (req, res, next) => {
        try {
            const productManager = new ProductManager()
            await productManager.create({ product: req.body, user: req.user })
            res.status(201).send({ status: 'success', message: 'Product created.'})
        } catch (error) {
            next(error)
        }
    }

    static putProduct = async (req, res, next) => {
        try {
            const productManager = new ProductManager()
            const result = await productManager.update({ ...req.params, ...req.body, user: req.user})
            res.status(200).send({ status: 'success', message: 'Product updated.', result })
        } catch (error) {
            next(error)
        }
    }

    static deleteProduct = async (req, res, next) => {
        try {
            const { pid } = req.params
            const productManager = new ProductManager()
            await productManager.delete({ id: pid, user: req.user})
            res.status(200).send({ status: 'success', message: 'Product deleted'})
        } catch (error) {
            next(error)
        }
    }
}

export default ProductController