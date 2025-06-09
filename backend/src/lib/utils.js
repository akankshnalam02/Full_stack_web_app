import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,          // ✅ True — required for HTTPS
        sameSite: "none",      // ✅ Required for cross-origin
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token; // No response here!
};
