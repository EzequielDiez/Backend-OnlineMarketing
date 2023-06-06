/* const authorization = (permission) =>
{
    return async(req, res, next) =>
    {
        const user = req.user;

        if(!user.isAdmin && !user.role?.permissions.includes(permission))
        {
            return res.status(401).send({ message: 'Not authorization!'});
        }

        next();
    }
}

export default authorization; */

const authorization = (permission) => {
    return async (req, res, next) => {
        console.log("Entering authorization function");
        const user = req.user;
        console.log("user:", user);

        if (!user.isAdmin && !user.role?.permissions.includes(permission)) {
            console.log("Unauthorized access");
            return res.status(401).send({ message: 'Not authorization!' });
        }

        console.log("Access authorized");
        next();
    };
};

export default authorization;