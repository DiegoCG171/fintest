import { Message } from "../../../interfaces";

export const messageData: Message = 
{
    "uuid": "1f0066ad-85a2-4abe-9dea-5a0a5394ce72",
    "interfaceId": "5aa4f0f4-7489-43f6-87e2-eee8e1148d0b",
    "userId": "f6bffc02-812a-45a9-8041-6e428287a097",
    "schemaId": "f6bffc02-812a-45a9-8041-6e428287a097",
    "value": "ISO0260000500210B238C4010EC1801A000000001000018C0000000000000002200522202359493281142358052205225399051110000000017924052216234999294800000000000W1684080000000093470150279347015            00010001484016B179AGRS+0000000019MCCCMCCC00000000000102& 0000400102! Q100002 0 ! B400020 0515100044030215084 ! B500038 001016A7F930AAFEF836031A000000000000  04999702918 97                        020000000000000000000P0012P7INTRBICI10038000000000000000                    000",
    "errorAt" : "EXTRACTION",
    "createdAt": 1724096554608,
    "incremental":1,
    "date": 1724096554608,
    "typeMsg": "200",
    "typeTx": "020",
    "fields": [
        {
            "id": "ISO-HEADER",
            "value": "ISO026000050"
        },
        {
            "id": "MESSAGE-TYPE",
            "value": "0210"
        },
        {
            "id": "PRIMARY-BITMAP",
            "value": "B238C4010EC1801A"
        },
        {
            "id": "P-1",
            "value": "000000001000018C"
        },
        {
            "id": "P-2",
            "fields": [
                {
                    "id": "P-2.1",
                    "value": "00"
                },
                {
                    "id": "P-2.2",
                    "value": "00"
                },
                {
                    "id": "P-2.3",
                    "value": "00"
                }
            ]
        },
        {
            "id": "P-63",
            "header": "& 0000400102",
            "fields": [
                {
                    "id": "Q1",
                    "header": "! Q100002",
                    "fields": [
                        {
                            "id": "Q1.1",
                            "value": "0"
                        },
                        {
                            "id": "Q1.2",
                            "value": " "
                        }
                    ]
                },
                {
                    "id": "B4",
                    "header": "! B400020",
                    "fields": [
                        {
                            "id": "B4.1",
                            "value": "051"
                        },
                        {
                            "id": "B4.2",
                            "value": "5"
                        },
                        {
                            "id": "B4.3",
                            "value": "1"
                        },
                        {
                            "id": "B4.4",
                            "value": "0"
                        },
                        {
                            "id": "B4.5",
                            "value": "00"
                        },
                        {
                            "id": "B4.6",
                            "fields": [
                                {
                                    "id": "B4.6.1",
                                    "value": "440302",
                                    "error": {
                                        "code": "EXT_01",
                                        "data": {
                                            "pattern": "/[A-Z]/"
                                        }
                                    }
                                }
                            ]

                        }
                    ]
                }
            ]
        }
    ]
}