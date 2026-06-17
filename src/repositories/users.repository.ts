import path from "node:path";
import fs from "node:fs";
import { User } from "../entities/user.entity.ts";
import type { UserDatabaseRow } from "../dtos/users-database.dto.ts";

export interface IUsersRepository {
  findAll(): User[];
  findById(id: string): User | undefined;
  findByEmail(email: string): User | undefined;
  create(user: User): User;
  update(user: User): User;
  delete(id: string): void;
}

export class UsersRepository implements IUsersRepository {
  private readonly filePath = path.join(import.meta.dirname, "../entities/usuarios.json");
  
  private readData(): User[] {
    if (!fs.existsSync(this.filePath)) return [];

    const fileData = fs.readFileSync(this.filePath, "utf-8");
    const parsedJson = JSON.parse(fileData) as { user: UserDatabaseRow[] };
    const rawUsers = parsedJson.user || [];

    return rawUsers.map((item: UserDatabaseRow): User => {
      const user = new User(
        item.name ?? item.nome ?? "",
        item.lastName ?? item.sobrenome ?? "",
        Number(item.quantity ?? item.quantidade ?? 0),
        item.type ?? item.tipo ?? "",
        item.email,
        String(item.id)
      );

      if (item.createdDate) {
        Object.defineProperty(user, "createdDate", {
          value: new Date(item.createdDate),
          writable: false
        });
      }
      
      if(item.createdTime) {
        Object.defineProperty(user, "createdTime", {
          value: new Date(item.createdTime),
          writable: false
        });
      }
      
      if (item.updatedDate) {
        user.updatedDate = new Date(item.updatedDate);
      }

      if (item.updatedTime) {
        user.updatedTime = new Date(item.updatedTime);
      }

      return user;
    });
  }

  private writeData(users: User[]): void {
    const rawUsers = users.map(u => ({
      id: Number.isNaN(Number(u.id)) ? u.id : Number(u.id), 
      nome: u.name,
      sobrenome: u.lastName,
      quantidade: u.quantity,
      tipo: u.type,
      email: u.email,
      dataCriada: u.createdDate,
      horaCriada: u.createdTime,
      dataAtualizada: u.updatedDate,
      horaAtualizada: u.updatedTime
    }));

    fs.writeFileSync(this.filePath, JSON.stringify({ user: rawUsers }, null, 2));
  }

  public findAll(): User[] {
    return this.readData();
  }

  public findById(id: string): User | undefined {
    return this.readData().find(user => user.id === id);
  }

  public findByEmail(email: string): User | undefined {
    return this.readData().find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  public create(user: User): User {
    const users = this.readData();
    users.push(user);
    this.writeData(users);
    return user;
  }

  public update(user: User): User {
    const users = this.readData();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      this.writeData(users);
    }
    return user;
  }

  public delete(id: string): void {
    const users = this.readData().filter(user => user.id !== id);
    this.writeData(users);
  }
}
 