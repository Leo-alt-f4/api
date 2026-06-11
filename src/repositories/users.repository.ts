import path from "node:path";
import fs from "node:fs";
import { User } from "../entities/user.entity.ts";

export interface IUsersRepository {
  findAll(): User[];
  findById(id: string): User | undefined;
  findByEmail(email: string): User | undefined;
  create(user: User): User;
  update(user: User): User;
  delete(id: string): void;
}

export class UsersRepository implements IUsersRepository {
  private readonly filePath = "./src/entities/usuarios.json";
  
  private readData(): User[]{
    if(!fs.existsSync(this.filePath)) return [] ;

    const fileData = fs.readFileSync(this.filePath, "utf-8");
    const parsedJson = JSON.parse(fileData);

    const rawUsers = parsedJson.user || [];

    return rawUsers.map((item: any) => {
            const user = new User(
        item.name,
        item.lastName,
        Number(item.quantity),
        item.type,
        item.email,
        String(item.id)
      );

      if (item.createdAt) {
        Object.defineProperty(user, "createdAt", {
          value: new Date(item.createdAt),
          writable: false
        });
      }
      if (item.updatedAt) {
        user.updatedAt = new Date(item.updatedAt);
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
      createdAt: u.createdAt,
      updatedAt: u.updatedAt
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
    this.readData().push(user);
    return user;
  }

  public update(user: User): User {
    const users = this.readData();
    const index = this.readData().findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.readData()[index] = user;
      this.writeData(users);
    }
    return user;
  }

  public delete(id: string): void {
    const users = this.readData().filter(user => user.id !== id);
    this.writeData(users);
  }
}
 