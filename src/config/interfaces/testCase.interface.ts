import { FieldError, TableRowData } from "."
import { FieldValidation } from "./template.interface"

export interface testCaseInterface {
    _id: string
    name: string
    description: string
    categoryId: string
    validationTransaction: FieldValidation[]
    generationTransaction: FieldValidation[]
    selectionTransaction: FieldValidation[]
    templateId: string
    dependOn: string | null
    order: number
    uuid: string
    createdAt: string
    updatedAt: string
    __v: number
}

import { ReactNode } from "react";

export interface TestCaseDetails {
  status: string;
  name: string;
  message: TableRowData | FieldError | ReactNode;
}
