import type { CompanyDto } from '@/shared/api/company';
import { companyMapper } from '@/shared/api/company';
import type { TFLEXUserDto } from '@/shared/api/tflexUser';
import { tflexUserMapper } from '@/shared/api/tflexUser';
import { User } from "./user";


// Константы ролей (можно вынести в shared или оставить здесь)
const USER_ROLES = {
  User: 'Пользователь',
  Customer: 'Представитель заказчика',
  Partner: 'Представитель партнера',
  Administrator: 'Администратор',
  Reader: 'Только просмотр',
} as const;

type TUserDtoRole = keyof typeof USER_ROLES;

interface UserDto {
  Id: string;
  Guid: string;
  Name: string;
  Email: string;
  IsExternal: boolean;
  Company: CompanyDto;
  TFLEXUser?: TFLEXUserDto | null;
  Role: TUserDtoRole;
  UsersLimit: number;
  Administrator: string;
  ClaimsActivity: number;
  IsForApproveAction: boolean;
}

// Маппер – теперь создаёт экземпляр класса User
export function userMapper(dto: UserDto): User {
  return new User({
    id: parseInt(dto.Id, 10),
    guid: dto.Guid,
    name: dto.Name,
    email: dto.Email,
    isExternal: dto.IsExternal,
    company: companyMapper(dto.Company),
    tflexUser: dto.TFLEXUser ? tflexUserMapper(dto.TFLEXUser) : undefined,
    role: USER_ROLES[dto.Role],
    usersLimit: dto.UsersLimit,
    administrator: dto.Administrator,
    claimsActivity: dto.ClaimsActivity === 0 ? 'TechnicalSpecialist' : 'Seller',
    isForApproveAction: dto.IsForApproveAction,
  });
}

// API-функция
export function fetchUsers(): Promise<User[]> {
  return fetch('/api/users')
    .then((res) => res.json())
    .then((data: UserDto[]) => data.map(userMapper));
}