import cartSchema from '../models/cartSchema.js';
import Product from '../../domain/entities/product.js';
import Cart from '../../domain/entities/cart.js';
import ProductInCart from '../../domain/entities/productInCart.js';

class CartMongooseRepository
{
    async getAll(criteria)
    {
        const { limit, page } = criteria;
        const cartDocuments = await cartSchema.paginate({}, { limit, page });
        const { docs, ...pagination } = cartDocuments;

        const carts = docs.map((document) =>
        {
            return new Cart({
                id: document._id,
                products: document.products.map((product) => new Product({
                    id: product._id,
                    title: product.title,
                    description: product.description,
                    code: product.code,
                    price: product.price,
                    status: product.status,
                    stock: product.stock,
                    category: product.category,
                    thumbnails: product.thumbnails,
                    quantity: product.quantity
                }))
            });
        });

        return {
            carts,
            pagination
        };
    }

    async getOne(id)
    {
        const cartDocument = await cartSchema.findById(id);

        if (cartDocument)
        {
            const cart = new Cart({
                id: cartDocument._id,
                products: cartDocument.products.map((document) =>
                {
                    const productInCart = new ProductInCart({
                        id: document._id,
                        product: document.product ? new Product(document.product) : null,
                        quantity: document.quantity
                    });
                    return productInCart;
                })
            });
            return cart;
        }
        else
        {
            return null;
        }
    }

    async create(data)
    {
        const cartDoc = await cartSchema.create(data);
        const newCart = cartDoc
            ? new Cart({
                id: cartDoc._id,
                products: cartDoc.products
            })
            : null;
        return newCart;
    }

    async update(data)
    {
        const { cid, update } = data;

        const cartDoc = await cartSchema.findByIdAndUpdate(cid, update, { new: true });

        return cartDoc ? new Cart({
            id: cartDoc._id,
            products: cartDoc.products.map(doc => new ProductInCart(doc))
        }) : null;
    }

    async deleteProductFromCart(cid, newProducts)
    {
        const cartDocument = await cartSchema.findByIdAndUpdate({ _id: cid }, newProducts, { new: true });
        return new Cart({
            _id: cartDocument._id,
            products: cartDocument.products.map((item) => ({
                product: item._id,
                quantity: item.quantity
            }))
        });
    }

    async deleteOneCart(id)
    {
        const cartDoc = await cartSchema.findByIdAndRemove(id);

        return cartDoc ? true : null;
    }
}

export default CartMongooseRepository;
