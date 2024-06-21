import jwt from "jsonwebtoken";
import User from "../models/User.js"

async function login(req, res) {
    const user = await User.findOne({ email: req.body.email })
    if (user && user.hashCompare(req.body.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        return res.json({ token })
    } else {
        return res.status(404).json("Las credenciales no son válidas")
    }
}

async function tokenIsValid(req, res) {
    if (req.auth) {
        return true
    } else {
        return false
    }
}

export default { login, tokenIsValid }
