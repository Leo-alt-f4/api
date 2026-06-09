import { user } from "../entities/usuarios";

interface Usuario {
    id: number;
    nome: string;
    sobrenome: string;
    quantidade: number;
    tipo: string;
    email: string;
}

interface NovoUsuario {
    nome: string;
    sobrenome: string;
    quantidade: number;
    tipo: string;
    email: string;
}

interface AtualizarUsuario {
    nome?: string;
    sobrenome?: string;
    quantidade?: number;
    tipo?: string;
    email?: string;
}

function obterPorId(id: number): Usuario | undefined {
    return user.find(u => u.id === id);
}

function criar(dados: NovoUsuario): Usuario {
    const novoId = Math.max(...user.map(u => u.id), 0) + 1;
    const novoUsuario: Usuario = {
        id: novoId,
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        quantidade: dados.quantidade,
        tipo: dados.tipo,
        email: dados.email
    };
    user.push(novoUsuario);
    return novoUsuario;
}

function atualizar(id: number, dados: AtualizarUsuario): Usuario | undefined {
    const usuarioEncontrado = user.find(u => u.id === id);

    if (!usuarioEncontrado) return undefined;
    if (dados.nome !== undefined) usuarioEncontrado.nome = dados.nome;
    if (dados.sobrenome !== undefined) usuarioEncontrado.sobrenome = dados.sobrenome;
    if (dados.quantidade !== undefined) usuarioEncontrado.quantidade = dados.quantidade;
    if (dados.tipo !== undefined) usuarioEncontrado.tipo = dados.tipo;
    if (dados.email !== undefined) usuarioEncontrado.email = dados.email;

    return usuarioEncontrado;
}

function deletar(id: number): boolean {
    const index = user.findIndex(u => u.id === id);
    if (index === -1) return false;
    user.splice(index, 1);
    return true;
}

export {
    obterPorId, criar, atualizar, deletar, 
}

export type {
    Usuario, NovoUsuario, AtualizarUsuario
}