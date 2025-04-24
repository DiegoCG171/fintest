import { AsyncStatus } from "."

export type RootRules = Rules[]

export interface Rules {
    _id: string
    version: number
    type: string
    fields: FieldRules[]
    __v: number
}

export interface FieldRules {
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
    rules: FieldRules[];
    status: AsyncStatus;
    error: string | null;
}  
