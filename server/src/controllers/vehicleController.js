import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

exports.searchVehicles = async(req, res) => {
    const {start, end, time} = req.query
    if(!start || !end || !time) return res.status(400).json({error: "start, end, and time are required"})

    try {
        const desiredTime = new Date(time)
    } catch {
        // const buses = 
    }
}

