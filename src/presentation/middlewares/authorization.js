const authorization = (permission) => {

    return async (req, res, next) => {
        const user = req.user;

        if (!user.role || !user.role.permissions || !user.role.permissions.includes(permission)) {
            console.log("user.role", user.role);
            console.log("user.role.permissions", user.role.permissions);
            console.log("user.role.permissions.includes(permission)", user.role.permissions.includes(permission));
            console.log("Unauthorized access");
            return res.status(401).send({ message: 'Not authorized!' });
          }

        next();
    };
};

export default authorization;

