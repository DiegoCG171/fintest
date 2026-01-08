export interface MenuServiceInterface {
    id: string
    name: string
    pathMenu?: string
    linkMenu?: string
    children?: MenuServiceInterface[]
    items?: ItemsServiceMenu[]
}

export interface ItemsServiceMenu {
    name: string
    id: string
    linkMenu?: string
}

export interface MenuSidebarState {
    isCollapsed: boolean;
    menus: Record<string, MenuServiceInterface[]>;
    loading: boolean;
}
/* export interface MenuSidebarState {
    categoriesMenu: MenuServiceInterface[],
    collectionsMenu: MenuServiceInterface[],
    isCollapsed: boolean,
    createCollectionMenu: boolean;
    updateTestCase: MenuServiceInterface | null;
    updateCollection: MenuServiceInterface | null;
    loading: boolean;
    idTestCase: string;
} */

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

export interface SidebarProps {
    onOpenModal: () => void;
}

export interface RecursiveMenuItemProps {
    item: MenuServiceInterface;
    depth?: number;
    optionsActive: boolean
    creatingChildId?: string;
    overId: string;
    onSelectItem?: (item: MenuServiceInterface | ItemsServiceMenu) => void;
    buildOptions?: (item: ItemsServiceMenu) => ContextMenuOption[];
    buildSubItemOptions?: (item: ItemsServiceMenu) => ContextMenuOption[];
    renderCreateChildEditor?: (item: MenuServiceInterface) => React.ReactNode;
    renderEditNodeEditor?: (item: MenuServiceInterface) => React.ReactNode;
    renderChildrenEditNodeEditor?: (item: MenuServiceInterface) => React.ReactNode;
    draggable?: boolean;
}

export interface ItemsListSortableProps {
    items: ItemsServiceMenu[];
    optionsActive?: boolean;
    onClick?: (item: MenuServiceInterface | ItemsServiceMenu) => void;
    buildSubItemOptions?: (item: ItemsServiceMenu) => ContextMenuOption[];
    renderEditNodeEditor?: (item: MenuServiceInterface) => React.ReactNode;
    draggable?: boolean;
}

export interface FolderHeaderDroppableProps {
    item: MenuServiceInterface;
    depth: number;
    expanded: boolean;
    overId?: string | null;
    optionsActive?: boolean;
    onToggleExpand: () => void;
    buildOptions?: (item: ItemsServiceMenu) => ContextMenuOption[];
    buildSubItemOptions?: (item: ItemsServiceMenu) => ContextMenuOption[];
    renderEditNodeEditor?: (item: MenuServiceInterface) => React.ReactNode;
}

export interface InlineCreateChildEditorProps {
    depth: number;
    item: MenuServiceInterface;
    renderCreateChildEditor?: (item: MenuServiceInterface) => React.ReactNode;
}

export interface HeaderSidebarMenuProps {
    isHide: boolean,
    onToggleMenu: () => void;
}

export interface SeparatorMenuProps {
    onAction?: () => void;
    onDownload?: () => void;
    label: string;
}

export interface SidebarSectionProps extends Omit<RecursiveMenuItemProps, "item" | "depth"> {
    separatorMenuProps: SeparatorMenuProps;
    searchTerm: string;
    searchOnItem: boolean;
    resource: MenuServiceInterface[];
    renderSeparatorChildren?: () => React.ReactNode;
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

export interface PropsRecursiveMenuSubItem {
    item: ItemsServiceMenu;
    optionsActive?: boolean;
    onClick?: (item: ItemsServiceMenu) => void;
    buildOptions?: (item: ItemsServiceMenu) => ContextMenuOption[];
    parentId?: string;
    draggable: boolean;
    renderEditNodeEditor?: (item: MenuServiceInterface) => React.ReactNode;
}

export interface ItemInlineEditorProps {
    initialValue?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    onSubmit: (value: string) => Promise<void>;
    onCancel?: () => void;
}
