const authorization = (permission) =>
{
    return async(req, res, next) =>
    {
        const user = req.user;

        if (!user.role || !user.role.permissions || !user.role.permissions.includes(permission))
        {
            return res.status(401).send({ message: 'Not authorized!' });
        }

        next();
    };
};

export default authorization;

