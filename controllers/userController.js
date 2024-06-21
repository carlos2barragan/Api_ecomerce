import User from "../models/User.js"

async function list(req, res) {
    try {
        const userList = await User.find({ deletedAt: null });
        return res.json(userList)
    } catch (err) {
        console.log(err)
        return res.status(500).json("Server error")
    }
}

async function create(req, res) {
    try {
        const newUser = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            avatar: req.file.filename
        })
        return res.json("User created")
    } catch (error) {
        console.log(error)
        return res.status(500).json("Server error")
    }
}

async function destroy(req, res) {
    try {
        await User.findByIdAndUpdate(req.params.id, { deletedAt: Date.now() })
        return res.json("Usuario borrado")
    } catch (err) {
        console.log(err)
        return res.status(500).json("Server error")
    }
}

export default { create, destroy, list }