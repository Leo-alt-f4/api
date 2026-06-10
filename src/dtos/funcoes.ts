import dadosUsuarios from "../entities/usuarios.json" with { type: 'json' };
const { user } = dadosUsuarios; 

interface Usuario {
    id: number;
    name: string;
    last_name: string;
    quantity: number;
    type: string;
    email: string;
}

interface NovoUsuario {
    name: string;
    last_name: string;
    quantity: number;
    type: string;
    email: string;
}

interface AtualizarUsuario {
    name?: string;
    last_name?: string;
    quantity?: number;
    type?: string;
    email?: string;
}

function obterPorId(id: number): Usuario | undefined {
    return user.find(u => u.id === id);
}

function criar(dados: NovoUsuario): Usuario {
    const novoId = Math.max(...user.map(u => u.id), 0) + 1;
    const novoUsuario: Usuario = {
        id: novoId,
        name: dados.name,
        last_name: dados.last_name,
        quantity: dados.quantity,
        type: dados.type,
        email: dados.email
    };
    user.push(novoUsuario);
    return novoUsuario;
}

function atualizar(id: number, dados: AtualizarUsuario): Usuario | undefined {
    const usuarioEncontrado = user.find(u => u.id === id);

    if (!usuarioEncontrado) return undefined;
    if (dados.name !== undefined) usuarioEncontrado.name = dados.name;
    if (dados.last_name !== undefined) usuarioEncontrado.last_name = dados.last_name;
    if (dados.quantity !== undefined) usuarioEncontrado.quantity = dados.quantity;
    if (dados.type !== undefined) usuarioEncontrado.type = dados.type;
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