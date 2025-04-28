import { AsyncStatus } from "."

export type TemplateRoot = TemplateContextType[]

export interface TemplateContextType {
    _id: string
    name: string
    description: string
    category: string
    type: string
    validationTransaction: ValidationTransaction[]
    generationTransaction: ValidationTransaction[]
    uuid: string
    __v: number
    createdAt: string
    updatedAt: string
}

export interface ValidationTransaction {
    idBitmap: string
    isRequired?: boolean
    function: string
    value: string
    fields: FieldValidation[]
    _id: string
}

export interface FieldValidation {
    idBitmap: string
    function: string
    value: string
    fields: FieldValidation[]
    _id: string
}

export interface TemplateState {
    templates: TemplateRoot | [],
    status: AsyncStatus,
    error: null | string,
}
