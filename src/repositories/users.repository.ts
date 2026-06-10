import { User } from "../entities/user.entity";

export interface IUsersRepository {
  findAll(): User[];
  findById(id: string): User | undefined;
  findByEmail(email: string): User | undefined;
  create(user: User): User;
  update(user: User): User;
  delete(id: string): void;
}

export class UsersRepository implements IUsersRepository {
  private users: User[] = [
    new User("Ronaldo", "Silva", 3000, "positivo", "silva.ronaldo@gmail.com"),
    new User("Cláudio", "Gomes", -1750.43, "negativo", "claud10.gomes@gmail.com"),
    new User("Rafael", "Pereira", 0, "neutro", "rafaPera@outlook.com"),
    new User("Natália", "Ferrari", 10000, "positivo", "NataliaFerrari@gmail.com"),
    new User("Carlos", "Dutra", -1750.43, "negativo", "C4rl0s_Dutra@outlook.com")
  ];

  public findAll(): User[] {
    return this.users;
  }

  public findById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  public findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  public create(user: User): User {
    this.users.push(user);
    return user;
  }

  public update(user: User): User {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
    return user;
  }

  public delete(id: string): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
 