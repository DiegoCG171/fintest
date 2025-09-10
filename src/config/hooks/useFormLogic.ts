import { useEffect, useMemo, useRef, useState } from "react";
import { FormConfig, FormData } from "../interfaces/formSettings.interface";
import { useAppDispatch, useAppSelector } from "../../store";
import { useToast } from "./useToast";
import { getEntityId, getInitialFormData } from "../utils/formSettings.utils";

export const useFormLogic = (config: FormConfig) => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const adminState = useAppSelector((state) => state.admin);
  
  const [formData, setFormData] = useState<FormData>({});
  const lastInitKey = useRef<string>("");

  const entityId = useMemo(
    () => getEntityId(config.storeKey, adminState),
    [config.storeKey, adminState]
  );

  const initKey = `${config.storeKey}-${entityId}`;

  useEffect(() => {
    if (lastInitKey.current === initKey) return;

    const initialData = getInitialFormData(config.storeKey, adminState);
    setFormData(initialData);
    lastInitKey.current = initKey;
  }, [initKey, config.storeKey, adminState]);

  return {
    formData,
    setFormData,
    initKey,
    dispatch,
    showToast,
    adminState,
  };
};