import container from '../../container.js';
import { nanoid } from 'nanoid';
import EmailManager from './EmailManager.js';
import stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

class CartManager
{
    constructor()
    {
        this.cartRepository = container.resolve('CartRepository');
        this.productRepository = container.resolve('ProductRepository');
        this.ticketRepository = container.resolve('TicketRepository');
    }

    async getAll(queryParams)
    {
        const { limit = 10, page = 1 } = queryParams;

        const parsedLimit = parseInt(limit, 10);
        const parsedPage = parseInt(page, 10);

        if (isNaN(parsedLimit) || isNaN(parsedPage) || parsedLimit <= 0 || parsedPage <= 0)
        {
            throw new Error('Invalid pagination parameters');
        }

        const result = await this.cartRepository.getAll({
            limit: parsedLimit,
            page: parsedPage
        });
        if (!result)
        {
            throw new Error ('No carts found');
        }

        return result;
    }

    async getOne(id)
    {
        const result = await this.cartRepository.getOne(id);

        if (!result)
        {
            throw new Error ('No cart found');
        }

        return result;
    }

    async create(data)
    {
        const result = await this.cartRepository.create(data);
        return result;
    }

    async addOneProduct(data)
    {
        const { cid, pid } = data;

        const product = await this.productRepository.getOne(pid);

        if (!product || !product.status)
        {
            throw new Error('Product not found');
        }

        const cart = await this.cartRepository.getOne(cid);

        if (!cart)
        {
            throw new Error('Cart not found');
        }

        const productInCart = cart.products.find((item) => item.product.id === pid);

        if (productInCart)
        {
            productInCart.quantity += 1;
        }
        else
        {
            cart.products = [...cart.products, { product: pid, quantity: 1 }];
        }

        const newCart = cart.products.map(item => ({ product: item.product.id ?? item.product, quantity: item.quantity }));

        const result = await this.cartRepository.update({ cid, update: { products: newCart } });

        return result;
    }

    async updateOne(data)
    {
        const { cid, products } = data;

        for (const item of products)
        {
            const productExist = await this.productRepository.getOne(item.product);

            if (!productExist)
            {
                throw new Error('Product inside the cart not found');
            }
        }

        const result = await this.cartRepository.update({ cid, update: { products } });

        if (!result)
        {
            throw new Error('Cart not found');
        }

        return result;
    }

    async updateProduct(data)
    {
        const { cid, pid, quantity: newQuantity } = data;

        const product = await this.productRepository.getOne(pid);

        if (!product)
        {
            throw new Error('Product not found');
        }

        const cart = await this.cartRepository.getOne(cid);

        if (!cart)
        {
            throw new Error('Cart not found');
        }

        const productInCart = cart.products.find((item) => item.product.id === pid);

        if (!productInCart)
        {
            throw new Error('Product not found in cart');
        }

        productInCart.quantity = newQuantity;

        const newCart = cart.products.map(item => ({ product: item.product.id ?? item.product, quantity: item.quantity }));

        const result = await this.cartRepository.update({ cid, update: { products: newCart } });

        return result;
    }

    async createCheckout(data)
    {
        const { id, user } = data;
        const cart = await this.cartRepository.getOne(id);
        let total = 0;

        for (const productInCart of cart.products)
        {
            if (productInCart.product.owner === user)
            {
                throw new Error (`You can't add the same product you added: ${productInCart.product.title} - ${productInCart.product.code}`);
            }

            const newStock = productInCart.product.stock - productInCart.quantity;

            if (newStock < 0)
            {
                throw new Error(`The product ${productInCart.product.title} - ${productInCart.product.code} doesn't have stock`);
            }

            total += productInCart.product.price * productInCart.quantity;
        }

        const code = nanoid(15);

        const stripeSecretKey = process.env.STRIPE_PRIVATE_KEY;
        const stripeInstance = stripe(stripeSecretKey);

        try
        {
            const session = await stripeInstance.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: cart.products.map((productInCart) => ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: productInCart.product.title
                        },
                        unit_amount: productInCart.product.price * 100
                    },
                    quantity: productInCart.quantity
                })),
                mode: 'payment',
                success_url: 'https://tudominio.com/pago-exitoso',
                cancel_url: 'https://tudominio.com/pago-cancelado'
            });

            await EmailManager.sendEmail({
                templateFileName: 'ticketBuyTemplate.hbs',
                payload: {
                    email: user,
                    subject: 'Ticket de compra',
                    code,
                    total
                }
            });

            await this.cartRepository.deleteOneCart(cart.id);

            const ticket = await this.ticketRepository.create({
                code,
                date: new Date(),
                total,
                user
            });

            return {
                sessionId: session.id,
                ticket
            };
        }
        catch (error)
        {
            console.error('Error al crear la sesión de pago en Stripe:', error);
            throw error;
        }
    }

    async deleteProduct(data)
    {
        const { cid, pid } = data;

        const product = await this.productRepository.getOne(pid);

        if (!product)
        {
            throw new Error ('Product not found');
        }

        const cart = await this.cartRepository.getOne(cid);

        if (!cart)
        {
            throw new Error ('Cart not found');
        }

        const filter = cart.products.filter(item => item.product.id !== pid);

        cart.products = filter;

        const newCart = cart.products.map(item => ({ product: item.product.id ?? item.product, quantity: item.quantity }));

        const result = await this.cartRepository.update({ cid, update: { products: newCart } });

        return result;
    }

    async deleteOneCart(cid)
    {
        const result = await this.cartRepository.deleteOneCart(cid);

        if (!result)
        {
            throw new Error('Cart not found');
        }

        return result;
    }
}

export default CartManager;
