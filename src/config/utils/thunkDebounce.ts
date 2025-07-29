/* eslint-disable @typescript-eslint/no-explicit-any */
const debounceCache = new Map<string, NodeJS.Timeout>();

export const debounceThunk = (
    key: string,
    thunk: () => any,
    dispatch: (action: any) => Promise<any>,
    delay: number = 300
): Promise<any> => {
    return new Promise((resolve) => {
        if (debounceCache.has(key)) {
            clearTimeout(debounceCache.get(key)!);
        }

        const timeout = setTimeout(async () => {
            const result = await dispatch(thunk());
            debounceCache.delete(key);
            resolve(result);
        }, delay);

        debounceCache.set(key, timeout);
    });
};
