import mongoose, { Schema } from "mongoose";
import paginate  from "mongoose-paginate-v2";

const userCollection = 'users'

const userSchema = new Schema ({
    firstName: { type: Schema.Types.String, require: true },
    lastName: { type: Schema.Types.String, require: true },
    email: { type: Schema.Types.String, unique: true, require: true},
    age: { type: Schema.Types.Number, require: true },
    password: { type: Schema.Types.String }
})

userSchema.plugin(paginate)

export default mongoose.model(userCollection, userSchema)