export interface ModalState {
    isOpen: boolean;
    componentKey: ModalComponentKey | null;
    componentProps?: Record<string, unknown>;
    loading: boolean;
}
export interface ModalFormProps {
    mode?: 'create' | 'edit'
}

export interface ModalAddToCollectionProps {
    templateId?: string;
}

export interface ModalComponentPropsMap {
    ModalFormJson: ModalFormProps;
    ModalAddToCollection: ModalAddToCollectionProps
}


export type ModalComponentKey = keyof ModalComponentPropsMap;