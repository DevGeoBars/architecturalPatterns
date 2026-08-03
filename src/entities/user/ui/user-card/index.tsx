import type {
  User,
} from '../../model/user';

import type {
  TUserActivity,
} from '../../model/userActivity';

import './index.scss';

interface IUserCardProps {
  user: User;
}

const USER_ACTIVITY_LABELS: Record<
  TUserActivity,
  string
> = {
  Seller: 'Продажи',

  TechnicalSpecialist:
    'Технический специалист',
};

const getTextValue = (
  value: string | undefined,
): string => {
  const normalizedValue =
    value?.trim();

  return normalizedValue
    ? normalizedValue
    : '—';
};

const getBooleanLabel = (
  value: boolean,
): string => {
  return value ? 'Да' : 'Нет';
};

const getUserInitial = (
  name: string,
): string => {
  return (
    name
      .trim()
      .charAt(0)
      .toUpperCase() || '?'
  );
};

export const UserCard = ({
  user,
}: IUserCardProps) => {
  return (
    <section
      className="user-card"
      aria-label={
        `Информация о пользователе ${user.name}`
      }
    >
      <div className="user-card__header">
        <div
          className="user-card__avatar"
          aria-hidden="true"
        >
          {getUserInitial(user.name)}
        </div>

        <div className="user-card__identity">
          <h2 className="user-card__name">
            {user.name}
          </h2>

          <p className="user-card__email">
            {getTextValue(user.email)}
          </p>
        </div>
      </div>

      <dl className="user-card__details">
        <div className="user-card__detail">
          <dt>Роль</dt>

          <dd>{user.role}</dd>
        </div>

        <div className="user-card__detail">
          <dt>Компания</dt>

          <dd>
            {getTextValue(
              user.company.name,
            )}
          </dd>
        </div>

        <div className="user-card__detail">
          <dt>
            Направление работы
          </dt>

          <dd>
            {
              USER_ACTIVITY_LABELS[
                user.claimsActivity
                ]
            }
          </dd>
        </div>

        <div className="user-card__detail">
          <dt>Тип пользователя</dt>

          <dd>
            {user.isExternal
              ? 'Внешний'
              : 'Внутренний'}
          </dd>
        </div>

        <div className="user-card__detail">
          <dt>Администратор</dt>

          <dd>
            {getTextValue(
              user.administrator,
            )}
          </dd>
        </div>

        <div className="user-card__detail">
          <dt>
            Лимит пользователей
          </dt>

          <dd>{user.usersLimit}</dd>
        </div>

        <div className="user-card__detail">
          <dt>
            Пользователь T-FLEX
          </dt>

          <dd>
            {getTextValue(
              user.tflexUser?.name,
            )}
          </dd>
        </div>

        <div className="user-card__detail">
          <dt>
            Согласование действий
          </dt>

          <dd>
            {getBooleanLabel(
              user.isForApproveAction,
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
};
