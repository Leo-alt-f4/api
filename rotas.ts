import { Router } from "express";
import type { Request, Response } from "express";
import { usuario } from "./usuarios.ts";

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    res.status(200).json(usuario);
});

export default router;
