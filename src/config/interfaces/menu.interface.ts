export type MenuServiceRoot = MenuServiceInterface[]

export interface MenuServiceInterface {
    id: string
    name: string
    linkMenu?: string
    children?: MenuServiceInterface[] | []
    items?: ItemsServiceMenu[] | []
}

export interface ItemsServiceMenu {
    name: string
    id: string
    linkMenu?: string
}

export interface MenuSidebarState{
    data: MenuServiceRoot,
}


//Menu props

export interface MenuItem {
    id: string
    name: string
    iconMenu?: React.ReactNode;
    linkMenu?: string;
    items?: ItemsServiceMenu[] | []
    onClickMenu?: () => void;
    children?: MenuItem[] | MenuServiceRoot;
}

export interface RecursiveMenuItemProps {
    item: MenuServiceInterface;
    depth?: number;
    onSelectItem?: (item: MenuServiceInterface | ItemsServiceMenu) => void;
}

export interface HeaderSidebarMenuProps {
    isHide: boolean,
    onToggleMenu: () => void;
}

export interface SeparatorMenuProps {
    onAction?: () => void;
    label: string;
}