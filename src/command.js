import { exit } from 'shelljs';
import { program } from 'commander';
import dotenv from 'dotenv';

import CreateUserCommand from './presentation/commands/createUser.js';
import DbFactory from './data/factories/dbFactory.js';

dotenv.config();

void(async() =>
{
    try
    {
        const db = DbFactory.create(process.env.DB);
        db.init(process.env.DB_URI);

        program.addCommand(CreateUserCommand);

        await program.parseAsync(process.argv);

        exit();
    }
    catch (error)
    {
        console.log(error);

        exit();
    }
})();
