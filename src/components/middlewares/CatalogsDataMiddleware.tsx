import { forwardRef, useMemo } from "react";
import {
  DataMiddlewareProps,
  FormRefHandle,
  TableRowData,
} from "../../config/interfaces";
import { serviceConfig } from "../../config/utils/serviceConfig";
import ComplexFormTable from "../UI/table/ComplexFormTable";
import { useAppSelector } from "../../store";
import {
  combineTemplateData,
  mapFieldRulesToFormStructure,
} from "../../config/utils/mappers";
import { useToast } from "../../config/hooks/useToast";

const CatalogsDataMiddleware = forwardRef<FormRefHandle, DataMiddlewareProps>(
  ({ dataCase = "rules", formType, templateId }, ref) => {
    const { showToast } = useToast();
    const config = serviceConfig[dataCase as keyof typeof serviceConfig];
    const columns = config.columns;

    const rawRules = useAppSelector((state) => state.rules.rules);
    const templates = useAppSelector((state) => state.templates.templates);

    const mappedRules = useMemo<TableRowData[]>(() => {
      if (!rawRules?.length) return [];
      return mapFieldRulesToFormStructure(rawRules);
    }, [rawRules]);

    const templateById = useMemo(() => {
      if (templateId) return templates.find((t) => t._id === templateId);
    }, [templateId, templates]);

    const combinedData = useMemo(() => {
      if (!templateById) return [];
      switch (formType) {
        case "validation":
          return combineTemplateData(
            templateById.validationTransaction,
            mappedRules
          );
        case "generation":
          return combineTemplateData(
            templateById.generationTransaction,
            mappedRules
          );
        default:
          return [];
      }
    }, [formType, mappedRules, templateById]);

    const isLoading = !templateById || !combinedData.length;

    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <p>Cargando datos del template...</p>
        </div>
      );
    }

    return (
      <ComplexFormTable
        data={combinedData}
        columns={columns}
        ref={ref}
        parentpath={formType}
      />
    );
  }
);

export default CatalogsDataMiddleware;
