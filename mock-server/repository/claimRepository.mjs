import {
    mkdir,
    readFile,
    writeFile,
} from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
    claims as seedClaims,
} from '../data/claims.mjs';

const DATABASE_FILE_URL = new URL(
    '../database/claims.json',
    import.meta.url,
);

const DATABASE_FILE_PATH =
    fileURLToPath(
        DATABASE_FILE_URL,
    );

const clone = (value) => {
    return structuredClone(value);
};

const ensureDatabase = async () => {
    await mkdir(
        dirname(
            DATABASE_FILE_PATH,
        ),
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
        if (
            error.code !== 'ENOENT'
        ) {
            throw error;
        }

        await writeFile(
            DATABASE_FILE_PATH,
            JSON.stringify(
                seedClaims,
                null,
                2,
            ),
            'utf8',
        );
    }
};

const loadClaims = async () => {
    await ensureDatabase();

    const content =
        await readFile(
            DATABASE_FILE_PATH,
            'utf8',
        );

    const parsed =
        JSON.parse(content);

    if (!Array.isArray(parsed)) {
        throw new Error(
            'Файл database/claims.json должен содержать массив',
        );
    }

    return parsed;
};

let claims = await loadClaims();

let mutationQueue =
    Promise.resolve();

const commit = async (
    nextClaims,
) => {
    await writeFile(
        DATABASE_FILE_PATH,
        JSON.stringify(
            nextClaims,
            null,
            2,
        ),
        'utf8',
    );

    claims = nextClaims;
};

const runMutation = (
    mutation,
) => {
    const result =
        mutationQueue
            .catch(
                () => undefined,
            )
            .then(mutation);

    mutationQueue =
        result.then(
            () => undefined,
            () => undefined,
        );

    return result;
};

const getNextId = () => {
    const maxId =
        claims.reduce(
            (
                currentMax,
                claim,
            ) => {
                const id =
                    Number(
                        claim.ID,
                    );

                return Number.isFinite(
                    id,
                )
                    ? Math.max(
                        currentMax,
                        id,
                    )
                    : currentMax;
            },
            0,
        );

    return maxId + 1;
};

export const getClaims =
    () => {
        return clone(claims);
    };

export const getClaimById = (
    claimId,
) => {
    const claim =
        claims.find(
            (item) =>
                item.ID ===
                claimId,
        );

    return claim
        ? clone(claim)
        : null;
};

export const createClaim = (
    claim,
) => {
    return runMutation(
        async () => {
            const createdClaim = {
                ...clone(claim),

                ID: getNextId(),
            };

            await commit([
                ...claims,
                createdClaim,
            ]);

            return clone(
                createdClaim,
            );
        },
    );
};

export const replaceClaim = (
    claimId,
    claim,
) => {
    return runMutation(
        async () => {
            const claimIndex =
                claims.findIndex(
                    (item) =>
                        item.ID ===
                        claimId,
                );

            if (
                claimIndex === -1
            ) {
                return null;
            }

            const replacement = {
                ...clone(claim),

                ID: claimId,
            };

            const nextClaims = [
                ...claims,
            ];

            nextClaims[
                claimIndex
                ] = replacement;

            await commit(
                nextClaims,
            );

            return clone(
                replacement,
            );
        },
    );
};

export const patchClaim = (
    claimId,
    changes,
) => {
    return runMutation(
        async () => {
            const claimIndex =
                claims.findIndex(
                    (item) =>
                        item.ID ===
                        claimId,
                );

            if (
                claimIndex === -1
            ) {
                return null;
            }

            const updatedClaim = {
                ...claims[
                    claimIndex
                    ],

                ...clone(
                    changes,
                ),

                ID: claimId,
            };

            const nextClaims = [
                ...claims,
            ];

            nextClaims[
                claimIndex
                ] = updatedClaim;

            await commit(
                nextClaims,
            );

            return clone(
                updatedClaim,
            );
        },
    );
};

export const deleteClaim = (
    claimId,
) => {
    return runMutation(
        async () => {
            const claimExists =
                claims.some(
                    (item) =>
                        item.ID ===
                        claimId,
                );

            if (!claimExists) {
                return false;
            }

            const nextClaims =
                claims.filter(
                    (item) =>
                        item.ID !==
                        claimId,
                );

            await commit(
                nextClaims,
            );

            return true;
        },
    );
};
