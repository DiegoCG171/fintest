export interface Tab {
    route: string;
    label: string;
}

export interface TabsState {
    dynamicTabs: Tab[];
}