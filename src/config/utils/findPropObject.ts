export const findAllPropObjects = <T extends object>(
  obj: T,
  prop: string
): T[] | undefined => {
  const results: T[] = [];

  const search = (current: unknown): void => {
    if (typeof current !== "object" || current === null) return;

    if (prop in current) {
      results.push(current as T);
    }

    for (const key of Object.keys(current)) {
      const value = (current as Record<string, unknown>)[key];
      search(value);
    }
  };

  search(obj);
  return results.length > 0 ? results : undefined;
};
