import { FieldValidation } from "./template.interface"

export interface testCaseInterface {
    _id: string
    name: string
    description: string
    categoryId: string
    validationTransaction: FieldValidation[]
    generationTransaction: FieldValidation[]
    templateId: string
    dependOn: string | null
    order: number
    uuid: string
    createdAt: string
    updatedAt: string
    __v: number
}