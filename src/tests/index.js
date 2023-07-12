import dotenv from "dotenv"
dotenv.config()

import AppFactory from "../presentation/factories/appFactory.js"
import DbFactory from "../data/factories/DbFactory.js"

const initServer = async () => 
{
    const db = DbFactory.create(process.env.DB)
    db.init(process.env.DB_URI)

    const app = AppFactory.create('AppExpress')
    app.init()
    app.build()

    return {
        app,
        db
    }
}

export default initServer