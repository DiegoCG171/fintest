import { AsyncStatus } from "."

/*TODO: Mejorar interfaces*/

// GET

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

export type CreateTemplate = Omit<TemplateContextType, "_id" | "uuid" | "__v" | "createdAt" | "updatedAt">;



export interface ValidationTransaction {
    idBitmap: string
    isRequired?: boolean
    function?: string
    value?: string | null
    fields?: FieldValidation[]
    _id?: string
}

export interface FieldValidation {
    idBitmap?: string
    function?: string
    isRequired?: boolean
    value?: string | null
    fields?: FieldValidation[]
    _id?: string
}

// PATCH

export interface PatchGenerationTemplate {
    generationTransaction?: GenerationTransaction[]
    validationTransaction?: GenerationTransaction[]
}

export interface GenerationTransaction {
    idBitmap: string
    function: string | undefined
    value?: string | number | boolean | undefined
    fields?: FieldUpdateTemplate[]
    isRequired?: boolean
}

export interface FieldUpdateTemplate {
    idBitmap: string
    function?: string | undefined,
    value?: string | number | boolean | undefined,
    fields?: Field2[]
    isRequired?: boolean
}

export interface Field2 {
    idBitmap: string
    function: string
    value?: string | number | boolean | undefined,
    isRequired?: boolean
}


// Slice

export interface TemplateState {
    templates: TemplateRoot | [],
    getStatus: AsyncStatus,
    getError: null | string,
    updateStatus: AsyncStatus,
    updateError: null | string,
    createStatus: AsyncStatus,
    createError: null | string
}
