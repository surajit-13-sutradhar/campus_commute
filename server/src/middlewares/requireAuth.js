import { getAuth } from "@clerk/clerk-sdk-node"

export const requireAuth = (req, res, next) => {
    const {userId, sessionId, getToken} = getAuth(req)

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    req.userId = userId
    next()
}