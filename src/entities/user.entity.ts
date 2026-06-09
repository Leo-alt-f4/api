import { randomUUID } from "node:crypto";

export class User {
  public readonly id: string;
  public name: string;
  public lastName: string;
  public quantity: number;
  public type: string;
  public email: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(name: string, lastName: string, quantity: number, type: string, email: string, id?: string) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.lastName = lastName;
    this.quantity = quantity;
    this.type = type;
    this.email = email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public updateName(name: string): void {
    this.name = name;
    this.updatedAt = new Date();
  }

  public updateEmail(email: string): void {
    this.email = email;
    this.updatedAt = new Date();
  }

  public updateLastName(lastName: string):void {
    this.lastName = lastName;
    this.updatedAt = new Date();
  }

  public updateQuantity(quantity: number):void {
    this.quantity = quantity;
    this.updatedAt = new Date();
  }

  public updateType(type: string):void {
    this.type = type;
    this.updatedAt = new Date();
  }
}