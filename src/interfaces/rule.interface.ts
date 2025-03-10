export interface Rule {
    _id:     string;
    version: string;
    fields:  Field[];
    __v:     number;
}

export interface Field {
    positionsLength:  PositionsLength | null;
    idBitmap:         string;
    displayName:      string;
    dataType:         DataType;
    isLengthVariable: boolean;
    length:           number;
    regex:            Regex;
    isBreakeable:     boolean;
    breakingRules:    BreakingRule[] | null;
    _id:              string;
}

export interface BreakingRule {
    id:             string;
    length:         number;
    displayName:    string;
    _id:            string;
    specification?: BreakingRule[];
}

export enum DataType {
    Alfanumperico = "Alfanumperico",
    Alfanumérico = "Alfanumérico",
    Alfanúmerico = "Alfanúmerico",
    AlfanúmericoCaracteresEspeciales = "Alfanúmerico Caracteres Especiales",
    Alfaumérico = "Alfaumérico",
    Numérico = "Numérico",
    Númerico = "Númerico",
}

export interface PositionsLength {
    initPos:  number;
    finalPos: number;
}

export enum Regex {
    AZAZ09$ = "^[a-zA-Z0-9]+$",
    AZAZ09$_S = "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
    The09$ = "^[0-9]+$",
}
