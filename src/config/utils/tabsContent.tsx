import TabbedTableForm from "../../components/UI/Tabs/TabbedTableForm";
import { ItemsServiceMenu, MenuServiceInterface, TabConfigInterface } from "../interfaces";

export const tabsContent = (
    templateId: string,
    canEdit: boolean,
    origin: "collections" | "categories"
    ) => [
    {
        label: "Validación",
        templateId,
        formType: "validationTransaction",
        canEdit,
        origin,
    },
    {
        label: "Generación",
        templateId,
        formType: "generationTransaction",
        canEdit,
        origin,
    },
    {
        label: "Selección",
        templateId,
        formType: "selectionTransaction",
        canEdit,
        origin,
    },
    {
        label: "Dependencia",
        templateId,
        formType: "dependOnTransaction",
        canEdit,
        origin,
    },
];

export const extractLinkMenus = (data: MenuServiceInterface[]) => {
    const result: (ItemsServiceMenu | MenuServiceInterface)[] = [];
    const getItems = (nodes: MenuServiceInterface[]) => {
        nodes.forEach((node) => {
        if (node.linkMenu) {
            result.push({
            id: node.id,
            name: node.name,
            linkMenu: node.linkMenu,
            });
        }
        node.items?.forEach((item) => {
            if (item.linkMenu) {
            result.push({
                id: item.id,
                name: item.name,
                linkMenu: item.linkMenu,
            });
            }
        });

        if (node.children && node.children.length > 0) {
            getItems(node.children);
        }
        });
    };

    getItems(data);
    return result;
};

export const getConfigTab = (
    data: MenuServiceInterface[],
    origin: "collections" | "categories",
    canEdit: boolean
    ) => {
    const result: TabConfigInterface = {};
    const basicTab = extractLinkMenus(data);
    basicTab.forEach((item) => {
        if (item.linkMenu) {
        result[item.linkMenu] = [
            {
            label: item.name,
            content: (
                <TabbedTableForm tabs={tabsContent(item.id, canEdit, origin)} />
            ),
            canEdit,
            origin
            },
        ];
        }
    });
    return result;
};
