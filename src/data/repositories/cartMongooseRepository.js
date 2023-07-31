import cartSchema from '../models/cartSchema.js';
import Product from '../../domain/entities/product.js';
import Cart from '../../domain/entities/cart.js';
import ProductInCart from '../../domain/entities/productInCart.js';

class CartMongooseRepository {
    async create(data) {
        try {
            const cartDoc = await cartSchema.create(data);
            const newCart = cartDoc
                ? new Cart({
                      id: cartDoc._id,
                      products: cartDoc.products,
                  })
                : null;
            return newCart;
        } catch (error) {
            throw error;
        }
    }

    async paginate(criteria) {
        try {
            const { limit, page } = criteria;
            const cartDocuments = await cartSchema.paginate({}, { limit, page });
            const { docs, ...pagination } = cartDocuments;

            const carts = docs.map((document) => {
                return new Cart({
                    id: document._id,
                    products: document.products.map((product) => new Product({
                        product: product._id,
                        title: product.title,
                        description: product.description,
                        code: product.code,
                        price: product.price,
                        status: product.status,
                        stock: product.stock,
                        category: product.category,
                        thumbnails: product.thumbnails,
                        quantity: product.quantity,
                    })),
                });
            });

            return {
                carts,
                pagination,
            };
        } catch (error) {
            throw error;
        }
    }

    async getOne(id) {
        const cartDocument = await cartSchema.findById(id);

        if (cartDocument) {
            const cart = new Cart({
                id: cartDocument._id,
                products: cartDocument.products.map((document) => {
                    const productInCart = new ProductInCart({
                        id: document._id,
                        product: document.product ? new Product(document.product) : null,
                        quantity: document.quantity,
                    });
                    return productInCart;
                }),
            });
            return cart;
        } else {
            return null;
        }
    }

    async update(data) {
        const { cid, pid } = data;

        const cartDoc = await cartSchema.findById(cid);

        if (!cartDoc) {
            return null;
        }

        const productInCart = cartDoc.products.find((item) => item.product.id === pid);

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cartDoc.products = [...cartDoc.products, { product: pid, quantity: 1 }];
        }

        const newCartDoc = await cartSchema.findByIdAndUpdate(cid, cartDoc, { new: true });

        if (newCartDoc) {
            return new Cart({
                id: newCartDoc._id,
                products: newCartDoc.products.map((doc) => new ProductInCart({
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                })),
            });
        } else {
            return null;
        }
    }

    async deleteCart(id, cart) {
        try {
            const cartDocument = await cartSchema.findByIdAndUpdate({ _id: id }, cart, { new: true });
            return {
                _id: cartDocument._id,
            };
        } catch (error) {
            throw error;
        }
    }

    async deleteProductFromCart(cid, newProducts) {
        try {
            const cartDocument = await cartSchema.findByIdAndUpdate({ _id: cid }, newProducts, { new: true });
            return new Cart({
                _id: cartDocument._id,
                products: cartDocument.products.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                })),
            });
        } catch (error) {
            throw error;
        }
    }
}

export default CartMongooseRepository;
