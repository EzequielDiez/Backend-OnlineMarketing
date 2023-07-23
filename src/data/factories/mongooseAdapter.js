import mongoose from "mongoose";

class MongooseAdapter {
    async init(uri) {
        try {
            await mongoose.connect(uri);
        } catch (err) {
        }
    }

    async close() {
        try {
            await mongoose.connection.close();
        } catch (err) {
        }
    }
}

export default MongooseAdapter;