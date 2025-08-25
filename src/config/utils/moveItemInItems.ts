import { arrayMove } from "@dnd-kit/sortable";
import { MenuServiceInterface } from "../interfaces";

interface ItemResult {
  node: MenuServiceInterface;
  parentNode: MenuServiceInterface;
  index: number;
  array: MenuServiceInterface[];
  isFolder: false;
}

interface FolderResult {
  folderNode: MenuServiceInterface;
  isFolder: true;
}

type SearchResult = ItemResult | FolderResult | null;

function findItemOrFolder(tree: MenuServiceInterface[], id: string): SearchResult {
  function dfs(nodes: MenuServiceInterface[]): SearchResult {
    for (const node of nodes) {
      // Primero buscar en items de este nodo
      if (node.items?.length) {
        const itemIndex = node.items.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          return {
            node: node.items[itemIndex],
            parentNode: node,
            index: itemIndex,
            array: node.items,
            isFolder: false,
          };
        }
      }

      // Luego verificar si el nodo mismo es el que buscamos (carpeta)
      if (node.id === id) {
        return {
          folderNode: node,
          isFolder: true,
        };
      }

      // Buscar recursivamente en children
      if (node.children?.length) {
        const result = dfs(node.children);
        if (result) return result;
      }
    }
    return null;
  }

  return dfs(tree);
}

export function moveItemBetweenTrees(
  categoriesTree: MenuServiceInterface[],
  collectionsTree: MenuServiceInterface[],
  activeId: string,
  overId: string
): {
  newCategories: MenuServiceInterface[];
  newCollections: MenuServiceInterface[];
  action: 'none' | 'reorder' | 'move' | 'create_test_case';
  metadata?: {
    itemId?: string;
    sourceParentId?: string;
    targetParentId?: string;
    newIndex?: number;
    templateId?: string;
    collectionId?: string;
    sourceTree?: 'categories' | 'collections';
    targetTree?: 'categories' | 'collections';
    reorderedArray?: string[];
  };
} {
  const newCategories = structuredClone(categoriesTree);
  const newCollections = structuredClone(collectionsTree);

  const activeInCategories = findItemOrFolder(newCategories, activeId);
  const activeInCollections = findItemOrFolder(newCollections, activeId);
  const overInCategories = findItemOrFolder(newCategories, overId);
  const overInCollections = findItemOrFolder(newCollections, overId);

  const active = activeInCategories || activeInCollections;
  const over = overInCategories || overInCollections;

  if (!active) {
    return { 
      newCategories, 
      newCollections, 
      action: 'none' 
    };
  }

  if (!over) {
    return { 
      newCategories, 
      newCollections, 
      action: 'none' 
    };
  }

  // Solo permitir mover items, no carpetas
  if (active.isFolder) {
    return { 
      newCategories, 
      newCollections, 
      action: 'none' 
    };
  }
  // No permitir: collections → categories
  if (activeInCollections && overInCategories) {
    return { 
      newCategories, 
      newCollections, 
      action: 'none' 
    };
  }

  //  Caso especial: categories → collections (crear test case)
  if (activeInCategories && overInCollections) {
    const overCollectionId = over.isFolder 
      ? over.folderNode?.id 
      : over.parentNode?.id;
    return {
      newCategories,
      newCollections,
      action: 'create_test_case',
      metadata: {
        templateId: active.node?.id,
        collectionId: overCollectionId
      }
    };
  }

  //  Reordenar en el mismo array
  if (!over.isFolder && active.array === over.array) {
    const newArray = arrayMove(active.array, active.index, over.index);
    active.array.splice(0, active.array.length, ...newArray);
    
    const sourceTree = activeInCategories ? 'categories' : 'collections';
    
    return {
      newCategories,
      newCollections,
      action: 'reorder',
      metadata: {
        itemId: active.node?.id,
        sourceParentId: active.parentNode?.id,
        newIndex: over.index,
        sourceTree: sourceTree as 'categories' | 'collections',
        reorderedArray: [...newArray.map(data => data.id)]
      }
    };
  }

  //  Mover a carpeta diferente
  const targetFolder = over.isFolder ? over.folderNode : over.parentNode;
  
  if (targetFolder && targetFolder !== active.parentNode) {
    // Remover del array original
    const [movedItem] = active.array.splice(active.index, 1);

    // Agregar al array destino
    if (!targetFolder.items) {
      targetFolder.items = [];
    }

    let newIndex = targetFolder.items.length; // Por defecto al final

    if (over.isFolder) {
      // Agregar al final de la carpeta
      targetFolder.items.push(movedItem);
    } else {
      // Insertar después del item over
      newIndex = over.index + 1;
      targetFolder.items.splice(newIndex, 0, movedItem);
    }

    const sourceTree = activeInCategories ? 'categories' : 'collections';
    const targetTree = overInCategories ? 'categories' : 'collections';
    

    return {
      newCategories,
      newCollections,
      action: 'move',
      metadata: {
        itemId: active.node?.id,
        sourceParentId: active.parentNode?.id,
        targetParentId: targetFolder.id,
        newIndex: newIndex,
        sourceTree: sourceTree as 'categories' | 'collections',
        targetTree: targetTree as 'categories' | 'collections'
      }
    };
  }

  // Mover dentro de la misma carpeta pero a posición diferente
  if (targetFolder && targetFolder === active.parentNode && !over.isFolder) {
    const newArray = arrayMove(active.array, active.index, over.index);
    active.array.splice(0, active.array.length, ...newArray);
    
    const sourceTree = activeInCategories ? 'categories' : 'collections';
    
    return {
      newCategories,
      newCollections,
      action: 'reorder',
      metadata: {
        itemId: active.node?.id,
        sourceParentId: active.parentNode?.id,
        newIndex: over.index,
        sourceTree: sourceTree as 'categories' | 'collections',
        reorderedArray: [...newArray.map(data => data.id)]
      }
    };
  }

  // Drop sobre carpeta de la misma jerarquía
  if (over.isFolder && targetFolder && targetFolder !== active.parentNode) {
    // Remover del array original
    const [movedItem] = active.array.splice(active.index, 1);

    // Agregar al final de la carpeta destino
    if (!targetFolder.items) {
      targetFolder.items = [];
    }
    targetFolder.items.push(movedItem);

    const sourceTree = activeInCategories ? 'categories' : 'collections';
    const targetTree = overInCategories ? 'categories' : 'collections';
  
    return {
      newCategories,
      newCollections,
      action: 'move',
      metadata: {
        itemId: active.node?.id,
        sourceParentId: active.parentNode?.id,
        targetParentId: targetFolder.id,
        newIndex: targetFolder.items.length - 1,
        sourceTree: sourceTree as 'categories' | 'collections',
        targetTree: targetTree as 'categories' | 'collections'
      }
    };
  }

  return { 
    newCategories, 
    newCollections, 
    action: 'none' 
  };
}