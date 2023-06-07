import mongoose, { Schema } from "mongoose";
import paginate  from "mongoose-paginate-v2";

const userCollection = 'users'

const userSchema = new Schema ({
    firstName: { type: Schema.Types.String, require: true },
    lastName: { type: Schema.Types.String, require: true },
    email: { type: Schema.Types.String, unique: true, require: true},
    age: { type: Schema.Types.Number, require: true },
    cart: { type: Schema.Types.ObjectId, index: true, ref: 'carts' },
    /* role: { type: Schema.Types.ObjectId, index: true, ref: 'roles' }, */
    /* isAdmin: { type: Schema.Types.Boolean, default: false }, */
    role: { type: Schema.Types.String, enum: ['client', 'admin'], default: 'client' },
    password: { type: Schema.Types.String }
})

userSchema.plugin(paginate)

userSchema.pre('find', function () {
this.populate(['cart']);
});

userSchema.pre('findOne', function () {
this.populate(['cart']);
});

export default mongoose.model(userCollection, userSchema)