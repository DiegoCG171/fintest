import { AsyncStatus } from "."

/*TODO: Mejorar interfaces*/

// GET

export type TemplateRoot = TemplateContextType[]

export interface TemplateContextType {
    _id: string
    name: string
    description: string
    categoryId: string
    type: string
    validationTransaction: FieldValidation[]
    generationTransaction: FieldValidation[]
    uuid: string
    __v: number
    createdAt: string
    updatedAt: string
    path: string[]
}

export type CreateTemplate = Omit<TemplateContextType, "_id" | "uuid" | "__v" | "createdAt" | "updatedAt" | "type">;

export interface JsonTemplateState {
    data: CreateTemplate,
};

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
    name?: string
    description?: string
    category?:string
    type?: string
    generationTransaction?: FieldUpdateTemplate[]
    validationTransaction?: FieldUpdateTemplate[]
}
export interface FieldUpdateTemplate {
    idBitmap: string
    function?: string,
    value?: string | number | boolean,
    fields?: FieldUpdateTemplate[]
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
    getStatusById: AsyncStatus,
    getErrorById: null | string,
    templateById: TemplateContextType | null,

}
