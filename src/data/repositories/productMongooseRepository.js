import productSchema from "../models/productSchema.js"
import Product from "../../domain/entities/product.js";

class ProductMongooseRepository {
    async paginate(criteria) {
      try {
        const { limit, page } = criteria;  
        const productDocuments = await productSchema.paginate({ status: true }, { limit, page });  
        const { docs, ...pagination } = productDocuments;
  
        const products = docs.map((document) => {
          return new Product({
            id: document._id,
            title: document.title,
            description: document.description,
            code: document.code,
            price: document.price,
            status: document.status,
            stock: document.stock,
            category: document.category,
            thumbnails: document.thumbnails,
          });
        });
  
        return {
          products,
          pagination,
        };
      } catch (error) {
        throw error;
      }
    }

    async getOne(id) {
        const productDoc = await productSchema.findById(id);

        return productDoc ? new Product({
            id: productDoc._id,
            title: productDoc.title,
            description: productDoc.description,
            price: productDoc.price,
            thumbnails: productDoc.thumbnails ?? null,
            category: productDoc.category,
            code: productDoc.code,
            status: productDoc.status,
            stock: productDoc.stock
        }): null;
    }

    async create(data) {
        const productDoc = await productSchema.create(data)

        return productDoc ? new Product({
            id: productDoc._id,
            title: productDoc.title,
            description: productDoc.description,
            price: productDoc.price,
            thumbnails: productDoc.thumbnails ?? null,
            category: productDoc.category,
            code: productDoc.code,
            status: productDoc.status,
            stock: productDoc.stock
        }) : null;
    }

    async update(data) {
        const { pid, update } = data;

        const productDoc = await productSchema.findByIdAndUpdate(pid, update, {new: true});

        return productDoc ? new Product({
            id: productDoc._id,
            title: productDoc.title,
            description: productDoc.description,
            price: productDoc.price,
            thumbnails: productDoc.thumbnails ?? null,
            category: productDoc.category,
            code: productDoc.code,
            status: productDoc.status,
            stock: productDoc.stock
        }) : null;
    }



    async delete(id) {
        try {
            const productDocument = await productSchema.findByIdAndUpdate(id, { status: false }, { new: true })
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
}

export default ProductMongooseRepository