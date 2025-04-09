import { getRules } from "../../services";
import { BreakingRule, FieldRules, RootRules, Specification } from "../interfaces";

export const serviceConfig = {
    rules: {
        serviceMethod: getRules,
        mapData: (response: RootRules) =>
            response[0].fields.map((rule: FieldRules) => {
                // Nivel 3: specification
                const level3Children = (children: BreakingRule) =>
                    children.specification?.map((spec: Specification) => ({
                        '': '',
                        Campo: spec.id,
                        Nombre: spec.displayName,
                        Requerido: '',
                        'Función': '',
                        'Parámetro': '',
                        _id: spec._id,
                    })) ?? [];

                // Nivel 2: breakingRules
                const level2Children = Array.isArray(rule.breakingRules)
                    ? rule.breakingRules.map((br: BreakingRule) => ({
                        '': '',
                        Campo: br.id,
                        Nombre: br.displayName,
                        Requerido: '',
                        'Función': '',
                        'Parámetro': '',
                        ' ': level3Children(br),
                        _id: br._id,
                    }))
                    : [];

                // Nivel 1: field rule principal
                return {
                    '': 'true',
                    Campo: rule.idBitmap,
                    Nombre: rule.displayName,
                    Requerido: rule.isLengthVariable,
                    'Función': rule.dataType,
                    'Parámetro': rule.length,
                    ' ': level2Children,
                    _id: rule._id,
                };
            }),
    },
    /* orders: {
        //serviceMethod: (payload: any) => apiService.postOrders(payload),
        serviceMethod: getRules,
        mapData: (response: any) => response.orders.map((order: any) => {
            // Si el pedido tiene hijos (detalles), los mapeamos
            const children = order.details?.map((detail: any) => ({
                ID: detail.id,
                'Product Name': detail.productName,
                Quantity: detail.quantity,
                Price: detail.price,
            })) || [];

            return {
                'Order ID': order.id,
                Customer: order.customerName,
                Total: order.totalAmount,
                children,  // Guardamos los hijos en una propiedad
            };
        }),
    }, */
};