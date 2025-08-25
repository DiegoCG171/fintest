// hooks/useSidebarDnd.ts
import { useParams } from "react-router-dom";
import { updateTemplateThunk, useAppDispatch } from "../../store";
import { MenuServiceInterface } from "../interfaces";
import { useToast } from "./useToast";
import { useCallback, useState } from "react";
import {
  closestCenter,
  DndContextProps,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { moveItemBetweenTrees } from "../utils/moveItemInItems";
import {
  createTestCaseThunk,
  getCollectionsThunk,
  updateCollectionThunk,
} from "../../store/slices/collections/collections.thunk";

type UseSidebarDndArgs = {
  categoriesTree: MenuServiceInterface[];
  collectionsTree: MenuServiceInterface[];
  setCategoriesTree: (next: MenuServiceInterface[]) => void;
  setCollectionsTree: (next: MenuServiceInterface[]) => void;
};

export function useSidebarDnd({
  categoriesTree,
  collectionsTree,
  setCategoriesTree,
  setCollectionsTree,
}: UseSidebarDndArgs) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { method, type } = useParams();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor /*, { activationConstraint: { distance: 5 } }*/));

  const handleDragEnd = useCallback(
    async ({ active, over }: DragEndEvent) => {
      if (!over) return;

      // Snapshot para rollback
      const prevCategories = categoriesTree;
      const prevCollections = collectionsTree;

      const { newCategories, newCollections, action, metadata } =
        moveItemBetweenTrees(
          categoriesTree,
          collectionsTree,
          active.id as string,
          over.id as string
        );

      // ✅ Actualiza UI al instante (optimista)
      setCategoriesTree(newCategories);
      setCollectionsTree(newCollections);

      try {
        if (action === "create_test_case" && metadata) {
          await dispatch(
            createTestCaseThunk({
              id_template: metadata.templateId!,
              id_collection: metadata.collectionId!,
            })
          ).unwrap();
          await dispatch(getCollectionsThunk(`${method}/${type}`)).unwrap();
          showToast("Caso de prueba agregado correctamente", "success");
        }

        if (action === "reorder" && metadata?.sourceTree === "collections") {
          await dispatch(
            updateCollectionThunk({
              id: metadata.sourceParentId!,
              payload: { cases: metadata.reorderedArray },
            })
          ).unwrap();
        }

        if (action === "move" && metadata?.sourceTree === "categories") {
          await dispatch(
            updateTemplateThunk({
              id: metadata.itemId!,
              payload: { categoryId: metadata.targetParentId },
            })
          ).unwrap();
        }
      } catch (err) {
        // 🔁 Rollback si falla
        setCategoriesTree(prevCategories);
        setCollectionsTree(prevCollections);
        showToast((err as string) || "No se pudo aplicar el cambio", "error");
      } finally {
        setActiveId(null);
        setOverId(null);
      }
    },
    [
      categoriesTree,
      collectionsTree,
      dispatch,
      method,
      type,
      setCategoriesTree,
      setCollectionsTree,
      showToast,
    ]
  );

  const dndContextProps: Partial<DndContextProps> = {
    sensors,
    collisionDetection: closestCenter,
    onDragStart: ({ active }) =>
      setActiveId((active?.data?.current?.name as string) ?? null),
    onDragCancel: () => setActiveId(null),
    onDragEnd: handleDragEnd,
    onDragOver: ({ over }) => setOverId(over?.id?.toString() ?? null),
  };

  return { activeId, overId, dndContextProps };
}
