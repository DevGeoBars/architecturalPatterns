import http from 'node:http';

import { issueStaticDictionaries } from './data/issueStaticDictionaries.mjs';
import {
    credentials,
    subUserIdsByUserId,
    userLabels,
    users,
} from './data/users.mjs';

import {
    createExpiredSessionCookie,
    createSession,
    createSessionCookie,
    deleteSession,
    getSession,
} from './model/session.mjs';

import { getClaims } from './repository/claimRepository.mjs';

import {
    createIssue,
    deleteIssue,
    getIssueById,
    getIssues,
    patchIssue,
    replaceIssue,
} from './repository/issueRepository.mjs';

const HOST = 'localhost';
const PORT = 3001;
const MAX_BODY_SIZE_BYTES = 1024 * 1024;

const getCorsHeaders = (request) => {
    const origin = request.headers.origin;

    if (!origin) {
        return {};
    }

    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        Vary: 'Origin',
    };
};

const sendJson = (
  request,
  response,
  statusCode,
  data,
  additionalHeaders = {},
) => {
    response.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        ...getCorsHeaders(request),
        ...additionalHeaders,
    });

    response.end(JSON.stringify(data));
};

const sendNoContent = (request, response) => {
    response.writeHead(204, getCorsHeaders(request));
    response.end();
};

const sendError = (request, response, statusCode, message) => {
    sendJson(request, response, statusCode, { message });
};

const readJsonBody = (request) => {
    return new Promise((resolve, reject) => {
        let body = '';
        let bodySize = 0;

        request.on('data', (chunk) => {
            bodySize += chunk.length;

            if (bodySize > MAX_BODY_SIZE_BYTES) {
                reject(new Error('Тело запроса слишком большое'));
                request.destroy();
                return;
            }

            body += chunk.toString();
        });

        request.on('end', () => {
            if (!body) {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error('Некорректный JSON'));
            }
        });

        request.on('error', reject);
    });
};

const isObject = (value) => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const getUserById = (userId) => {
    return users.find((user) => user.Id === userId);
};

const getCurrentUser = (request) => {
    const session = getSession(request);

    if (!session) {
        return null;
    }

    return getUserById(session.userId) ?? null;
};

const requireCurrentUser = (request, response) => {
    const currentUser = getCurrentUser(request);

    if (!currentUser) {
        sendError(request, response, 401, 'Пользователь не авторизован');
        return null;
    }

    return currentUser;
};

const getSubUsers = (userId) => {
    const subUserIds = subUserIdsByUserId[userId] ?? [];

    return users.filter((user) => subUserIds.includes(user.Id));
};

const normalizeRequiredString = (value) => {
    return typeof value === 'string' ? value.trim() : '';
};

const validateIssuePayload = (payload, { partial = false } = {}) => {
    if (!isObject(payload)) {
        return 'Тело запроса должно быть объектом';
    }

    if (
      (!partial || Object.hasOwn(payload, 'Subject')) &&
      !normalizeRequiredString(payload.Subject)
    ) {
        return 'Поле Subject обязательно';
    }

    if (
      (!partial || Object.hasOwn(payload, 'Content')) &&
      !normalizeRequiredString(payload.Content)
    ) {
        return 'Поле Content обязательно';
    }

    if (
      Object.hasOwn(payload, 'Status') &&
      typeof payload.Status !== 'number'
    ) {
        return 'Поле Status должно быть числом';
    }

    if (
      Object.hasOwn(payload, 'UserStatus') &&
      typeof payload.UserStatus !== 'number'
    ) {
        return 'Поле UserStatus должно быть числом';
    }

    return null;
};

const sanitizeIssuePayload = (payload) => {
    const {
        Id: _id,
        Number: _number,
        CreatedAt: _createdAt,
        UpdatedAt: _updatedAt,
        UpdatedBy: _updatedBy,
        Author: _author,
        AuthorEmail: _authorEmail,
        ...mutableFields
    } = payload;

    return mutableFields;
};

const createIssueModel = (payload, currentUser) => {
    const now = new Date().toISOString();
    const mutableFields = sanitizeIssuePayload(payload);

    return {
        Status: 0,
        Category: 'Запрос информации',
        UserStatus: 0,
        Comments: [],
        RelatedIssues: [],
        RelatedSuggestions: [],
        Labels: [],
        CustomerOrganizationName: currentUser.Company?.Name ?? '',
        ...mutableFields,
        Subject: normalizeRequiredString(payload.Subject),
        Content: normalizeRequiredString(payload.Content),
        CreatedAt: now,
        UpdatedAt: now,
        Author: currentUser.Name,
        AuthorEmail: currentUser.Email,
    };
};

const createReplacementIssue = (
  existingIssue,
  payload,
  currentUser,
) => {
    const now = new Date().toISOString();
    const mutableFields = sanitizeIssuePayload(payload);

    return {
        Status: 0,
        Category: 'Запрос информации',
        Author: existingIssue.Author ?? currentUser.Name,
        AuthorEmail: existingIssue.AuthorEmail ?? currentUser.Email,
        Subject: normalizeRequiredString(payload.Subject),
        Content: normalizeRequiredString(payload.Content),
        UserStatus: 0,
        Comments: [],
        RelatedIssues: [],
        RelatedSuggestions: [],
        Labels: [],
        CustomerOrganizationName: currentUser.Company?.Name ?? '',
        ...mutableFields,
        Id: existingIssue.Id,
        Number: existingIssue.Number,
        CreatedAt: existingIssue.CreatedAt,
        UpdatedAt: now,
        UpdatedBy: currentUser.Name,
    };
};

const createIssuePatch = (payload, currentUser) => {
    const changes = sanitizeIssuePayload(payload);

    if (Object.hasOwn(changes, 'Subject')) {
        changes.Subject = normalizeRequiredString(changes.Subject);
    }

    if (Object.hasOwn(changes, 'Content')) {
        changes.Content = normalizeRequiredString(changes.Content);
    }

    return {
        ...changes,
        UpdatedAt: new Date().toISOString(),
        UpdatedBy: currentUser.Name,
    };
};

const handleClaimCollection = async (request, response) => {
    const currentUser = requireCurrentUser(request, response);

    if (!currentUser) {
        return;
    }

    if (request.method === 'GET') {
        const claims = getClaims();

        sendJson(request, response, 200, {
            Data: claims,
            TotalCount: claims.length,
        });

        return;
    }

    sendError(
      request,
      response,
      405,
      `Метод ${request.method} не поддерживается для /api/claims`,
    );
};

const handleIssueStaticDictionaries = async (
  request,
  response,
  dictionaryName,
) => {
    const currentUser = requireCurrentUser(request, response);

    if (!currentUser) {
        return;
    }

    if (request.method !== 'GET') {
        sendError(
          request,
          response,
          405,
          `Метод ${request.method} не поддерживается для справочника ${dictionaryName}`,
        );

        return;
    }

    const data = issueStaticDictionaries[dictionaryName];

    if (!data) {
        sendError(
          request,
          response,
          404,
          `Справочник ${dictionaryName} не найден`,
        );

        return;
    }

    sendJson(request, response, 200, {
        Data: data,
    });
};

const handleIssueCollection = async (request, response) => {
    const currentUser = requireCurrentUser(request, response);

    if (!currentUser) {
        return;
    }

    if (request.method === 'GET') {
        const issues = getIssues();

        sendJson(request, response, 200, {
            Data: issues,
            TotalCount: issues.length,
        });

        return;
    }

    if (request.method === 'POST') {
        const payload = await readJsonBody(request);
        const validationError = validateIssuePayload(payload);

        if (validationError) {
            sendError(request, response, 400, validationError);
            return;
        }

        const issue = createIssueModel(payload, currentUser);
        const createdIssue = await createIssue(issue);

        sendJson(request, response, 201, createdIssue, {
            Location: `/api/issues/${createdIssue.Id}`,
        });

        return;
    }

    sendError(
      request,
      response,
      405,
      `Метод ${request.method} не поддерживается для /api/issues`,
    );
};

const handleIssueItem = async (
  request,
  response,
  issueId,
) => {
    const currentUser = requireCurrentUser(request, response);

    if (!currentUser) {
        return;
    }

    const existingIssue = getIssueById(issueId);

    if (!existingIssue) {
        sendError(
          request,
          response,
          404,
          `Обращение с Id ${issueId} не найдено`,
        );

        return;
    }

    if (request.method === 'GET') {
        sendJson(request, response, 200, existingIssue);
        return;
    }

    if (request.method === 'PUT') {
        const payload = await readJsonBody(request);
        const validationError = validateIssuePayload(payload);

        if (validationError) {
            sendError(request, response, 400, validationError);
            return;
        }

        const replacement = createReplacementIssue(
          existingIssue,
          payload,
          currentUser,
        );

        const updatedIssue = await replaceIssue(
          issueId,
          replacement,
        );

        sendJson(request, response, 200, updatedIssue);
        return;
    }

    if (request.method === 'PATCH') {
        const payload = await readJsonBody(request);

        if (!isObject(payload) || Object.keys(payload).length === 0) {
            sendError(
              request,
              response,
              400,
              'Не переданы поля для изменения',
            );

            return;
        }

        const validationError = validateIssuePayload(payload, {
            partial: true,
        });

        if (validationError) {
            sendError(request, response, 400, validationError);
            return;
        }

        const mutablePayload = sanitizeIssuePayload(payload);

        if (Object.keys(mutablePayload).length === 0) {
            sendError(
              request,
              response,
              400,
              'Не переданы изменяемые поля',
            );

            return;
        }

        const changes = createIssuePatch(
          mutablePayload,
          currentUser,
        );

        const updatedIssue = await patchIssue(
          issueId,
          changes,
        );

        sendJson(request, response, 200, updatedIssue);
        return;
    }

    if (request.method === 'DELETE') {
        await deleteIssue(issueId);

        sendNoContent(request, response);
        return;
    }

    sendError(
      request,
      response,
      405,
      `Метод ${request.method} не поддерживается для /api/issues/${issueId}`,
    );
};

const requestHandler = async (request, response) => {
    if (request.method === 'OPTIONS') {
        response.writeHead(204, getCorsHeaders(request));
        response.end();

        return;
    }

    const url = new URL(
      request.url ?? '/',
      `http://${request.headers.host}`,
    );

    console.log(`${request.method} ${url.pathname}`);

    try {
        if (
          request.method === 'POST' &&
          url.pathname === '/api/auth/login'
        ) {
            const body = await readJsonBody(request);

            const login =
              typeof body.login === 'string'
                ? body.login.trim()
                : '';

            const password =
              typeof body.password === 'string'
                ? body.password
                : '';

            if (!login || !password) {
                sendError(
                  request,
                  response,
                  400,
                  'Логин и пароль обязательны',
                );

                return;
            }

            const userCredentials = credentials.find(
              (item) =>
                item.login === login &&
                item.password === password,
            );

            if (!userCredentials) {
                sendError(
                  request,
                  response,
                  401,
                  'Неверный логин или пароль',
                );

                return;
            }

            const user = getUserById(
              userCredentials.userId,
            );

            if (!user) {
                sendError(
                  request,
                  response,
                  500,
                  'Пользователь не найден',
                );

                return;
            }

            deleteSession(request);

            const { sessionId } = createSession(user.Id);

            sendJson(
              request,
              response,
              200,
              user,
              {
                  'Set-Cookie': createSessionCookie(sessionId),
              },
            );

            return;
        }

        if (
          request.method === 'POST' &&
          url.pathname === '/api/auth/logout'
        ) {
            deleteSession(request);

            sendJson(
              request,
              response,
              200,
              {
                  success: true,
              },
              {
                  'Set-Cookie': createExpiredSessionCookie(),
              },
            );

            return;
        }

        if (
          request.method === 'GET' &&
          url.pathname === '/api/users/current'
        ) {
            const currentUser = getCurrentUser(request);

            if (!currentUser) {
                sendError(
                  request,
                  response,
                  401,
                  'Пользователь не авторизован',
                );

                return;
            }

            sendJson(
              request,
              response,
              200,
              currentUser,
            );

            return;
        }

        if (url.pathname === '/api/claims') {
            await handleClaimCollection(
              request,
              response,
            );

            return;
        }

        if (url.pathname === '/api/issues') {
            await handleIssueCollection(
              request,
              response,
            );

            return;
        }

        const issueStaticDictionariesMatch = url.pathname.match(
          /^\/api\/issues\/reference-data\/(products|categories|os-types)$/,
        );

        if (issueStaticDictionariesMatch) {
            await handleIssueStaticDictionaries(
              request,
              response,
              issueStaticDictionariesMatch[1],
            );

            return;
        }

        const issueMatch = url.pathname.match(
          /^\/api\/issues\/([^/]+)$/,
        );

        if (issueMatch) {
            await handleIssueItem(
              request,
              response,
              decodeURIComponent(issueMatch[1]),
            );

            return;
        }

        if (
          request.method === 'GET' &&
          url.pathname === '/api/users/labels'
        ) {
            sendJson(
              request,
              response,
              200,
              userLabels,
            );

            return;
        }

        const subUsersMatch = url.pathname.match(
          /^\/api\/users\/([^/]+)\/sub-users$/,
        );

        if (
          request.method === 'GET' &&
          subUsersMatch
        ) {
            const userId = subUsersMatch[1];

            const userExists = users.some(
              (user) => user.Id === userId,
            );

            if (!userExists) {
                sendError(
                  request,
                  response,
                  404,
                  `Пользователь с Id ${userId} не найден`,
                );

                return;
            }

            sendJson(
              request,
              response,
              200,
              {
                  Users: getSubUsers(userId),
              },
            );

            return;
        }

        sendError(
          request,
          response,
          404,
          `Маршрут ${request.method} ${url.pathname} не найден`,
        );
    } catch (error) {
        console.error(error);

        if (
          error instanceof SyntaxError ||
          error.message === 'Некорректный JSON' ||
          error.message === 'Тело запроса слишком большое'
        ) {
            sendError(
              request,
              response,
              400,
              error.message,
            );

            return;
        }

        sendError(
          request,
          response,
          500,
          'Внутренняя ошибка mock-server',
        );
    }
};

const server = http.createServer(requestHandler);

server.listen(PORT, HOST, () => {
    console.log('');
    console.log(`Mock server запущен: http://${HOST}:${PORT}`);
    console.log('');
    console.log('Доступные маршруты:');

    console.log(`POST   http://${HOST}:${PORT}/api/auth/login`);
    console.log(`POST   http://${HOST}:${PORT}/api/auth/logout`);

    console.log(`GET    http://${HOST}:${PORT}/api/users/current`);

    console.log(`GET    http://${HOST}:${PORT}/api/claims`);

    console.log(`GET    http://${HOST}:${PORT}/api/issues`);
    console.log(`POST   http://${HOST}:${PORT}/api/issues`);
    console.log(`GET    http://${HOST}:${PORT}/api/issues/:id`);
    console.log(`PUT    http://${HOST}:${PORT}/api/issues/:id`);
    console.log(`PATCH  http://${HOST}:${PORT}/api/issues/:id`);
    console.log(`DELETE http://${HOST}:${PORT}/api/issues/:id`);

    console.log(
      `GET    http://${HOST}:${PORT}/api/issues/reference-data/products`,
    );

    console.log(
      `GET    http://${HOST}:${PORT}/api/issues/reference-data/categories`,
    );

    console.log(
      `GET    http://${HOST}:${PORT}/api/issues/reference-data/os-types`,
    );

    console.log(
      `GET    http://${HOST}:${PORT}/api/users/1/sub-users`,
    );

    console.log(
      `GET    http://${HOST}:${PORT}/api/users/labels`,
    );

    console.log('');
});

const closeServer = () => {
    console.log('\nMock server остановлен');

    server.close(() => {
        process.exit(0);
    });
};

process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
