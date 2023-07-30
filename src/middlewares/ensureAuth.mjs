import jwt from "jsonwebtoken";

export const ensureAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(403).json({ data: "Missing authorization header" });

        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(403).json({ data: "Malformed authorization header" });

        const payload = await jwt.verify(token, "secret");
        if (!payload) return res.status(400).json({ data: "Token verification failed" });

        req.user = payload;
        next();
    } catch (e) {
        res.status(400).json({ data: e.message });
    }
};
