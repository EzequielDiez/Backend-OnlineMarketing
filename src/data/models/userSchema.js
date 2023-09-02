import mongoose, { Schema } from 'mongoose';
import paginate  from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = new Schema ({
    firstName: { type: Schema.Types.String, require: true },
    lastName: { type: Schema.Types.String, require: true },
    email: { type: Schema.Types.String, unique: true, require: true },
    age: { type: Schema.Types.Number, require: true },
    cart: { type: Schema.Types.ObjectId, index: true, ref: 'carts' },
    role: { type: Schema.Types.ObjectId, index: true, ref: 'roles', default: '647fc4883257d40b138c8d33' },
    password: { type: Schema.Types.String },
    documents: {
        type: [{
            name: { type: Schema.Types.String },
            reference: { type: Schema.Types.String }
        }],
        default: null
    },
    lastConnection: { type: Schema.Types.Date, require:true, default: Date.now() }
});

userSchema.plugin(paginate);

userSchema.pre('find', function()
{
    this.populate(['cart']);
});

userSchema.pre('findOne', function()
{
    this.populate(['cart']);
});

userSchema.pre('findOne', function()
{
    this.populate(['role']);
});

export default mongoose.model(userCollection, userSchema);
