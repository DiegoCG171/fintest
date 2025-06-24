export interface MenuServiceInterface {
    id: string
    name: string
    pathMenu?: string
    linkMenu?: string
    children?: MenuServiceInterface[] | []
    items?: ItemsServiceMenu[] | []
}

export interface ItemsServiceMenu {
    name: string
    id: string
    linkMenu?: string
}

export interface MenuSidebarState {
    categoriesMenu: MenuServiceInterface[],
    collectionsMenu: MenuServiceInterface[],
    isCollapsed: boolean,
    createCollectionMenu: boolean;
    updateTestCase: MenuServiceInterface | null;
    loading: boolean;
    idTestCase: string;
}

//Menu props
export interface MenuItem {
    id: string
    name: string
    iconMenu?: React.ReactNode;
    linkMenu?: string;
    items?: ItemsServiceMenu[] | []
    onClickMenu?: () => void;
    children?: MenuItem[] | MenuServiceInterface[];
}

export interface RecursiveMenuItemProps {
    item: MenuServiceInterface;
    depth?: number;
    optionsActive: boolean
    onSelectItem?: (item: MenuServiceInterface | ItemsServiceMenu) => void;
    buildOptions?: (item: ItemsServiceMenu) => ContextMenuOption[];
}

export interface HeaderSidebarMenuProps {
    isHide: boolean,
    onToggleMenu: () => void;
}

export interface SeparatorMenuProps {
    onAction?: () => void;
    label: string;
}

//Menu context
export interface PopMenuContextProps {
    openMenu: (event: React.MouseEvent<HTMLElement>, data: ContextMenuOption[]) => void;
    closeMenu: () => void;
}

export interface ContextMenuOption {
    item: {
        label: string;
        id: string;
        link?: string;
        icon?: React.ReactNode;
    };
    action: () => void;
    disabled?: boolean;
    danger?: boolean;
}
