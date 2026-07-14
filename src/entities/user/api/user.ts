import type { Company } from '@/shared/api/company';
import type { TFLEXUser } from '@/shared/api/tflexUser';

export type TUserRole =
  | 'Пользователь'
  | 'Представитель заказчика'
  | 'Представитель партнера'
  | 'Администратор'
  | 'Только просмотр';

export type TUserActivity = 'Seller' | 'TechnicalSpecialist';

export interface IUser {
  id: number;
  guid: string;
  name: string;
  email: string;
  isExternal: boolean;
  company: Company;
  tflexUser?: TFLEXUser;
  role: TUserRole;
  usersLimit: number;
  administrator: string;
  claimsActivity: TUserActivity;
  isForApproveAction: boolean;
}

export class User implements IUser {
  id: number;
  guid: string;
  name: string;
  email: string;
  isExternal: boolean;
  company: Company;
  tflexUser?: TFLEXUser;
  role: TUserRole;
  usersLimit: number;
  administrator: string;
  claimsActivity: TUserActivity;
  isForApproveAction: boolean;

  constructor(data: IUser) {
    this.id = data.id;
    this.guid = data.guid;
    this.name = data.name;
    this.email = data.email;
    this.isExternal = data.isExternal;
    this.company = data.company;
    this.tflexUser = data.tflexUser;
    this.role = data.role;
    this.usersLimit = data.usersLimit;
    this.administrator = data.administrator;
    this.claimsActivity = data.claimsActivity;
    this.isForApproveAction = data.isForApproveAction;
  }

  // Пример бизнес-метода
  isAdmin(): boolean {
    return this.role === 'Администратор';
  }
}