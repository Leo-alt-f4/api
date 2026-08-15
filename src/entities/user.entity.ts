import { randomUUID } from "node:crypto";

export class User {
  public readonly id: string;
  public name: string;
  public lastName: string;
  public quantity: number;
  public type: string;
  public email: string;
  public readonly createdTime: Date | string;
  public readonly createdDate: Date | string;
  public updatedTime: Date | string;
  public updatedDate: Date | string;

  constructor(name: string, lastName: string, quantity: number, type: string, email: string, id?: string) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.lastName = lastName;
    this.quantity = quantity;
    this.type = type;
    this.email = email;
    this.createdTime = new Date().toLocaleDateString("pt-BR");
    this.updatedTime = new Date().toLocaleDateString("pt-BR");

    this.createdDate = new Date().toLocaleTimeString("pt-BR");
    this.updatedDate = new Date().toLocaleTimeString("pt-BR");
  }

  public updateName(name: string): void {
    this.name = name;
    this.updatedTime = new Date();
    this.updatedDate = new Date();
  }

  public updateEmail(email: string): void {
    this.email = email;
    this.updatedTime = new Date();
    this.updatedDate = new Date();
  }

  public updateLastName(lastName: string):void {
    this.lastName = lastName;
    this.updatedTime = new Date();
    this.updatedDate = new Date();
  }

  public updateQuantity(quantity: number):void {
    this.quantity = quantity;
    this.updatedTime = new Date();
    this.updatedDate = new Date();
  }

  public updateType(type: string):void {
    this.type = type;
    this.updatedDate = new Date();
    this.updatedTime = new Date();
  }
}