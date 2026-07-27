import http from 'node:http';

import {
    credentials,
    currentUserId,
    subUserIdsByUserId,
    userLabels,
    users,
} from './data/users.mjs';

const HOST = 'localhost';
const PORT = 3001;

const sendJson = (
    response,
    statusCode,
    data,
) => {
    response.writeHead(statusCode, {
        'Content-Type':
            'application/json; charset=utf-8',

        'Access-Control-Allow-Origin':
            '*',

        'Access-Control-Allow-Methods':
            'GET, POST, PUT, PATCH, DELETE, OPTIONS',

        'Access-Control-Allow-Headers':
            'Content-Type, Authorization',
    });

    response.end(
        JSON.stringify(data),
    );
};

const sendError = (
    response,
    statusCode,
    message,
) => {
    sendJson(
        response,
        statusCode,
        {
            message,
        },
    );
};

const readJsonBody = (request) => {
    return new Promise(
        (resolve, reject) => {
            let body = '';

            request.on(
                'data',
                (chunk) => {
                    body += chunk.toString();
                },
            );

            request.on('end', () => {
                if (!body) {
                    resolve({});
                    return;
                }

                try {
                    resolve(
                        JSON.parse(body),
                    );
                } catch {
                    reject(
                        new Error(
                            'Некорректный JSON',
                        ),
                    );
                }
            });

            request.on(
                'error',
                reject,
            );
        },
    );
};

const getCurrentUser = () => {
    return users.find(
        (user) =>
            user.Id === currentUserId,
    );
};

const getSubUsers = (userId) => {
    const subUserIds =
        subUserIdsByUserId[userId] ??
        [];

    return users.filter((user) =>
        subUserIds.includes(user.Id),
    );
};

const requestHandler = async (
    request,
    response,
) => {
    if (
        request.method === 'OPTIONS'
    ) {
        response.writeHead(204, {
            'Access-Control-Allow-Origin':
                '*',

            'Access-Control-Allow-Methods':
                'GET, POST, PUT, PATCH, DELETE, OPTIONS',

            'Access-Control-Allow-Headers':
                'Content-Type, Authorization',
        });

        response.end();
        return;
    }

    const url = new URL(
        request.url ?? '/',
        `http://${request.headers.host}`,
    );

    console.log(
        `${request.method} ${url.pathname}`,
    );

    if (
        request.method === 'POST' &&
        url.pathname ===
        '/api/auth/login'
    ) {
        try {
            const body =
                await readJsonBody(request);

            const login =
                typeof body.login ===
                'string'
                    ? body.login.trim()
                    : '';

            const password =
                typeof body.password ===
                'string'
                    ? body.password
                    : '';

            if (!login || !password) {
                sendError(
                    response,
                    400,
                    'Логин и пароль обязательны',
                );
                return;
            }

            const userCredentials =
                credentials.find(
                    (item) =>
                        item.login === login &&
                        item.password ===
                        password,
                );

            if (!userCredentials) {
                sendError(
                    response,
                    401,
                    'Неверный логин или пароль',
                );
                return;
            }

            const user = users.find(
                (item) =>
                    item.Id ===
                    userCredentials.userId,
            );

            if (!user) {
                sendError(
                    response,
                    500,
                    'Пользователь не найден',
                );
                return;
            }

            sendJson(
                response,
                200,
                user,
            );
        } catch {
            sendError(
                response,
                400,
                'Некорректное тело запроса',
            );
        }

        return;
    }

    if (
        request.method === 'GET' &&
        url.pathname ===
        '/api/users/current'
    ) {
        const currentUser =
            getCurrentUser();

        if (!currentUser) {
            sendError(
                response,
                404,
                'Текущий пользователь не найден',
            );
            return;
        }

        sendJson(
            response,
            200,
            currentUser,
        );

        return;
    }

    if (
        request.method === 'GET' &&
        url.pathname ===
        '/api/users/labels'
    ) {
        sendJson(
            response,
            200,
            userLabels,
        );

        return;
    }

    const subUsersMatch =
        url.pathname.match(
            /^\/api\/users\/([^/]+)\/sub-users$/,
        );

    if (
        request.method === 'GET' &&
        subUsersMatch
    ) {
        const userId =
            subUsersMatch[1];

        const userExists =
            users.some(
                (user) =>
                    user.Id === userId,
            );

        if (!userExists) {
            sendError(
                response,
                404,
                `Пользователь с Id ${userId} не найден`,
            );
            return;
        }

        const subUsers =
            getSubUsers(userId);

        sendJson(
            response,
            200,
            {
                Users: subUsers,
            },
        );

        return;
    }

    sendError(
        response,
        404,
        `Маршрут ${request.method} ${url.pathname} не найден`,
    );
};

const server =
    http.createServer(
        requestHandler,
    );

server.listen(
    PORT,
    HOST,
    () => {
        console.log('');
        console.log(
            `Mock server запущен: http://${HOST}:${PORT}`,
        );
        console.log('');
        console.log(
            'Доступные маршруты:',
        );

        console.log(
            `POST http://${HOST}:${PORT}/api/auth/login`,
        );

        console.log(
            `GET http://${HOST}:${PORT}/api/users/current`,
        );

        console.log(
            `GET http://${HOST}:${PORT}/api/users/1/sub-users`,
        );

        console.log(
            `GET http://${HOST}:${PORT}/api/users/labels`,
        );

        console.log('');
    },
);

const closeServer = () => {
    console.log(
        '\nMock server остановлен',
    );

    server.close(() => {
        process.exit(0);
    });
};

process.on(
    'SIGINT',
    closeServer,
);

process.on(
    'SIGTERM',
    closeServer,
);
