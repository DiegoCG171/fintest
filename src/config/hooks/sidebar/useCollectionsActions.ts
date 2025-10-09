import { useParams } from "react-router-dom";
import { updateTestCaseThunk, useAppDispatch, useAppSelector } from "../../../store";
import {
  createCollectionThunk,
  getCollectionsThunk,
  updateCollectionThunk,
} from "../../../store/slices/collections/collections.thunk";
import { useToast } from "../useToast";
import {
  CreateSessionPayload,
  createSessionThunk,
  RunnableType,
} from "../../../store/slices/sessions/session.thunk";
import { toCapitalCase } from "../../utils";

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

const useCollectionsActions = ({
  setEditingCollectionId,
  setRenameTestCaseId,
  setIsCreatingCollection,
}: {
  setEditingCollectionId: (id: string | undefined) => void;
  setRenameTestCaseId: (id: string | undefined) => void;
  setIsCreatingCollection: Setter<boolean>;
}) => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { method, type } = useParams();
  const { configHost, configPort } = useAppSelector(state => state.server)

  const createCollecetion = async (name: string) => {
    const origin = method?.toUpperCase();
    try {
      await dispatch(
        createCollectionThunk({
          name,
          origin,
          processingMethod: toCapitalCase(type ?? ""),
        })
      ).unwrap();
      await dispatch(getCollectionsThunk(`${method}/${type}`))
        .unwrap()
        .catch((err) => console.error("Error cargando colecciones:", err));
      showToast("Colección creada exitoramente", "success");
      setIsCreatingCollection(false);
    } catch (err) {
      showToast(err as string | "Error al crear la colección", "error");
    } finally {
      setIsCreatingCollection(false);
    }
  };

  const renameCollection = async (id: string, name: string) => {
    try {
      await dispatch(updateCollectionThunk({ id, payload: { name } })).unwrap();
      await dispatch(getCollectionsThunk(`${method}/${type}`))
        .unwrap()
        .catch((err) => console.error("Error cargando colecciones:", err));
      showToast("Colección renombrada exitoramente", "success");
      setTimeout(() => {
        setEditingCollectionId(undefined);
      }, 300);
    } catch (error) {
      showToast(error as string | "Error al renombrar la colección", "error");
      setEditingCollectionId(undefined);
    } finally {
      setEditingCollectionId(undefined);
    }
  };

  const renameTestCase = async (id: string, name: string) => {
    try {
      await dispatch(updateTestCaseThunk({ id, payload: { name } })).unwrap();
      await dispatch(getCollectionsThunk(`${method}/${type}`)).unwrap();
      setRenameTestCaseId(undefined);
      showToast("Caso de prueba actualizado exitoramente", "success");
    } catch (error) {
      showToast(
        error as string | "Error al renombrar el casod e prueba",
        "error"
      );
      setRenameTestCaseId(undefined);
    }
  };

  const createSession = (runnableId: string, runnableType: RunnableType) => {
    const sessionPayload: CreateSessionPayload = {
      processingMethod: type!,
      toExecute: [
        {
          runnableId,
          runnableType,
        },
      ],
    };

    if (type === "emmisor") {
      sessionPayload.ip = configHost;
      sessionPayload.portNumber = configPort;
    }

    dispatch(createSessionThunk(sessionPayload));
  };

  return {
    createCollecetion,
    createSession,
    renameCollection,
    renameTestCase,
  };
};
export default useCollectionsActions;
