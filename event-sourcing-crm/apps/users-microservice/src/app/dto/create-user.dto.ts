export enum Role {
  ADMIN = "admin",
  MANAGER = "manager",
  SALES = "sales",
}

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
