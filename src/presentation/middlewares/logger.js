import { loggerConfig } from "../../config/index.js";

const logger = (req, res, next) => {
    req.logger = loggerConfig

    req.logger.info(`${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`)

    next()
}

export default logger