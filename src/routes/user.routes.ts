import { Router } from "express";
import { UsersRepository } from "../repositories/users.repository.ts";
import { UsersController } from "../controllers/users.controller.ts";
import { UsersService } from "../services/users.service.ts";

const router = Router();
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const userController = new UsersController(usersService);

router.get("/", userController.getAll);
router.get("/:id", userController.getId);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;