import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2"

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

cartSchema.plugin(paginate)

cartSchema.pre('find', function () {
this.populate(['products._id']);
});

cartSchema.pre('findOne', function () {
this.populate(['products._id']);
});

export default mongoose.model(cartCollection, cartSchema)