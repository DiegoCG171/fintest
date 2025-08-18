import { arrayMove } from "@dnd-kit/sortable";
import { MenuServiceInterface } from "../interfaces";

function findItemOrFolder(tree: MenuServiceInterface[], id: string) {
  let result: any = null;

  function dfs(nodes: MenuServiceInterface[]) {
    for (let node of nodes) {
      if (node.id === id) {
        // Es carpeta destino
        result = { folderNode: node, isFolder: true };
        return;
      }

      // Buscar en items
      const itemIndex = node.items?.findIndex((it) => it.id === id);
      if (itemIndex !== undefined && itemIndex > -1) {
        result = {
          node: node.items[itemIndex],
          parentNode: node,
          index: itemIndex,
          array: node.items,
        };
        return;
      }

      if (node.children?.length) {
        dfs(node.children);
        if (result) return;
      }
    }
  }

  dfs(tree);
  return result;
}

export function moveItemBetweenTrees(
  categoriesTree: MenuServiceInterface[],
  collectionsTree: MenuServiceInterface[],
  activeId: string,
  overId: string
) {
  const newCategories = structuredClone(categoriesTree);
  const newCollections = structuredClone(collectionsTree);

  const activeInCategories = findItemOrFolder(newCategories, activeId);
  const activeInCollections = findItemOrFolder(newCollections, activeId);
  const overInCategories = findItemOrFolder(newCategories, overId);
  const overInCollections = findItemOrFolder(newCollections, overId);

  const active = activeInCategories || activeInCollections;
  const over = overInCategories || overInCollections;

  if (!active || !active.array) return { newCategories, newCollections };
  if (!over) return { newCategories, newCollections };

  console.log("Active:", active);
  console.log(
    "Over node:",
    over.isFolder ? over.folderNode?.id : over.node?.id,
    "isFolder:",
    over.isFolder
  );

  // 🚫 Si active viene de collections y over está en categories → no mover
  if (activeInCollections && overInCategories) {
    console.log("Drop inválido: collections → categories");
    return { newCategories, newCollections };
  }

  // ℹ️ Si active viene de categories y over está en collections → no mover, pero log
  if (activeInCategories && overInCollections) {
    const overCollectionParentId = over.isFolder
      ? over.folderNode?.id
      : over.parentNode?.id;

    console.log("Intento drop inválido: categories → collections");
    console.log("ID del item de categories:", active.node?.id);
    console.log("ID de la carpeta destino en collections:", overCollectionParentId);
    return { newCategories, newCollections };
  }

  // 1️⃣ Reordenar en mismo array
  if (over.array && active.array === over.array) {
    active.array.splice(
      0,
      active.array.length,
      ...arrayMove(active.array, active.index, over.index)
    );
    return { newCategories, newCollections };
  }

  // 2️⃣ Determinar carpeta destino
  let targetFolder: MenuServiceInterface | null = null;
  if (over.isFolder) {
    targetFolder = over.folderNode ?? null;
  } else if (over.parentNode) {
    targetFolder = over.parentNode;
  }

  // 3️⃣ Mover dentro de carpeta o después de otro item
  if (targetFolder) {
    const [moved] = active.array.splice(active.index, 1);

    if (!targetFolder.items) targetFolder.items = [];
    targetFolder.items.push(moved);

    console.log("Dropping into folder:", targetFolder.id);
    console.log("Folder items before:", targetFolder.items.map(i => i.id), targetFolder);
    console.log("Item moved:", moved.id);
    return { newCategories, newCollections };
  }

  return { newCategories, newCollections };
}
