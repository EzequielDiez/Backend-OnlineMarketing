import dotenv from 'dotenv';
import { CronJob } from 'cron';
dotenv.config();

import DeleteInactiveUsersCron from './presentation/crons/removeInactiveUsers.js';
import AppFactory from './presentation/factories/appFactory.js';
import DbFactory from './data/factories/dbFactory.js';

void (async() =>
{
    const db = DbFactory.create(process.env.DB);
    db.init(process.env.DB_URI);

    const app = AppFactory.create();

    app.init();
    app.build();
    app.listen();

    const cron = new CronJob('0 */5 * * *', DeleteInactiveUsersCron);

    cron.start();
    
})();
