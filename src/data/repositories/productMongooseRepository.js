import productSchema from '../models/productSchema.js';
import Product from '../../domain/entities/product.js';

class ProductMongooseRepository
{
    async paginate(criteria)
    {
        const { limit, page } = criteria;
        const productDocuments = await productSchema.paginate({ status: true }, { limit, page });
        const { docs, ...paginationInfo } = productDocuments;

        return docs.length > 0 ? {
            payload: docs.map((document) => new Product({
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnails: document.thumbnails || null
            })),
            ...paginationInfo
        } : null;
    }

    async getOne(id)
    {
        const productDocument = await productSchema.findById(id);

        return productDocument ? new Product({
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            price: productDocument.price,
            thumbnails: productDocument.thumbnails || null,
            category: productDocument.category,
            code: productDocument.code,
            status: productDocument.status,
            stock: productDocument.stock
        }) : null;
    }

    async create(data)
    {
        const productDocument = await productSchema.create(data);

        return productDocument ? new Product({
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            price: productDocument.price,
            thumbnails: productDocument.thumbnails || null,
            category: productDocument.category,
            code: productDocument.code,
            status: productDocument.status,
            stock: productDocument.stock
        }) : null;
    }

    async update(pid, update)
    {
        const productDocument = await productSchema.findByIdAndUpdate(pid, update, { new: true });

        return productDocument ? new Product({
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            price: productDocument.price,
            thumbnails: productDocument.thumbnails || null,
            category: productDocument.category,
            code: productDocument.code,
            status: productDocument.status,
            stock: productDocument.stock
        }) : null;
    }


    async delete(id)
    {
        const productDocument = await productSchema.findByIdAndUpdate(id, { status: false }, { new: true });

        return productDocument ? true : null;
    }
}

export default ProductMongooseRepository;
