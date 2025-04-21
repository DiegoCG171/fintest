import { forwardRef, useEffect, useState } from "react";
import { DataMiddlewareProps, FormRefHandle, TableRowData } from "../../config/interfaces";
import { serviceConfig } from "../../config/utils/serviceConfig";
import { safeCall } from "../../config/utils/safeCall";
import ComplexFormTable from "../core/table/ComplexFormTable";

const CatalogsDataMiddleware = forwardRef<FormRefHandle, DataMiddlewareProps>(
    ({ payload = undefined, dataCase = "rules" }, ref) => {
    const [data, setData] = useState<Array<TableRowData>>([]);
    const columns = serviceConfig.rules.columns;
    useEffect(() => {
        const config = serviceConfig[dataCase as keyof typeof serviceConfig];
        if (!config) {
        console.warn(`${dataCase.toUpperCase} no se encuentra configurado`);
        return;
        }
        const fetchData = async () => {
        try {
            const response = await safeCall(config.serviceMethod, payload);
            const mapped = config.mapData(response);
            setData(mapped);
            
        } catch (error) {
            console.error("Error fetching data:", error); 
        }
        };

        fetchData();
    }, [dataCase, payload]);

    return (
    <>
        <ComplexFormTable data={data} columns={columns} ref={ref}></ComplexFormTable>
    </>
);
})
export default CatalogsDataMiddleware;
