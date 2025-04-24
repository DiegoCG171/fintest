import { AsyncStatus } from "."

export interface TemplateContextType {
    _id: string
    name: string
    description: string
    category: string
    type: string
    validationTransaction: ValidationTransaction[]
    generationTransaction: GenerationTransaction[]
    uuid: string
    __v: number
    createdAt: string
    updatedAt: string
}

export interface ValidationTransaction {
    idBitmap: string
    isRequired: boolean
    function: string
    value: string
    fields: Field[]
    _id: string
}

export interface Field {
    idBitmap: string
    function: string
    value: string
    fields: unknown[]
    _id: string
}

export interface GenerationTransaction {
    idBitmap: string
    isRequired: boolean
    function: string
    value: string
    fields: unknown[]
    _id: string
}

export interface TemplateContextState {
    template: TemplateContextType | null;
    getTemplates: () => Promise<void>;
}

export interface TemplateState {
    templates: TemplateContextType | [],
    status: AsyncStatus,
    error: null | string,
}
