import { User } from "../entities/user.entity.ts";
import type { CreateUserDto } from "../dtos/create-user.dto.ts";
import type { UpdateUserDto } from "../dtos/update-user.dto.ts";
import type { IUsersRepository } from "../repositories/users.repository.ts";
import { AppError } from "../errors/AppError.ts";

export class UsersService {
  public readonly usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public getAllUsers(): User[] { return this.usersRepository.findAll() }

  public getUserById(id: string): User {
    const user = this.usersRepository.findById(id);
    if (!user) throw new AppError("Usuário não encontrado.", 404);

    return user;
  }

  public createUser(data: CreateUserDto): User {

    if (!data.name || data.name.trim() === "") throw new AppError("nome obrigatorio", 400);
    if (!data.lastName || data.lastName.trim() === "") throw new AppError("sobrenome obrigatorio", 400);
    if (data.quantity === undefined) throw new AppError("quantidade obrigatoria", 400);
    if (!data.type || data.type.trim() === "") throw new AppError("tipo obrigatorio", 400);
    if (!data.email || data.email.trim() === "") throw new AppError("email obrigatorio", 400);

    const emailExists = this.usersRepository.findByEmail(data.email);
    if (emailExists) throw new AppError("Este email já está em uso", 409);

    const newUser = new User(
      data.name,
      data.lastName,
      Number(data.quantity),
      data.type,
      data.email,
    );
    return this.usersRepository.create(newUser);
  }

  public updateUser(id: string, data: UpdateUserDto): User {
    const user = this.usersRepository.findById(id);

    if (!user) throw new AppError("usuario não encontrado", 404);

    if (data.name !== undefined) {
      if (data.name.trim() === "")
        throw new AppError("nome não pode ficar vazio", 400);
      user.updateName(data.name);
    }

    if (data.lastName !== undefined) {
      if (data.lastName.trim() === "")
        throw new AppError("sobrenome não pode ficar vazio", 400);
      user.updateLastName(data.lastName);
    }

    if (data.quantity !== undefined) {
      user.updateQuantity(Number(data.quantity));
    }

    if (data.type !== undefined) {
      if (data.type.trim() === "")
        throw new AppError("tipo não pode ficar vazio", 400);
      user.updateType(data.type);
    }

    if (data.email !== undefined) {
      if (data.email.trim() === "")
        throw new AppError("email não pode ficar vazio", 400);
      const emailOwner = this.usersRepository.findByEmail(data.email);

      if (emailOwner && emailOwner.id !== id) throw new AppError( "este email está sendo usado por outro usuário", 400 );
      user.updateEmail(data.email);
    }

    return this.usersRepository.update(user);
  }

  public deleteUser(id: string): void {
    const user = this.usersRepository.findById(id);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    this.usersRepository.delete(id);
  }
}
