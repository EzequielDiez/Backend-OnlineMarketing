/* import jwt from "jsonwebtoken";

const auth = (req, res, next) =>
{
    const authHeader = req.headers.authorization;

    if (!authHeader)
    {
        return res.status(401).send({ message: 'Empty authentication header!'});
    }

    const token = authHeader.split(' ')[1]; // Bearer tokenString

    jwt.verify(token, process.env.PRIVATE_KEY, (error, data) => {
       if(error) return res.status(403).send({ error: 'Authentication error'});

       req.user = data.user;
       next();
    });
}

export default auth; */

import jwt from "jsonwebtoken";

const auth = (req, res, next) =>
{
    console.log("Entering auth function");

    const authHeader = req.headers.authorization;
    console.log("authHeader:", authHeader);

    if (!authHeader)
    {
        console.log("Empty authentication header!");
        return res.status(401).send({ message: 'Empty authentication header!'});
    }

    const token = authHeader.split(' ')[1]; // Bearer tokenString
    console.log("Token:", token);

    jwt.verify(token, process.env.PRIVATE_KEY, (error, data) => {
       console.log("Verifying token");

       if(error) {
           console.log("Authentication error:", error);
           return res.status(403).send({ error: 'Authentication error'});
       }

       req.user = data.user;
       console.log("Authentication successful");
       next();
    });
}

export default auth;