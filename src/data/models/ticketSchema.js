import mongoose, {Schema} from "mongoose"
import paginate from "mongoose-paginate-v2"

const ticketCollection = 'tickets'

const ticketSchema = new Schema(
    {
        code: { type: Schema.Types.String, require: true },
        date: { type: Schema.Types.Date, require: true },
        total: { type: Schema.Types.Number, require: true },
        user: { type: Schema.Types.String, require: true }
    }
)

ticketSchema.plugin(paginate)

export default mongoose.model(ticketCollection, ticketSchema)