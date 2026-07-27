
export const users = [
    {
        Id: '1',
        Guid: 'e1b76f79-c52c-4b6c-83c2-c05bf3f9c001',
        Name: 'Иван Иванов',
        Email: 'ivan.ivanov@example.com',
        IsExternal: false,

        Company: {
            Id: 1,
            Guid: 'f4cf2a25-d229-4c07-a9a9-b53a7e1a0001',
            Name: 'Топ Системы',
        },

        TFLEXUser: {
            Id: 'tflex-user-1',
            Guid: '73c25c25-aebb-420a-a794-ff246ac10001',
            Name: 'Иванов Иван Иванович',
        },

        Role: 'Administrator',
        UsersLimit: 100,
        Administrator: 'Пётр Петров',
        ClaimsActivity: 0,
        IsForApproveAction: true,
    },

    {
        Id: '2',
        Guid: 'e1b76f79-c52c-4b6c-83c2-c05bf3f9c002',
        Name: 'Анна Смирнова',
        Email: 'anna.smirnova@example.com',
        IsExternal: true,

        Company: {
            Id: 2,
            Guid: 'f4cf2a25-d229-4c07-a9a9-b53a7e1a0002',
            Name: 'Компания заказчика',
        },

        Role: 'Customer',
        UsersLimit: 10,
        Administrator: 'Иван Иванов',
        ClaimsActivity: 1,
        IsForApproveAction: false,
    },

    {
        Id: '3',
        Guid: 'e1b76f79-c52c-4b6c-83c2-c05bf3f9c003',
        Name: 'Сергей Волков',
        Email: 'sergey.volkov@example.com',
        IsExternal: true,

        Company: {
            Id: 3,
            Guid: 'f4cf2a25-d229-4c07-a9a9-b53a7e1a0003',
            Name: 'Компания партнёра',
        },

        Role: 'Partner',
        UsersLimit: 20,
        Administrator: 'Иван Иванов',
        ClaimsActivity: 1,
        IsForApproveAction: true,
    },

    {
        Id: '4',
        Guid: 'e1b76f79-c52c-4b6c-83c2-c05bf3f9c004',
        Name: 'Мария Кузнецова',
        Email: 'maria.kuznetsova@example.com',
        IsExternal: false,

        Company: {
            Id: 1,
            Guid: 'f4cf2a25-d229-4c07-a9a9-b53a7e1a0001',
            Name: 'Топ Системы',
        },

        Role: 'User',
        UsersLimit: 5,
        Administrator: 'Иван Иванов',
        ClaimsActivity: 0,
        IsForApproveAction: false,
    },
];

export const currentUserId = '1';

export const subUserIdsByUserId = {
    1: ['2', '3', '4'],
};

export const userLabels = [
    'Администратор',
    'Сотрудник',
    'Заказчик',
    'Партнёр',
];
