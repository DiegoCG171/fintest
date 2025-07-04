<<<<<<< HEAD
export const generateLinkMenu = (parentName: string, itemName: string) => {
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD") // Normaliza acentos
      .replace(/[\u0300-\u036f]/g, "") // Elimina marcas de acento
      .replace(/[^\w\s-]/g, "") // Elimina caracteres especiales
      .trim()
      .replace(/\s+/g, "-"); // Espacios a guiones

  return `${slugify(parentName)}/${slugify(itemName)}`;
=======
export const generateLinkMenu = (parentName: string, itemId: string) => {
  return `${parentName}/${itemId}`;
>>>>>>> d3267b6 (Merged in hotfix/add-breadcrumb-from-service (pull request #18))
}
