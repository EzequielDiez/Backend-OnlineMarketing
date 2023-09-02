import UserManager from '../../domain/managers/UserManager.js';

import { loggerConfig } from '../../config/index.js';

const DeleteInactiveUsersCron = async() =>
{
    try
    {
        const manager = new UserManager();
        const result = await manager.deleteInactives();
        loggerConfig.info(`${result} inactive users in past 10 days have been removed successfully`);
    }
    catch (error)
    {
        loggerConfig.error('Error to remove inactive users');
    }
};

export default DeleteInactiveUsersCron;
