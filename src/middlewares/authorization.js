const authorization = (permission) => {

    return async (req, res, next) => {
        console.log("Entering authorization function");
        const user = req.user;
        console.log("user:", user);

/*         if (!user.role?.permissions.includes(permission)) {
            console.log("Unauthorized access");
            return res.status(401).send({ message: 'Not authorization!' });
        }
 */
        if (!user.role || !user.role.permissions || !user.role.permissions.includes(permission)) {
            console.log("user.role", user.role);
            console.log("user.role.permissions", user.role.permissions);
            console.log("user.role.permissions.includes(permission)", user.role.permissions.includes(permission));
            console.log("Unauthorized access");
            return res.status(401).send({ message: 'Not authorized!' });
          }

        console.log("Access authorized");
        next();
    };
};

export default authorization;

