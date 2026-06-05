import { Router } from "express";
import type { Request, Response } from "express";
import { obterPorId, criar, atualizar, deletar} from "./funcoes.ts";
import type { NovoUsuario, AtualizarUsuario } from "./funcoes.ts";
import { usuario } from "./usuarios.ts";

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    res.status(200).json(usuario);
});

router.get('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const usuarioEncontrado = obterPorId(id);

    if (!usuarioEncontrado) return res.status(404).json({ erro: "Usuário não encontrado" });
    return res.status(200).json(usuarioEncontrado);
});

router.post('/', (req: Request, res: Response) => {
    const body = req.body as NovoUsuario;
    const { nome, sobrenome, quantidade, tipo } = body;

    if (!nome || !sobrenome || quantidade === undefined || !tipo)
        return res.status(400).json({ erro: "Dados incompletos" });

    const novoUsuario = criar({ nome, sobrenome, quantidade, tipo });
    return res.status(201).json(novoUsuario);
});

router.patch('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const dados = req.body as AtualizarUsuario;
    const usuarioAtualizado = atualizar(id, dados);

    if (!usuarioAtualizado) return res.status(404).json({ erro: "Usuário não encontrado" });
    return res.status(200).json(usuarioAtualizado);
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deletado = deletar(id);

    if (!deletado) return res.status(404).json({ erro: "Usuário não encontrado" });
    return res.status(204).send();
});

export default router;
