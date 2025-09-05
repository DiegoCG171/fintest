// helpers/storage.ts
export const getFilters = <T>(key: string): T | undefined => {
  const stored = localStorage.getItem(key);
  return stored ? (JSON.parse(stored) as T) : undefined;
};

export const updateFilters = <T extends object>(
  key: string,
  partial: Partial<T>
) => {
  const current = getFilters<T>(key) || {};
  const updated = { ...current, ...partial };
  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
};
