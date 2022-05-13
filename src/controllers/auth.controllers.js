import { sign } from "jsonwebtoken";
import config from "../config";
import { successResponse } from "../utils/response";

// Login route
export const loginController = async (req, res) => {
    const { email } = req.body;
    const access = sign({ email }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp,
    });
    return res.json(successResponse({ accessToken: access }));
}