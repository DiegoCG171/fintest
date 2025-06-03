export interface Tab {
    route: string;
    label: string;
    canEdit: boolean
}

export interface TabsState {
    dynamicTabs: Tab[];
}