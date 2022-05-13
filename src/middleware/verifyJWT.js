import { verify } from "jsonwebtoken";
import config from "../config";
import { errorResponse } from "../utils/response";

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json(errorResponse("Unauthorized access"));
    }
    const token = authHeader.split(" ")[1];
    verify(token, config.secrets.jwt, (err, decoded) => {
        if (err) {
            return res.status(403).json(errorResponse("Forbidden access"));
        }
        req.decoded = decoded;
        next();
    });
}

export default verifyJWT