export const getBackgroundColorForLevel = (level: number): string => {
  const colors = ["#ffffff", "#f9f9f9", "#ffffff", "#eaeaea", "#e0e0e0"];
  return colors[level] || colors[colors.length - 1];
};
