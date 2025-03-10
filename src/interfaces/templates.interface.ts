export interface Template {
    _id:                   string;
    name:                  string;
    description:           string;
    validationTransaction: AtionTransaction[];
    generationTransaction: AtionTransaction[];
    uuid:                  string;
    createdAt:             Date;
    updatedAt:             Date;
    __v:                   number;
}

export interface AtionTransaction {
    idBitmap:    string;
    function:    Function;
    value?:      null | string;
    _id:         string;
    isRequired?: boolean;
    fields?: any[] | undefined;
}

export enum Function {
    Calculated = "calculated",
    Echo = "echo",
    RandomDigits = "randomDigits",
    RandomString = "randomString",
    SystemTimeDate = "systemTimeDate",
    Value = "value",
}
