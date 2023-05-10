import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts'

const cartSchema = new Schema({
    products: {
        type: [{
            _id: { type: Schema.Types.ObjectId, require: [true, "ID producto"], ref: 'Product'},
            quantity: { type: Schema.Types.Number, require: [true, "Cantidad"]}
        }],
        require: [true, "Por lo menos un producto"] 
    }
})

export default mongoose.model(cartCollection, cartSchema)