import express from 'express';
import cookieParser from "cookie-parser";

import sessionRouter from "../../presentation/routes/SessionRouter.js";
import userRouter from "../../presentation/routes/UserRouter.js"
import ProductRouter from "../../presentation/routes/ProductRouter.js"
import CartRouter from "../../presentation/routes/CartRouter.js"
import roleRouter from "../../presentation/routes/RoleRouter.js"

import errorHandler from "../../presentation/middlewares/errorHandler.js"

class AppExpress
{
    init()
    {
        this.app = express()
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cookieParser())
    }

    build()
    {
        this.app.use("/api/sessions", sessionRouter)
        this.app.use("/api/users", userRouter)
        this.app.use("/api/products", ProductRouter)
        this.app.use("/api/carts", CartRouter)
        this.app.use("/api/roles", roleRouter)
        this.app.use(errorHandler)
    }

    callback()
    {
        return this.app
    }

    listen()
    {
        return this.app.listen(8080, () => {
            console.log('Server started on port 8080');
        });
    }

/*     listen()
    {
        this.server = this.app.listen(8080, () => {
            console.log('Server started on port 8080')
        })
    } */

    close()
    {
        this.server.close()
    }
}

export default AppExpress