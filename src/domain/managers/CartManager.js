import container from '../../container.js';
import { nanoid } from 'nanoid';
import EmailManager from './EmailManager.js';

class CartManager
{
    constructor()
    {
        this.cartRepository = container.resolve('CartRepository');
        this.productRepository = container.resolve('ProductRepository');
        this.ticketRepository = container.resolve('TicketRepository');
    }

    async create(data)
    {
        const result = await this.cartRepository.create(data);
        return result;
    }


    async paginate(criteria)
    {
        return await this.cartRepository.paginate(criteria);
    }


    async getOne(id)
    {
        return await this.cartRepository.getOne(id);
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
                throw new Error (`You can't add the same product you add: ${productInCart.product.title} - ${productInCart.product.code}`);
            }

            const newStock = productInCart.product.stock - productInCart.quantity;

            if (newStock < 0)
            {
                throw new Error(
                    `The product ${productInCart.product.title} - ${productInCart.product.code} doesn't have stock`
                );
            }

            total += productInCart.product.price * productInCart.quantity;

            await this.productRepository.update(productInCart.product.id, {
                stock: newStock,
                status: newStock > 0 ? true : false
            });
        }

        const code = nanoid(15);

        await EmailManager.sendEmail({
            templateFileName: 'ticketBuyTemplate.hbs',
            payload: {
                email: user,
                subject: 'Ticket de compra',
                code,
                total
            }
        });

        await this.cartRepository.deleteCart(cart.id);

        const ticket = await this.ticketRepository.create({
            code,
            date: new Date(),
            total,
            user
        });

        return ticket;
    }

    async update(data)
    {
        const { cid, pid } = await data;
        const productExist = await this.productRepository.getOne(pid);

        if (!productExist || !productExist.status)
        {
            throw new Error('Product not found');
        }

        const result = await this.cartRepository.update({ cid, pid });

        if (!result)
        {
            throw new Error('Cart not found');
        }

        return result;
    }

    async deleteCart(cartId)
    {
        await this.cartRepository.getOne(cartId);
        const { id } = await this.cartRepository.getOne(cartId);
        return this.cartRepository.deleteCart(cartId, { _id: id, products: [] });
    }
}

export default CartManager;
