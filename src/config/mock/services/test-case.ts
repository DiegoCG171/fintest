import { testCaseInterface } from "../../interfaces/testCase.interface";


export const testCaseMock: testCaseInterface[] = [
    {
        "_id": "68531bc6a031a5edc5db46e0",
        "name": "Logon Template",
        "description": "Plantilla de un logon para el servidor",
        "categoryId": "9296e265-bc6b-47ab-9e12-9f6be4d89091",
        "validationTransaction": [
            {
                "idBitmap": "HD-1",
                "isRequired": true,
                "fields": [
                    {
                        "idBitmap": "HD-1.1",
                        "function": "equals",
                        "value": "ISO",
                        "fields": [],
                        "_id": "6851dde01f1115437e07ad71"
                    },
                    {
                        "idBitmap": "HD-1.2",
                        "function": "equals",
                        "value": "00",
                        "fields": [],
                        "_id": "6851dde01f1115437e07ad72"
                    },
                    {
                        "idBitmap": "HD-1.3",
                        "function": "equals",
                        "value": "60",
                        "fields": [],
                        "_id": "6851dde01f1115437e07ad73"
                    },
                    {
                        "idBitmap": "HD-1.4",
                        "function": "equals",
                        "value": "000",
                        "fields": [],
                        "_id": "6851dde01f1115437e07ad74"
                    },
                    {
                        "idBitmap": "HD-1.5",
                        "function": "equals",
                        "value": "5",
                        "fields": [],
                        "_id": "6851dde01f1115437e07ad75"
                    },
                    {
                        "idBitmap": "HD-1.6",
                        "function": "equals",
                        "value": "0",
                        "fields": [],
                        "_id": "6851dde01f1115437e07ad76"
                    }
                ],
                "_id": "6851dde01f1115437e07ad70"
            },
            {
                "idBitmap": "HD-2",
                "isRequired": true,
                "function": "equals",
                "value": "0800",
                "fields": [],
                "_id": "6851dde01f1115437e07ad77"
            },
            {
                "idBitmap": "HD-3",
                "isRequired": true,
                "function": "not_validate",
                "fields": [],
                "_id": "6851dde01f1115437e07ad78"
            },
            {
                "idBitmap": "DE-1",
                "isRequired": true,
                "function": "not_validate",
                "fields": [],
                "_id": "6851dde01f1115437e07ad79"
            },
            {
                "idBitmap": "DE-7",
                "isRequired": true,
                "function": "not_validate",
                "fields": [],
                "_id": "6851dde01f1115437e07ad7a"
            },
            {
                "idBitmap": "DE-11",
                "isRequired": true,
                "function": "not_validate",
                "fields": [],
                "_id": "6851dde01f1115437e07ad7b"
            },
            {
                "idBitmap": "DE-70",
                "isRequired": true,
                "function": "includes",
                "value": "001|301",
                "fields": [],
                "_id": "6851dde01f1115437e07ad7c"
            }
        ],
        "generationTransaction": [
            {
                "idBitmap": "HD-1",
                "isRequired": true,
                "function": "value",
                "value": "ISO006000045",
                "fields": [
                    {
                        "idBitmap": "HD-1.1",
                        "function": "value",
                        "value": "ISO",
                        "fields": [],
                        "isRequired": true,
                        "_id": "6851dde01f1115437e07ad7e"
                    },
                    {
                        "idBitmap": "HD-1.2",
                        "function": "value",
                        "value": "00",
                        "fields": [],
                        "isRequired": true,
                        "_id": "6851dde01f1115437e07ad7f"
                    },
                    {
                        "idBitmap": "HD-1.3",
                        "function": "value",
                        "value": "60",
                        "fields": [],
                        "isRequired": true,
                        "_id": "6851dde01f1115437e07ad80"
                    },
                    {
                        "idBitmap": "HD-1.4",
                        "function": "value",
                        "value": "000",
                        "fields": [],
                        "isRequired": true,
                        "_id": "6851dde01f1115437e07ad81"
                    },
                    {
                        "idBitmap": "HD-1.5",
                        "function": "value",
                        "value": "4",
                        "fields": [],
                        "isRequired": true,
                        "_id": "6851dde01f1115437e07ad82"
                    },
                    {
                        "idBitmap": "HD-1.6",
                        "function": "value",
                        "value": "5",
                        "fields": [],
                        "isRequired": true,
                        "_id": "6851dde01f1115437e07ad83"
                    }
                ],
                "_id": "6851dde01f1115437e07ad7d"
            },
            {
                "idBitmap": "HD-2",
                "isRequired": true,
                "function": "value",
                "value": "0810",
                "fields": [],
                "_id": "6851dde01f1115437e07ad84"
            },
            {
                "idBitmap": "HD-3",
                "isRequired": true,
                "function": "calculated",
                "value": null,
                "fields": [],
                "_id": "6851dde01f1115437e07ad85"
            },
            {
                "idBitmap": "DE-1",
                "isRequired": true,
                "function": "calculated",
                "value": null,
                "fields": [],
                "_id": "6851dde01f1115437e07ad86"
            },
            {
                "idBitmap": "DE-7",
                "isRequired": true,
                "function": "echo",
                "fields": [],
                "_id": "6851dde01f1115437e07ad87"
            },
            {
                "idBitmap": "DE-11",
                "isRequired": true,
                "function": "echo",
                "fields": [],
                "_id": "6851dde01f1115437e07ad88"
            },
            {
                "idBitmap": "DE-39",
                "function": "value",
                "value": "00",
                "fields": [],
                "_id": "6851dde01f1115437e07ad89"
            },
            {
                "idBitmap": "DE-70",
                "isRequired": true,
                "function": "echo",
                "fields": [],
                "_id": "6851dde01f1115437e07ad8a"
            }
        ],
        "templateId": "9b4f8b95-d777-41f3-928b-87f47cdbed11",
        "dependOn": null,
        "order": 1,
        "uuid": "5b434851-366b-4baf-8e39-07ef40dfdbb3",
        "createdAt": "2025-06-18T20:04:22.580Z",
        "updatedAt": "2025-06-18T20:04:22.580Z",
        "__v": 0
    }
]