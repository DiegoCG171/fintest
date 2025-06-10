export interface ModalState {
    isOpen: boolean;
    componentKey: ModalComponentKey | null;
    componentProps?: Record<string, unknown>;
}
export interface ModalFormProps {
    mode: 'create' | 'edit'
}

export interface ModalComponentPropsMap {
    ModalFormJson: ModalFormProps;
}

export type ModalComponentKey = keyof ModalComponentPropsMap;