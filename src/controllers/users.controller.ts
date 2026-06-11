import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/users.service";

export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    public getAll = (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = this.usersService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    public getId = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const id = String(req.params.id);
            const user = this.usersService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    public createUser = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, lastName, quantity, type, email } = req.body;
            const newUser = this.usersService.createUser({ name, lastName, quantity, type, email });
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    };

    public updateUser = (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id);
            const { name, lastName, quantity, type, email } = req.body;
            const updatedUser = this.usersService.updateUser(id, { name, lastName, quantity, type, email });
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    };

    deleteUser = (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = String(req.params.id);
            this.usersService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}