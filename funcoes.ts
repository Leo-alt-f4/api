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