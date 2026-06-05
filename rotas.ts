import { Router } from "express";
import type { Request, Response } from "express";
import { obterPorId } from "./funcoes.ts";
import { usuario } from "./usuarios.ts";

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    res.status(200).json(usuario);
});

router.get('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const usuarioEncontrado = obterPorId(id);

    if (!usuarioEncontrado) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    return res.status(200).json(usuarioEncontrado);
});

export default router;
