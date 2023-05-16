import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts'

const cartSchema = new Schema({
    products: {
        type: [{
            _id: { type: Schema.Types.ObjectId, require: [true, "ID producto"], ref: 'products'},
            quantity: { type: Schema.Types.Number, require: [true, "Cantidad"]}
        }],
        require: [true, "Por lo menos un producto"] 
    }
})

/* cartSchema.pre('find', function(next) {
    this.populate(['products'])
    next()
}) */

export default mongoose.model(cartCollection, cartSchema)