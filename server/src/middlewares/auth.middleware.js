import jwt from 'jsonwebtoken'

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.spilt(" ")[1]  
    if(!token) return res.status(401).json({message: "Not authorized, token failed"})
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(err) {
        return res.status(403).json({ error: "Invalid token" })
    }

}