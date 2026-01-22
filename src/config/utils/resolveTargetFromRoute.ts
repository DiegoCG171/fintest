export const resolveTargetFromRoute = () => {
  const path = window.location.pathname;
  if (path.includes("emmisor")) return "emmisor";
  if (path.includes("acquirer")) return "acquirer";

  return "emmisor";
};
