import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

router.get("/api/users", usersController.getAll);
router.get("/api/users/:id", usersController.getById);
router.post("/api/users", usersController.create);
router.patch("/api/users/:id", usersController.update);
router.delete("/api/users/:id", usersController.destroy);

export default router;
