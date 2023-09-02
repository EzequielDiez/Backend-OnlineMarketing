import { Command } from 'commander';

import UserManager from '../../domain/managers/UserManager.js';
import RoleManager from '../../domain/managers/RoleManager.js';

import { createHash } from '../../shared/index.js';

const CreateUserCommand = new Command ('createUser');

CreateUserCommand
    .version('0.0.1')
    .description('Create a new user')
    .option('-fn, --firstName <firstName>', 'User\'s first name')
    .option('-ln, --lastName <lastName>', 'User\'s last name')
    .option('-e, --email <email>', 'User\'s email')
    .option('-p, --password <password>', 'User\'s password')
    .option('-a, --age <age>', 'User\'s age')
    .action(async(env) =>
    {
        const userManager = new UserManager();
        const roleManager = new RoleManager();

        const adminRole = await roleManager.getOneByName('admin');

        const payload = {
            ...env,
            role: adminRole.id.toString(),
            lastConnection: Date.now(),
            age: +env.age,
            password: await createHash(env.password)
        };

        const user = await userManager.create(payload);

        if (!user)
        {
            console.log('Error tor create user');
        }

        console.log('User created successfully');
    });

export default CreateUserCommand;
