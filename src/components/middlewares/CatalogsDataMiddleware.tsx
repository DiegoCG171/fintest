import { forwardRef, useMemo } from "react";
import {
  DataMiddlewareProps,
  FormRefHandle,
  TableRowData,
} from "../../config/interfaces";
import { serviceConfig } from "../../config/utils/serviceConfig";
import ComplexFormTable from "../core/table/ComplexFormTable";
import { useAppSelector } from "../../store";
import { mapFieldRulesToFormStructure } from "../../config/utils/mappers";

const CatalogsDataMiddleware = forwardRef<FormRefHandle, DataMiddlewareProps>(
    ({ dataCase = "rules", formType }, ref) => {
        const config = serviceConfig[dataCase as keyof typeof serviceConfig];
        const columns = config.columns;

        const rawRules = useAppSelector((state) => state.rules.rules);

        const mapped = useMemo<TableRowData[]>(() => {
            if (!rawRules?.length) return [];
            return mapFieldRulesToFormStructure(rawRules);
        }, [rawRules]);

        console.log(mapped, 'mapped')

        /* const filtered = useMemo(() => {
        return formType
            ? mapped.filter((row) => row.formType === formType)
            : mapped;
        }, [mapped, formType]); */

        console.log(formType)

        return (
        <ComplexFormTable
            data={mapped}
            columns={columns}
            ref={ref}
            parentpath = {formType}
        />
        );
    }
);

export default CatalogsDataMiddleware;
