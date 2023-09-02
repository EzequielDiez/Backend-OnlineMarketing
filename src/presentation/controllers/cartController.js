import CartManager from '../../domain/managers/CartManager.js';

class CartController {

    static getCarts = async(req, res, next) => {
        try {
            const cartManager = new CartManager();
            const paginatedCarts = await cartManager.getAll(req.query);
            res.status(200).send({ status: "success", ...paginatedCarts });
        } catch (error) {
            next(error);
        }
    }

    static getCartById = async(req, res, next) => {
        try {
            const cartManager = new CartManager();
            const cart = await cartManager.getOne(req.params.cid);
            res.status(200).send({ status: 'success', cart, message: 'Cart found.'});
        } catch (error) {
            next(error)
        }
    }

    static postCart = async(req, res, next) => {
        try {
            const cartManager = new CartManager();
            const newCart = await cartManager.create();
            res.status(201).send({ status: 'success', newCart, message: 'Cart has been created'});
        } catch (error) {
            next(error)
        }
    }

    static postProductInCart = async(req, res, next) => {
        try {
            const cartManager = new CartManager();
            const result = await cartManager.addOneProduct(req.params);
            res.status(200).send({ status: 'success', message: 'Product has been added to the cart', data: result });
        } catch (error) {
            next(error)
        }
    }

    static updateCart = async(req, res, next) => {
        try {
            const cartManager = new CartManager();
            const result = await cartManager.updateOne({ ...req.params, ...req.body });
            res.status(200).send({ status: 'success', message: 'Cart has been updated', data: result });
        } catch (error) {
            next(error)
        }
    }

    static updateProductInCart = async(req, res, next) => {
        try {
            const cartManager = new CartManager();
            const result = await cartManager.updateProduct({ ...req.params, ...req.body });
            res.status(200).send({ status: "success", message: "Product inside the cart has been updated", data: result });
        } catch (error) {
            next(error)
        }
    }

    static checkout = async(req, res, next) => {
        try {
            const { cid } = req.params;
            const { email } = req.user;
            const cartManager = new CartManager();
            const result = await cartManager.createCheckout({ id: cid, user: email });
            res.status(200).send({ status: 'success', message: 'Your purchase has been processed', data: result });
        } catch (error) {
            next(error)
        }
    }

    static deleteProductFromCart = async(req, res, next) => {
        try {
            const cartManager = new CartManager()
            const result = await cartManager.deleteProduct(req.params)
            res.status(200).send({ status: 'success', message: 'Product inside the cart has been deleted', data: result})
        } catch (error) {
            next(error)
        }
    }

    static deleteCart = async(req, res, next) => {
        try {
            const { cid } = req.params;
            const cartManager = new CartManager();
            await cartManager.deleteOneCart(cid);
            res.status(200).send({ status: 'success', message: 'Cart has been deleted' });
        } catch (error) {
            next(error)
        }
    }
}

export default CartController
