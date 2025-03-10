import { createSlice } from "@reduxjs/toolkit";


interface tabsCollections {
    tab: string;
    breadcrumbs: string[];
    id: string;
}

interface ModalConfig {
    isOpen: boolean;
}

interface ModalUpdateTemplate {
    isOpen: boolean;
    template: any;
}

interface InitialState {
    validateSectionTx: boolean;
    tabsCollections?: tabsCollections[];
    modalConfig?: ModalConfig;
    modalUpdateTemplate?: ModalUpdateTemplate;
    generalLoading: boolean;
}   

const initialState: InitialState = {
    validateSectionTx: false,
    tabsCollections: [],
    modalConfig: {
        isOpen: false,
    },
    modalUpdateTemplate: {
        isOpen: false,
        template: {}
    },
    generalLoading: false,
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: { 
        onValidateSection: (state, action) => {
            state.validateSectionTx = action.payload;
        },
        onSetTabsCollections: (state, action) => {
            const exists = state.tabsCollections?.some(tab => tab.id === action.payload.uuid);
            if (!exists) {
                state.tabsCollections?.push({
                    tab: action.payload.subItem,
                    breadcrumbs: [action.payload.item, action.payload.subItem],
                    id: action.payload.uuid
                });
            }
        },
        onRemoveTabCollection: (state, action) => {
            state.tabsCollections = state.tabsCollections?.filter(tab => tab.id !== action.payload);
        },
        onToggleModalConfig: (state, action) => {
            state.modalConfig = {
                isOpen: action.payload
            } 
        },
        onToggleModalUpdate: (state, action) => {
            state.modalUpdateTemplate = {
                isOpen: action.payload.isOpen,
                template: action.payload.template
            } 
        },
        onToggleGeneralLoading: (state, action) => {
            state.generalLoading = action.payload
        }
    }
})


export const { onValidateSection, onSetTabsCollections, onRemoveTabCollection, onToggleModalConfig, onToggleModalUpdate, onToggleGeneralLoading} = uiSlice.actions