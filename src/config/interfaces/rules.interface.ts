import { AsyncStatus } from "."
export interface RootRules {
    data: Rules[]
    totalSearch: number
    total: number
    limit: number
    page: number
    pages: number
    order: string
}

export interface Rules {
    schemaId: string
    _id: string
    uuid: string
    version: number
    type: string
    deleteAt: string
    __v: number
    createdAt: string
    updatedAt: string
    fields: Field[]
}
export interface Field {
    positionsLength?: PositionsLength
    idBitmap: string
    displayName: string
    dataType: string
    isLengthVariable: boolean
    length: number
    regex: string
    isBreakeable: boolean
    breakingRules?: BreakingRule[]
    _id: string
}

export interface PositionsLength {
    initPos: number
    finalPos: number
}

export interface BreakingRule {
    id: string
    length: number
    idToken?: string
    displayName: string
    specification: Specification[]
    _id: string
}

export interface Specification {
    id: string
    length: number
    displayName: string
    _id: string
}

export interface RulesState {
    rules: Field[];
    status: AsyncStatus;
    error: string | null;
}


export interface AllRulesState {
    allRulles: Rules[];
    page: number;
    hasMore: boolean;
    status: AsyncStatus;
    error: string | null;
}