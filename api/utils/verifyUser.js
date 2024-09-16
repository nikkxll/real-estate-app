import jwt from 'jsonwebtoken';
import { errHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const cookieHeader = req.headers["cookie"];

    if (typeof cookieHeader === "undefined") {
        return next(errHandler(401, 'Unauthorized'));
    }

    const cookie = cookieHeader.split("=");
    const token = cookie[2];

    if (!token) return next(errHandler(401, 'Token does not exist'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errHandler(403, 'Forbidden'));

    req.user = user;
    next();
    })
};  