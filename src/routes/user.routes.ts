import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { UsersRepository } from "../repositories/users.repository.ts";
import { UsersService } from "../services/users.service.ts";

const router = Router();

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const user = usersService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, lastName, quantity, type, email } = req.body;
    const newUser = usersService.createUser({ name, lastName, quantity, type, email });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const { name, lastName, quantity, type, email } = req.body;
    const updatedUser = usersService.updateUser(id, { name, lastName, quantity, type, email });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    usersService.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;