import {
    mkdir,
    readFile,
    writeFile,
} from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { issues as seedIssues } from '../data/issues.mjs';

const DATABASE_FILE_URL = new URL(
    '../database/issues.json',
    import.meta.url,
);

const DATABASE_FILE_PATH =
    fileURLToPath(DATABASE_FILE_URL);

const clone = (value) => {
    return structuredClone(value);
};

const ensureDatabase = async () => {
    await mkdir(
        dirname(DATABASE_FILE_PATH),
        {
            recursive: true,
        },
    );

    try {
        await readFile(
            DATABASE_FILE_PATH,
            'utf8',
        );
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }

        await writeFile(
            DATABASE_FILE_PATH,
            JSON.stringify(
                seedIssues,
                null,
                2,
            ),
            'utf8',
        );
    }
};

const loadIssues = async () => {
    await ensureDatabase();

    const content = await readFile(
        DATABASE_FILE_PATH,
        'utf8',
    );

    const parsed = JSON.parse(content);

    if (!Array.isArray(parsed)) {
        throw new Error(
            'Файл database/issues.json должен содержать массив',
        );
    }

    return parsed;
};

let issues = await loadIssues();
let mutationQueue = Promise.resolve();

const commit = async (
    nextIssues,
) => {
    await writeFile(
        DATABASE_FILE_PATH,
        JSON.stringify(
            nextIssues,
            null,
            2,
        ),
        'utf8',
    );

    issues = nextIssues;
};

const runMutation = (mutation) => {
    const result = mutationQueue
        .catch(() => undefined)
        .then(mutation);

    mutationQueue = result.then(
        () => undefined,
        () => undefined,
    );

    return result;
};

const getNextId = () => {
    const maxId = issues.reduce(
        (currentMax, issue) => {
            const id = Number(issue.Id);

            return Number.isFinite(id)
                ? Math.max(currentMax, id)
                : currentMax;
        },
        0,
    );

    return String(maxId + 1);
};

const getNextNumber = () => {
    const maxNumber = issues.reduce(
        (currentMax, issue) => {
            const number = Number(
                issue.Number,
            );

            return Number.isFinite(number)
                ? Math.max(
                      currentMax,
                      number,
                  )
                : currentMax;
        },
        1000,
    );

    return String(maxNumber + 1);
};

export const getIssues = () => {
    return clone(issues);
};

export const getIssueById = (
    issueId,
) => {
    const issue = issues.find(
        (item) => item.Id === issueId,
    );

    return issue ? clone(issue) : null;
};

export const createIssue = (
    issue,
) => {
    return runMutation(async () => {
        const createdIssue = {
            ...clone(issue),
            Id: getNextId(),
            Number: getNextNumber(),
        };

        await commit([
            ...issues,
            createdIssue,
        ]);

        return clone(createdIssue);
    });
};

export const replaceIssue = (
    issueId,
    issue,
) => {
    return runMutation(async () => {
        const issueIndex = issues.findIndex(
            (item) => item.Id === issueId,
        );

        if (issueIndex === -1) {
            return null;
        }

        const nextIssues = [...issues];
        nextIssues[issueIndex] = clone(issue);

        await commit(nextIssues);

        return clone(issue);
    });
};

export const patchIssue = (
    issueId,
    changes,
) => {
    return runMutation(async () => {
        const issueIndex = issues.findIndex(
            (item) => item.Id === issueId,
        );

        if (issueIndex === -1) {
            return null;
        }

        const updatedIssue = {
            ...issues[issueIndex],
            ...clone(changes),
        };

        const nextIssues = [...issues];
        nextIssues[issueIndex] = updatedIssue;

        await commit(nextIssues);

        return clone(updatedIssue);
    });
};

export const deleteIssue = (
    issueId,
) => {
    return runMutation(async () => {
        const issueExists = issues.some(
            (item) => item.Id === issueId,
        );

        if (!issueExists) {
            return false;
        }

        const nextIssues = issues.filter(
            (item) => item.Id !== issueId,
        );

        await commit(nextIssues);

        return true;
    });
};
