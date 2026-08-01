import { randomUUID } from 'node:crypto';

const SESSION_COOKIE_NAME = 'mockSessionId';
const SESSION_TTL_SECONDS = 24 * 60 * 60;
const SESSION_TTL_MS = SESSION_TTL_SECONDS * 1000;

const sessions = new Map();

const parseCookies = (cookieHeader = '') => {
    return cookieHeader
        .split(';')
        .map((cookie) => cookie.trim())
        .filter(Boolean)
        .reduce((cookies, cookie) => {
            const separatorIndex = cookie.indexOf('=');

            if (separatorIndex === -1) {
                return cookies;
            }

            const name = cookie.slice(0, separatorIndex);
            const value = cookie.slice(separatorIndex + 1);

            cookies[name] = decodeURIComponent(value);

            return cookies;
        }, {});
};

const removeExpiredSessions = () => {
    const now = Date.now();

    for (const [sessionId, session] of sessions) {
        if (session.expiresAt <= now) {
            sessions.delete(sessionId);
        }
    }
};

const getSessionId = (request) => {
    const cookies = parseCookies(request.headers.cookie);

    return cookies[SESSION_COOKIE_NAME] ?? null;
};

export const createSession = (userId) => {
    removeExpiredSessions();

    const sessionId = randomUUID();
    const expiresAt = Date.now() + SESSION_TTL_MS;

    sessions.set(sessionId, {
        userId,
        expiresAt,
    });

    return {
        sessionId,
        expiresAt,
    };
};

export const getSession = (request) => {
    const sessionId = getSessionId(request);

    if (!sessionId) {
        return null;
    }

    const session = sessions.get(sessionId);

    if (!session) {
        return null;
    }

    if (session.expiresAt <= Date.now()) {
        sessions.delete(sessionId);
        return null;
    }

    return {
        sessionId,
        ...session,
    };
};

export const deleteSession = (request) => {
    const sessionId = getSessionId(request);

    if (!sessionId) {
        return;
    }

    sessions.delete(sessionId);
};

export const createSessionCookie = (sessionId) => {
    return [
        `${SESSION_COOKIE_NAME}=${encodeURIComponent(sessionId)}`,
        'HttpOnly',
        'Path=/',
        'SameSite=Lax',
        `Max-Age=${SESSION_TTL_SECONDS}`,
    ].join('; ');
};

export const createExpiredSessionCookie = () => {
    return [
        `${SESSION_COOKIE_NAME}=`,
        'HttpOnly',
        'Path=/',
        'SameSite=Lax',
        'Max-Age=0',
    ].join('; ');
};
