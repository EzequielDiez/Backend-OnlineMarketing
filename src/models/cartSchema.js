import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts'

const cartSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, require: true, default: mongoose.Types.ObjectId },
    products: [{ 
        productId: { type: Schema.Types.ObjectId, require: true, ref: 'product'},
        quantity: { type: Schema.Types.Number, require: true, default: 1}
    }]
})

export default mongoose.model(cartCollection, cartSchema)