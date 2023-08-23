import Ticket from '../../domain/entities/ticket.js';
import ticketSchema from '../models/ticketSchema.js';


class TicketMongooseRepository
{
    async paginate(criteria)
    {
        try
        {
            const { limit, page } = criteria;
            const ticketDocuments = await ticketSchema.paginate({}, { limit, page });
            const { docs, ...pagination } = ticketDocuments;

            const tickets = docs.map(document => new Ticket ({
                id: document._id,
                code: document.code,
                date: document.date,
                total: document.total,
                user: document.user
            }));

            return {
                tickets,
                pagination
            };
        }
        catch (error)
        {
            console.error(error);
            throw error;
        }
    }

    async getOne(id)
    {
        try
        {
            const ticketDocument = await ticketSchema.findById(id);
            if (!ticketDocument)
            {
                return null;
            }

            return new Ticket ({
                id: ticketDocument._id,
                code: ticketDocument.code,
                date: ticketDocument.date,
                total: ticketDocument.total,
                user: ticketDocument.user
            });
        }
        catch (error)
        {
            console.error(error);
            throw error;
        }
    }

    async create(data)
    {
        const ticketDoc = await ticketSchema.create(data);

        return ticketDoc ? new Ticket({
            id: ticketDoc._id,
            code: ticketDoc.code,
            date: ticketDoc.date,
            total: ticketDoc.total,
            user: ticketDoc.user
        }) : null;
    }

    async deleteOne(id)
    {
        try
        {
            return ticketSchema.deleteOne({ _id: id });
        }
        catch (error)
        {
            console.error(error);
            throw error;
        }
    }
}

export default TicketMongooseRepository;
