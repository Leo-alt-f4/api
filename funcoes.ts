import { usuario } from "./usuarios.ts";

export interface Usuario {
    id: number;
    nome: string;
    sobrenome: string;
    quantidade: number;
    tipo: string;
}

export interface NovoUsuario {
    nome: string;
    sobrenome: string;
    quantidade: number;
    tipo: string;
}

export interface AtualizarUsuario {
    nome?: string;
    sobrenome?: string;
    quantidade?: number;
    tipo?: string;
}

export function obterPorId(id: number): Usuario | undefined {
    return usuario.find(u => u.id === id);
}

export function criar(dados: NovoUsuario): Usuario {
    const novoId = Math.max(...usuario.map(u => u.id), 0) + 1;
    const novoUsuario: Usuario = {
        id: novoId,
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        quantidade: dados.quantidade,
        tipo: dados.tipo
    };
    usuario.push(novoUsuario);
    return novoUsuario;
}
