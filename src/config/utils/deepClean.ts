export function deepClean<T>(obj: T, keysToRemove: string[]): T {
    if (Array.isArray(obj)) {
        return obj.map((item) => deepClean(item, keysToRemove)) as T;
    }

    if (typeof obj === 'object' && obj !== null) {
        const cleaned = {} as { [K in keyof T]: T[K] };
        for (const key of Object.keys(obj) as Array<keyof T>) {
            if (!keysToRemove.includes(key as string)) {
                const value = obj[key];
                cleaned[key] = deepClean(value, keysToRemove);
            }
        }
        return cleaned as T;
    }

    return obj;
}