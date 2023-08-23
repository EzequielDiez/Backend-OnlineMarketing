import container from '../../container.js';

import { nanoid } from 'nanoid';

class TicketManager
{
    constructor()
    {
        this.ticketRepository = container.resolve('TicketRepository');
    }

    async paginate(criteria)
    {
        return this.ticketRepository.paginate(criteria);
    }

    async getOne(id)
    {
        return this.ticketRepository.getOne(id);
    }

    async create(data)
    {
        return await this.ticketRepository.create({ ...data, code: nanoid(15) });
    }

    async deleteOne(id)
    {
        return this.ticketRepository.deleteOne(id);
    }
}

export default TicketManager;
