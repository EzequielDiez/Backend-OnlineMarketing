import mongoose, { Schema } from "mongoose";

const productCollection = 'products'

const productSchema = new Schema({
    title: { type: Schema.Types.String, require: true },
    description: { type: Schema.Types.String, require: true },
    code: { type: Schema.Types.String, require: true },
    price: { type: Schema.Types.Number, require: true },
    status: { type: Schema.Types.Boolean, default: true },
    stock: { type: Schema.Types.Number, require: true },
    category: { type: Schema.Types.String, require: true },
    thumbnail: { type: Schema.Types.String, require: true },
})

export default mongoose.model(productCollection, productSchema)