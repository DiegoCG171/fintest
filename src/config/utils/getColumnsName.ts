export const getColumns = (objects: Record<string, unknown>[]): string[] => {
    return objects.length > 0 ? Object.keys(objects[0]) : [];
};
