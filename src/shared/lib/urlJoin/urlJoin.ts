import joinUrl from 'url-join';

export const urlJoin = (...parts: string[]): string => {
  return joinUrl(...parts);
};
