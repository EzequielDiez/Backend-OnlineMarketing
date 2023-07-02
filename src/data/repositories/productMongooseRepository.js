import productSchema from "../models/productSchema.js"
import Product from "../../domain/entities/product.js";

class ProductMongooseRepository
{
    async paginate(criteria) { 
        try {
            const { limit, page } = criteria
            const productDocuments = await productSchema.paginate({ status: true },{ limit, page })
            const { docs, ...pagination } = productDocuments

            const products = docs.map(document => new Product ({
                id: document._id,
                title: document.title,
                description: document.description,
                code: document.code,
                price: document.price,
                status: document.status,
                stock: document.stock,
                category: document.category,
                thumbnails: document.thumbnails,
            }))

            return {
                products,
                pagination
            }

        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async getOne(id) {
        try {
            const productDocument = await productSchema.findById(id).where({ status: true })
            if (!productDocument) return null

            return new Product ({
                id: productDocument._id,
                title: productDocument.title,
                description: productDocument.description,
                code: productDocument.code,
                price: productDocument.price,
                status: productDocument.status,
                stock: productDocument.stock,
                category: productDocument.category,
                thumbnails: productDocument.thumbnails,
            })

        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async create(data) {
        try {
            const productDocument = await productSchema.create(data)

            return new Product ({
                id: productDocument._id,
                title: productDocument.title,
                description: productDocument.description,
                code: productDocument.code,
                price: productDocument.price,
                status: productDocument.status,
                stock: productDocument.stock,
                category: productDocument.category,
                thumbnails: productDocument.thumbnails,
            })

        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async update(id, body) {
        try {
            const productDocument = await productSchema.findByIdAndUpdate(id, body, { new: true })

            return new Product ({
                id: productDocument._id,
                title: productDocument.title,
                description: productDocument.description,
                code: productDocument.code,
                price: productDocument.price,
                status: productDocument.status,
                stock: productDocument.stock,
                category: productDocument.category,
                thumbnails: productDocument.thumbnails,
            })

        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async delete(id) {
        try {
            const productDocument = await productSchema.findByIdAndUpdate(id, { status: false }, { new: true })

            return new Product ({
                id: productDocument._id,
                title: productDocument.title,
                description: productDocument.description,
                code: productDocument.code,
                price: productDocument.price,
                status: productDocument.status,
                stock: productDocument.stock,
                category: productDocument.category,
                thumbnails: productDocument.thumbnails,
            })
            
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}

export default ProductMongooseRepository