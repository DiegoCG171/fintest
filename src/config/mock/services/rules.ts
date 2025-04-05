export const mockFields = [
    {
        "positionsLength": null,
        "idBitmap": "HD-1",
        "displayName": "Header ISO",
        "dataType": "Alfanúmerico",
        "isLengthVariable": false,
        "length": 12,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": true,
        "breakingRules": [
            {
                "id": "HD-1.1",
                "length": 3,
                "displayName": "Literal ISO",
                "_id": "67bce37337eeb9b499cc6bba",
                "specification": []
            },
            {
                "id": "HD-1.2",
                "length": 2,
                "displayName": "Product Indicator",
                "_id": "67bce37337eeb9b499cc6bbb",
                "specification": []
            },
            {
                "id": "HD-1.3",
                "length": 2,
                "displayName": "Relase Number",
                "_id": "67bce37337eeb9b499cc6bbc",
                "specification": []
            },
            {
                "id": "HD-1.4",
                "length": 3,
                "displayName": "Status",
                "_id": "67bce37337eeb9b499cc6bbd",
                "specification": []
            },
            {
                "id": "HD-1.5",
                "length": 1,
                "displayName": "Originator Code",
                "_id": "67bce37337eeb9b499cc6bbe",
                "specification": []
            },
            {
                "id": "HD-1.6",
                "length": 1,
                "displayName": "Responder Code",
                "_id": "67bce37337eeb9b499cc6bbf",
                "specification": []
            }
        ],
        "_id": "67bce37337eeb9b499cc6bb9"
    },
    {
        "positionsLength": null,
        "idBitmap": "HD-2",
        "displayName": "Tipo Mensaje",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 4,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bc0"
    },
    {
        "positionsLength": null,
        "idBitmap": "HD-3",
        "displayName": "First Bitmap",
        "dataType": "Alfanúmerico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bc1"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-1",
        "displayName": "Secondary Bit Map",
        "dataType": "Alfanúmerico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bc2"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-2",
        "displayName": "Primary Account Number",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 19,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bc3"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-3",
        "displayName": "Processing Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 6,
        "regex": "^[0-9]+$",
        "isBreakeable": true,
        "breakingRules": [
            {
                "id": "DE-3.1",
                "length": 2,
                "displayName": "Transaction Type",
                "_id": "67bce37337eeb9b499cc6bc5",
                "specification": []
            },
            {
                "id": "DE-3.2",
                "length": 2,
                "displayName": "Account Type",
                "_id": "67bce37337eeb9b499cc6bc6",
                "specification": []
            },
            {
                "id": "DE-3.3",
                "length": 2,
                "displayName": "Account Type",
                "_id": "67bce37337eeb9b499cc6bc7",
                "specification": []
            }
        ],
        "_id": "67bce37337eeb9b499cc6bc4"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-4",
        "displayName": "Transaction Amount",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 12,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bc8"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-5",
        "displayName": "Settlement Amount",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 12,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bc9"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-6",
        "displayName": "Cardholder Billing Amount",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 12,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bca"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-7",
        "displayName": "Transmission Date and Time",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 10,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bcb"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-8",
        "displayName": "Cardholder Billing Fee Amount",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 8,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bcc"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-9",
        "displayName": "Settlement Conversion Rate",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 8,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bcd"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-10",
        "displayName": "Cardholder Billing Conversion Rate",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 8,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bce"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-11",
        "displayName": "Systems Trace Audit Number",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 6,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bcf"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-12",
        "displayName": "Local Transaction Time",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 6,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bd0"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-13",
        "displayName": "Local Transaction Date",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 4,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bd1"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-14",
        "displayName": "Expiration Date",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 4,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bd2"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-15",
        "displayName": "Settlement Date",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 4,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bd3"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-16",
        "displayName": "Convertion Rate",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 4,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bd4"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-17",
        "displayName": "Capture Date",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 4,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bd5"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-18",
        "displayName": "Merchant Type",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 4,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bd6"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-19",
        "displayName": "Acquiring Institution Country Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bd7"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-20",
        "displayName": "Country Code Primary Account Number Extended",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bd8"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-21",
        "displayName": "Forwarding Institution Country Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bd9"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-22",
        "displayName": "Point of Service Entry Mode",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": true,
        "breakingRules": [
            {
                "id": "DE-22.1",
                "length": 2,
                "displayName": "Type Entry Mode",
                "_id": "67bce37337eeb9b499cc6bdb",
                "specification": []
            },
            {
                "id": "DE-22.2",
                "length": 1,
                "displayName": "Terminal Capability",
                "_id": "67bce37337eeb9b499cc6bdc",
                "specification": []
            }
        ],
        "_id": "67bce37337eeb9b499cc6bda"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-23",
        "displayName": "Card Sequence Number",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bdd"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-24",
        "displayName": "Network International Identifier",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bde"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-25",
        "displayName": "Point of Service Condition Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 2,
        "regex": "^[0-9]+$",
        "isBreakeable": true,
        "breakingRules": [
            {
                "id": "DE-25.1",
                "length": 2,
                "displayName": "Code",
                "_id": "67bce37337eeb9b499cc6be0",
                "specification": []
            }
        ],
        "_id": "67bce37337eeb9b499cc6bdf"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-26",
        "displayName": "Point of Service PIN Capture",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 2,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6be1"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-27",
        "displayName": "Authorization Identification Response Length",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 1,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6be2"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-28",
        "displayName": "Transaction Fee Amount",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 2,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6be3"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-29",
        "displayName": "Settlement Fee Amount",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 8,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6be4"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-30",
        "displayName": "Transaction Processing Fee Amount",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 8,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6be5"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-31",
        "displayName": "Settlement Processing Fee Amount",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 2,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6be6"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 2
        },
        "idBitmap": "DE-32",
        "displayName": "Aquiring Institution Code",
        "dataType": "Numérico",
        "isLengthVariable": true,
        "length": 11,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6be7"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-33",
        "displayName": "Forwarding Institution Identification Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 11,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6be8"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-34",
        "displayName": "Extended Primary Account Number",
        "dataType": "Alfanúmerico",
        "isLengthVariable": false,
        "length": 28,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6be9"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 2
        },
        "idBitmap": "DE-35",
        "displayName": "Track 2 Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 37,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bea"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 2
        },
        "idBitmap": "DE-36",
        "displayName": "Track 3 Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 104,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6beb"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-37",
        "displayName": "Retrieval Reference Number",
        "dataType": "Alfanúmerico",
        "isLengthVariable": false,
        "length": 12,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bec"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-38",
        "displayName": "Authorization Identification Response",
        "dataType": "Alfanúmerico",
        "isLengthVariable": false,
        "length": 6,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bed"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-39",
        "displayName": "Response Code",
        "dataType": "Alfanúmerico",
        "isLengthVariable": false,
        "length": 2,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bee"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-40",
        "displayName": "Service Restriction Code",
        "dataType": "Alfanúmerico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bef"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-41",
        "displayName": "Card Acceptor Terminal Identification",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bf0"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-42",
        "displayName": "Card Acceptor Identification Code",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": false,
        "length": 15,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bf1"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-43",
        "displayName": "Card Acceptor Name / Location",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": false,
        "length": 40,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": true,
        "breakingRules": [
            {
                "id": "DE-43.1",
                "length": 22,
                "displayName": "Terminal Owner",
                "_id": "67bce37337eeb9b499cc6bf3",
                "specification": []
            },
            {
                "id": "DE-43.2",
                "length": 13,
                "displayName": "Terminal City",
                "_id": "67bce37337eeb9b499cc6bf4",
                "specification": []
            },
            {
                "id": "DE-43.3",
                "length": 3,
                "displayName": "Terminal State",
                "_id": "67bce37337eeb9b499cc6bf5",
                "specification": []
            },
            {
                "id": "DE-43.4",
                "length": 2,
                "displayName": "Terminal Country",
                "_id": "67bce37337eeb9b499cc6bf6",
                "specification": []
            }
        ],
        "_id": "67bce37337eeb9b499cc6bf2"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 2
        },
        "idBitmap": "DE-44",
        "displayName": "Additional Response Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 4,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": true,
        "breakingRules": [
            {
                "id": "DE-44.1",
                "length": 2,
                "displayName": "Field Length Indicatior",
                "_id": "67bce37337eeb9b499cc6bf8",
                "specification": []
            },
            {
                "id": "DE-44.2",
                "length": 1,
                "displayName": "Response Data",
                "_id": "67bce37337eeb9b499cc6bf9",
                "specification": []
            },
            {
                "id": "DE-44.3",
                "length": 1,
                "displayName": "Address Verification Status",
                "_id": "67bce37337eeb9b499cc6bfa",
                "specification": []
            }
        ],
        "_id": "67bce37337eeb9b499cc6bf7"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 2
        },
        "idBitmap": "DE-45",
        "displayName": "Track 1 Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 76,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bfb"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-46",
        "displayName": "ISO Additional Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 999,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bfc"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 2
        },
        "idBitmap": "DE-47",
        "displayName": "National Additional Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 27,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6bfd"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-48",
        "displayName": "Retailer Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 47,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": true,
        "breakingRules": [
            {
                "id": "DE-48.1",
                "length": 19,
                "displayName": "Retailer ID",
                "_id": "67bce37337eeb9b499cc6bff",
                "specification": []
            },
            {
                "id": "DE-48.2",
                "length": 4,
                "displayName": "Retailer Group",
                "_id": "67bce37337eeb9b499cc6c00",
                "specification": []
            },
            {
                "id": "DE-48.3",
                "length": 4,
                "displayName": "Retailer Region",
                "_id": "67bce37337eeb9b499cc6c01",
                "specification": []
            }
        ],
        "_id": "67bce37337eeb9b499cc6bfe"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-49",
        "displayName": "Transaction Currency Code",
        "dataType": "Númerico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c02"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-50",
        "displayName": "Settlement Currency Code",
        "dataType": "Númerico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c03"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-51",
        "displayName": "Cardholder Billing Currency Code",
        "dataType": "Númerico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c04"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-52",
        "displayName": "Personal Identification Number (PIN) Data",
        "dataType": "Alfanúmerico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c05"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-53",
        "displayName": "Security Related Control Information",
        "dataType": "Númerico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c06"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-54",
        "displayName": "Additional Amounts",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": false,
        "length": 15,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": true,
        "breakingRules": [
            {
                "id": "DE-54.1",
                "length": 12,
                "displayName": "Cash Back Amount",
                "_id": "67bce37337eeb9b499cc6c08",
                "specification": []
            }
        ],
        "_id": "67bce37337eeb9b499cc6c07"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-55",
        "displayName": "Through 56",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 999,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c09"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-56",
        "displayName": "ISO Reserved",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 999,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c0a"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-57",
        "displayName": "National Reserved",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 999,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c0b"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-58",
        "displayName": "Financial Token",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 135,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c0c"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-59",
        "displayName": "CAF Update Token",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 17,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c0d"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-60",
        "displayName": "Terminal Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 19,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": true,
        "breakingRules": [
            {
                "id": "DE-60.2",
                "length": 4,
                "displayName": "Terminal Owner FIID",
                "_id": "67bce37337eeb9b499cc6c0f",
                "specification": []
            },
            {
                "id": "DE-60.3",
                "length": 4,
                "displayName": "Terminal Logical Network",
                "_id": "67bce37337eeb9b499cc6c10",
                "specification": []
            },
            {
                "id": "DE-60.4",
                "length": 4,
                "displayName": "Terminal Time Offset",
                "_id": "67bce37337eeb9b499cc6c11",
                "specification": []
            },
            {
                "id": "DE-60.5",
                "length": 4,
                "displayName": "Pseudo Terminal ID",
                "_id": "67bce37337eeb9b499cc6c12",
                "specification": []
            }
        ],
        "_id": "67bce37337eeb9b499cc6c0e"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-61",
        "displayName": "Response Code Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 22,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c13"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-62",
        "displayName": "Postal Code",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 13,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6c14"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-63",
        "displayName": "Additional Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 600,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": true,
        "breakingRules": [
            {
                "id": "DE-63.HDR",
                "length": 12,
                "idToken": "Header",
                "displayName": "Header Additional Data Tokens",
                "specification": [
                    {
                        "id": "DE-63.HDR.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c17"
                    },
                    {
                        "id": "DE-63.HDR.2",
                        "length": 1,
                        "displayName": "User Field",
                        "_id": "67bce37337eeb9b499cc6c18"
                    },
                    {
                        "id": "DE-63.HDR.3",
                        "length": 5,
                        "displayName": "Count Tokens",
                        "_id": "67bce37337eeb9b499cc6c19"
                    },
                    {
                        "id": "DE-63.HDR.4",
                        "length": 5,
                        "displayName": "Length Data",
                        "_id": "67bce37337eeb9b499cc6c1a"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c16"
            },
            {
                "id": "DE-63.Q1",
                "length": 12,
                "idToken": "Q1",
                "displayName": "Token Q1",
                "specification": [
                    {
                        "id": "DE-63.Q1.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c1c"
                    },
                    {
                        "id": "DE-63.Q1.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6c1d"
                    },
                    {
                        "id": "DE-63.Q1.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6c1e"
                    },
                    {
                        "id": "DE-63.Q1.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6c1f"
                    },
                    {
                        "id": "DE-63.Q1.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6c20"
                    },
                    {
                        "id": "DE-63.Q1.6",
                        "length": 1,
                        "displayName": "Identificador del modo de autorización",
                        "_id": "67bce37337eeb9b499cc6c21"
                    },
                    {
                        "id": "DE-63.Q1.7",
                        "length": 1,
                        "displayName": "Identificador del modo de validación del criptograma",
                        "_id": "67bce37337eeb9b499cc6c22"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c1b"
            },
            {
                "id": "DE-63.Q2",
                "length": 12,
                "idToken": "Q2",
                "displayName": "Token Q2",
                "specification": [
                    {
                        "id": "DE-63.Q2.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c24"
                    },
                    {
                        "id": "DE-63.Q2.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6c25"
                    },
                    {
                        "id": "DE-63.Q2.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6c26"
                    },
                    {
                        "id": "DE-63.Q2.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6c27"
                    },
                    {
                        "id": "DE-63.Q2.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6c28"
                    },
                    {
                        "id": "DE-63.Q2.5",
                        "length": 2,
                        "displayName": "Identificador de Medio de Acceso",
                        "_id": "67bce37337eeb9b499cc6c29"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c23"
            },
            {
                "id": "DE-63.Q6",
                "length": 16,
                "idToken": "Q6",
                "displayName": "Token Q6",
                "specification": [
                    {
                        "id": "DE-63.Q6.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c2b"
                    },
                    {
                        "id": "DE-63.Q6.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6c2c"
                    },
                    {
                        "id": "DE-63.Q6.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6c2d"
                    },
                    {
                        "id": "DE-63.Q6.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6c2e"
                    },
                    {
                        "id": "DE-63.Q6.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6c2f"
                    },
                    {
                        "id": "DE-63.Q6.6",
                        "length": 2,
                        "displayName": "Diferimiento, bonificación o reembolso",
                        "_id": "67bce37337eeb9b499cc6c30"
                    },
                    {
                        "id": "DE-63.Q6.7",
                        "length": 2,
                        "displayName": "Número de pagos",
                        "_id": "67bce37337eeb9b499cc6c31"
                    },
                    {
                        "id": "DE-63.Q6.8",
                        "length": 2,
                        "displayName": "Tipo de plan",
                        "_id": "67bce37337eeb9b499cc6c32"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c2a"
            },
            {
                "id": "DE-63.B1",
                "length": 450,
                "idToken": "B1",
                "displayName": "Token B1",
                "specification": [
                    {
                        "id": "DE-63.B2.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c34"
                    },
                    {
                        "id": "DE-63.B2.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6c35"
                    },
                    {
                        "id": "DE-63.B2.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6c36"
                    },
                    {
                        "id": "DE-63.B2.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6c37"
                    },
                    {
                        "id": "DE-63.B1.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6c38"
                    },
                    {
                        "id": "DE-63.B1.1",
                        "length": 3,
                        "displayName": "LGTH",
                        "_id": "67bce37337eeb9b499cc6c39"
                    },
                    {
                        "id": "DE-63.B1.2",
                        "length": 1,
                        "displayName": "USER-FLD1",
                        "_id": "67bce37337eeb9b499cc6c3a"
                    },
                    {
                        "id": "DE-63.B1.3",
                        "length": 4,
                        "displayName": "FIID",
                        "_id": "67bce37337eeb9b499cc6c3b"
                    },
                    {
                        "id": "DE-63.B1.4",
                        "length": 442,
                        "displayName": "BUF",
                        "_id": "67bce37337eeb9b499cc6c3c"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c33"
            },
            {
                "id": "DE-63.B2",
                "length": 158,
                "idToken": "B2",
                "displayName": "Token B2",
                "specification": [
                    {
                        "id": "DE-63.B2.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c3e"
                    },
                    {
                        "id": "DE-63.B2.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6c3f"
                    },
                    {
                        "id": "DE-63.B2.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6c40"
                    },
                    {
                        "id": "DE-63.B2.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6c41"
                    },
                    {
                        "id": "DE-63.Q2.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6c42"
                    },
                    {
                        "id": "DE-63.B2.6",
                        "length": 4,
                        "displayName": "BIT-MAP",
                        "_id": "67bce37337eeb9b499cc6c43"
                    },
                    {
                        "id": "DE-63.B2.7",
                        "length": 4,
                        "displayName": "USER-FLD1",
                        "_id": "67bce37337eeb9b499cc6c44"
                    },
                    {
                        "id": "DE-63.B2.8",
                        "length": 2,
                        "displayName": "CRIPTO-INFO-DATA",
                        "_id": "67bce37337eeb9b499cc6c45"
                    },
                    {
                        "id": "DE-63.B2.9",
                        "length": 10,
                        "displayName": "TVR (Terminal Verification Results)",
                        "_id": "67bce37337eeb9b499cc6c46"
                    },
                    {
                        "id": "DE-63.B2.10",
                        "length": 16,
                        "displayName": "ARQC (Authorization Request Cryptogram)",
                        "_id": "67bce37337eeb9b499cc6c47"
                    },
                    {
                        "id": "DE-63.B2.11",
                        "length": 12,
                        "displayName": "AMT-AUTH",
                        "_id": "67bce37337eeb9b499cc6c48"
                    },
                    {
                        "id": "DE-63.B2.12",
                        "length": 12,
                        "displayName": "AMT-OTHER",
                        "_id": "67bce37337eeb9b499cc6c49"
                    },
                    {
                        "id": "DE-63.B2.13",
                        "length": 4,
                        "displayName": "AIP (Application Interchange Profile)",
                        "_id": "67bce37337eeb9b499cc6c4a"
                    },
                    {
                        "id": "DE-63.B2.14",
                        "length": 4,
                        "displayName": "ATC (Application Transaction Counter)",
                        "_id": "67bce37337eeb9b499cc6c4b"
                    },
                    {
                        "id": "DE-63.B2.15",
                        "length": 3,
                        "displayName": "TERM-CNTRY-CDE",
                        "_id": "67bce37337eeb9b499cc6c4c"
                    },
                    {
                        "id": "DE-63.B2.16",
                        "length": 3,
                        "displayName": "TRAN-CRNCY-CDE",
                        "_id": "67bce37337eeb9b499cc6c4d"
                    },
                    {
                        "id": "DE-63.B2.17",
                        "length": 6,
                        "displayName": "TRAN-DAT",
                        "_id": "67bce37337eeb9b499cc6c4e"
                    },
                    {
                        "id": "DE-63.B2.18",
                        "length": 2,
                        "displayName": "TRAN-TYPE",
                        "_id": "67bce37337eeb9b499cc6c4f"
                    },
                    {
                        "id": "DE-63.B2.19",
                        "length": 8,
                        "displayName": "UNPREDICT-NUM",
                        "_id": "67bce37337eeb9b499cc6c50"
                    },
                    {
                        "id": "DE-63.B2.20",
                        "length": 4,
                        "displayName": "ISS-APPL-DATA-LGTH",
                        "_id": "67bce37337eeb9b499cc6c51"
                    },
                    {
                        "id": "DE-63.B2.20",
                        "length": 64,
                        "displayName": "ISS-APPL-DATA-LGTH",
                        "_id": "67bce37337eeb9b499cc6c52"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c3d"
            },
            {
                "id": "DE-63.B3",
                "length": 80,
                "idToken": "B3",
                "displayName": "Token B3",
                "specification": [
                    {
                        "id": "DE-63.B3.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c54"
                    },
                    {
                        "id": "DE-63.B3.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6c55"
                    },
                    {
                        "id": "DE-63.B3.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6c56"
                    },
                    {
                        "id": "DE-63.B3.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6c57"
                    },
                    {
                        "id": "DE-63.B3.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6c58"
                    },
                    {
                        "id": "DE-63.B3.6",
                        "length": 4,
                        "displayName": "BIT-MAP",
                        "_id": "67bce37337eeb9b499cc6c59"
                    },
                    {
                        "id": "DE-63.B3.7",
                        "length": 8,
                        "displayName": "TERM-SERL-NUM",
                        "_id": "67bce37337eeb9b499cc6c5a"
                    },
                    {
                        "id": "DE-63.B3.8",
                        "length": 8,
                        "displayName": "EMV-TERM-CAP",
                        "_id": "67bce37337eeb9b499cc6c5b"
                    },
                    {
                        "id": "DE-63.B3.9",
                        "length": 4,
                        "displayName": "USER-FLD1",
                        "_id": "67bce37337eeb9b499cc6c5c"
                    },
                    {
                        "id": "DE-63.B3.10",
                        "length": 8,
                        "displayName": "USER-FLD2",
                        "_id": "67bce37337eeb9b499cc6c5d"
                    },
                    {
                        "id": "DE-63.B3.11",
                        "length": 2,
                        "displayName": "EMV-TERM-TYPE",
                        "_id": "67bce37337eeb9b499cc6c5e"
                    },
                    {
                        "id": "DE-63.B3.12",
                        "length": 4,
                        "displayName": "APPL-VER-NUM",
                        "_id": "67bce37337eeb9b499cc6c5f"
                    },
                    {
                        "id": "DE-63.B3.13",
                        "length": 6,
                        "displayName": "CVM-RSLTS",
                        "_id": "67bce37337eeb9b499cc6c60"
                    },
                    {
                        "id": "DE-63.B3.14",
                        "length": 4,
                        "displayName": "DF-NAME-LGTH",
                        "_id": "67bce37337eeb9b499cc6c61"
                    },
                    {
                        "id": "DE-63.B3.14",
                        "length": 32,
                        "displayName": "DF-NAME",
                        "_id": "67bce37337eeb9b499cc6c62"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c53"
            },
            {
                "id": "DE-63.B4",
                "length": 20,
                "idToken": "B4",
                "displayName": "Token B4",
                "specification": [
                    {
                        "id": "DE-63.B4.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c64"
                    },
                    {
                        "id": "DE-63.B4.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6c65"
                    },
                    {
                        "id": "DE-63.B4.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6c66"
                    },
                    {
                        "id": "DE-63.B4.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6c67"
                    },
                    {
                        "id": "DE-63.B4.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6c68"
                    },
                    {
                        "id": "DE-63.B4.6",
                        "length": 3,
                        "displayName": "PT-SRV-ENTRY-MDE",
                        "_id": "67bce37337eeb9b499cc6c69"
                    },
                    {
                        "id": "DE-63.B4.7",
                        "length": 1,
                        "displayName": "TERM-ENTRY-CAP",
                        "_id": "67bce37337eeb9b499cc6c6a"
                    },
                    {
                        "id": "DE-63.B4.8",
                        "length": 1,
                        "displayName": "LAST-EMV-STAT",
                        "_id": "67bce37337eeb9b499cc6c6b"
                    },
                    {
                        "id": "DE-63.B4.9",
                        "length": 1,
                        "displayName": "DATA-SUSPECT",
                        "_id": "67bce37337eeb9b499cc6c6c"
                    },
                    {
                        "id": "DE-63.B4.10",
                        "length": 2,
                        "displayName": "APPL-PAN-SEQ-NUM",
                        "_id": "67bce37337eeb9b499cc6c6d"
                    },
                    {
                        "id": "DE-63.B4.11",
                        "length": 6,
                        "displayName": "DEV-INFO",
                        "_id": "67bce37337eeb9b499cc6c6e"
                    },
                    {
                        "id": "DE-63.B4.12",
                        "length": 4,
                        "displayName": "RSN-ONL-CDE",
                        "_id": "67bce37337eeb9b499cc6c6f"
                    },
                    {
                        "id": "DE-63.B4.13",
                        "length": 1,
                        "displayName": "ARQC-VRFY",
                        "_id": "67bce37337eeb9b499cc6c70"
                    },
                    {
                        "id": "DE-63.B4.14",
                        "length": 1,
                        "displayName": "ISO-RC-IND",
                        "_id": "67bce37337eeb9b499cc6c71"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c63"
            },
            {
                "id": "DE-63.B5",
                "length": 38,
                "idToken": "B5",
                "displayName": "Token B5",
                "specification": [
                    {
                        "id": "DE-63.B5.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c73"
                    },
                    {
                        "id": "DE-63.B5.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6c74"
                    },
                    {
                        "id": "DE-63.B5.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6c75"
                    },
                    {
                        "id": "DE-63.B5.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6c76"
                    },
                    {
                        "id": "DE-63.B5.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6c77"
                    },
                    {
                        "id": "DE-63.B5.6",
                        "length": 4,
                        "displayName": "ISS-AUTH-DATA-LGTH",
                        "_id": "67bce37337eeb9b499cc6c78"
                    },
                    {
                        "id": "DE-63.B5.7",
                        "length": 16,
                        "displayName": "ARPC",
                        "_id": "67bce37337eeb9b499cc6c79"
                    },
                    {
                        "id": "DE-63.B5.8",
                        "length": 16,
                        "displayName": "ADDL-DATA",
                        "_id": "67bce37337eeb9b499cc6c7a"
                    },
                    {
                        "id": "DE-63.B5.9",
                        "length": 1,
                        "displayName": "SEND-CRD-BLK",
                        "_id": "67bce37337eeb9b499cc6c7b"
                    },
                    {
                        "id": "DE-63.B5.10",
                        "length": 1,
                        "displayName": "SEND-PUT-DATA",
                        "_id": "67bce37337eeb9b499cc6c7c"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c72"
            },
            {
                "id": "DE-63.B6",
                "length": 260,
                "idToken": "B6",
                "displayName": "Token B6",
                "specification": [
                    {
                        "id": "DE-63.B6.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c7e"
                    },
                    {
                        "id": "DE-63.B6.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6c7f"
                    },
                    {
                        "id": "DE-63.B6.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6c80"
                    },
                    {
                        "id": "DE-63.B6.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6c81"
                    },
                    {
                        "id": "DE-63.B6.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6c82"
                    },
                    {
                        "id": "DE-63.B6.6",
                        "length": 4,
                        "displayName": "ISS-SCRIPT-DATA-LGTH",
                        "_id": "67bce37337eeb9b499cc6c83"
                    },
                    {
                        "id": "DE-63.B6.7",
                        "length": 256,
                        "displayName": "ISS-SCRIPT-DATA",
                        "_id": "67bce37337eeb9b499cc6c84"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c7d"
            },
            {
                "id": "DE-63.BJ",
                "length": 82,
                "idToken": "BJ",
                "displayName": "Token BJ",
                "specification": [
                    {
                        "id": "DE-63.BJ.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c86"
                    },
                    {
                        "id": "DE-63.BJ.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6c87"
                    },
                    {
                        "id": "DE-63.BJ.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6c88"
                    },
                    {
                        "id": "DE-63.BJ.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6c89"
                    },
                    {
                        "id": "DE-63.BJ.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6c8a"
                    },
                    {
                        "id": "DE-63.BJ.6",
                        "length": 1,
                        "displayName": "NUM-ISS-SCRIPT-RSLTS",
                        "_id": "67bce37337eeb9b499cc6c8b"
                    },
                    {
                        "id": "DE-63.BJ.7",
                        "length": 1,
                        "displayName": "USER-FLD1",
                        "_id": "67bce37337eeb9b499cc6c8c"
                    },
                    {
                        "id": "DE-63.BJ.8",
                        "length": 80,
                        "displayName": "ISS-SCRIPT-RSLTS-DATA",
                        "_id": "67bce37337eeb9b499cc6c8d"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c85"
            },
            {
                "id": "DE-63.C0",
                "length": 26,
                "idToken": "C0",
                "displayName": "Token C0",
                "specification": [
                    {
                        "id": "DE-63.C0.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6c8f"
                    },
                    {
                        "id": "DE-63.C0.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6c90"
                    },
                    {
                        "id": "DE-63.C0.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6c91"
                    },
                    {
                        "id": "DE-63.C0.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6c92"
                    },
                    {
                        "id": "DE-63.C0.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6c93"
                    },
                    {
                        "id": "DE-63.C0.6",
                        "length": 4,
                        "displayName": "CVV2/CVC2 (Código de validación)",
                        "_id": "67bce37337eeb9b499cc6c94"
                    },
                    {
                        "id": "DE-63.C0.7",
                        "length": 1,
                        "displayName": "Código de estado de retransmisión",
                        "_id": "67bce37337eeb9b499cc6c95"
                    },
                    {
                        "id": "DE-63.C0.8",
                        "length": 3,
                        "displayName": "Contador de retransmisiones",
                        "_id": "67bce37337eeb9b499cc6c96"
                    },
                    {
                        "id": "DE-63.C0.9",
                        "length": 10,
                        "displayName": "Código postal del comercio",
                        "_id": "67bce37337eeb9b499cc6c97"
                    },
                    {
                        "id": "DE-63.C0.10",
                        "length": 1,
                        "displayName": "Indicador de comercio electrónico",
                        "_id": "67bce37337eeb9b499cc6c98"
                    },
                    {
                        "id": "DE-63.C0.11",
                        "length": 1,
                        "displayName": "Tipo de tarjeta",
                        "_id": "67bce37337eeb9b499cc6c99"
                    },
                    {
                        "id": "DE-63.C0.12",
                        "length": 1,
                        "displayName": "Transacción forzada o SAF",
                        "_id": "67bce37337eeb9b499cc6c9a"
                    },
                    {
                        "id": "DE-63.C0.13",
                        "length": 1,
                        "displayName": "Indicador de CV2 (Código de validación) presente",
                        "_id": "67bce37337eeb9b499cc6c9b"
                    },
                    {
                        "id": "DE-63.C0.14",
                        "length": 1,
                        "displayName": "Indicador de informacion adicional",
                        "_id": "67bce37337eeb9b499cc6c9c"
                    },
                    {
                        "id": "DE-63.C0.15",
                        "length": 1,
                        "displayName": "Auth collector indicator",
                        "_id": "67bce37337eeb9b499cc6c9d"
                    },
                    {
                        "id": "DE-63.C0.16",
                        "length": 1,
                        "displayName": "Bandera de propension de fraude del comercio",
                        "_id": "67bce37337eeb9b499cc6c9e"
                    },
                    {
                        "id": "DE-63.C0.17",
                        "length": 1,
                        "displayName": "Resultado de validacion",
                        "_id": "67bce37337eeb9b499cc6c9f"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6c8e"
            },
            {
                "id": "DE-63.C4",
                "length": 12,
                "idToken": "C4",
                "displayName": "Token C4",
                "specification": [
                    {
                        "id": "DE-63.C4.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6ca1"
                    },
                    {
                        "id": "DE-63.C4.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6ca2"
                    },
                    {
                        "id": "DE-63.C4.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6ca3"
                    },
                    {
                        "id": "DE-63.C4.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6ca4"
                    },
                    {
                        "id": "DE-63.C4.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6ca5"
                    },
                    {
                        "id": "DE-63.C4.6",
                        "length": 1,
                        "displayName": "Indicador de terminal atendida",
                        "_id": "67bce37337eeb9b499cc6ca6"
                    },
                    {
                        "id": "DE-63.C4.7",
                        "length": 1,
                        "displayName": "TERM-OPER-IND",
                        "_id": "67bce37337eeb9b499cc6ca7"
                    },
                    {
                        "id": "DE-63.C4.8",
                        "length": 1,
                        "displayName": "Localización de la terminal",
                        "_id": "67bce37337eeb9b499cc6ca8"
                    },
                    {
                        "id": "DE-63.C4.9",
                        "length": 1,
                        "displayName": "Indicador de presencia del tarjetahabiente",
                        "_id": "67bce37337eeb9b499cc6ca9"
                    },
                    {
                        "id": "DE-63.C4.10",
                        "length": 1,
                        "displayName": "Indicador de presencia de tarjeta",
                        "_id": "67bce37337eeb9b499cc6caa"
                    },
                    {
                        "id": "DE-63.C4.11",
                        "length": 1,
                        "displayName": "Capacidad de captura de tarjetas",
                        "_id": "67bce37337eeb9b499cc6cab"
                    },
                    {
                        "id": "DE-63.C4.12",
                        "length": 1,
                        "displayName": "Indicador de Status",
                        "_id": "67bce37337eeb9b499cc6cac"
                    },
                    {
                        "id": "DE-63.C4.13",
                        "length": 1,
                        "displayName": "Nivel de seguridad del adquiriente",
                        "_id": "67bce37337eeb9b499cc6cad"
                    },
                    {
                        "id": "DE-63.C4.14",
                        "length": 1,
                        "displayName": "Routing Indicator",
                        "_id": "67bce37337eeb9b499cc6cae"
                    },
                    {
                        "id": "DE-63.C4.15",
                        "length": 1,
                        "displayName": "Activacion de la terminal por el tarjetahabiente",
                        "_id": "67bce37337eeb9b499cc6caf"
                    },
                    {
                        "id": "DE-63.C4.16",
                        "length": 1,
                        "displayName": "Indicador de Capacidad para Transferir Datos",
                        "_id": "67bce37337eeb9b499cc6cb0"
                    },
                    {
                        "id": "DE-63.C4.17",
                        "length": 1,
                        "displayName": "Metodo de identificacion del tarjetahabiente",
                        "_id": "67bce37337eeb9b499cc6cb1"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6ca0"
            },
            {
                "id": "DE-63.C6",
                "length": 80,
                "idToken": "C6",
                "displayName": "Token C6",
                "specification": [
                    {
                        "id": "DE-63.C6.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6cb3"
                    },
                    {
                        "id": "DE-63.C6.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6cb4"
                    },
                    {
                        "id": "DE-63.C6.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6cb5"
                    },
                    {
                        "id": "DE-63.C6.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6cb6"
                    },
                    {
                        "id": "DE-63.C6.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6cb7"
                    },
                    {
                        "id": "DE-63.C6.6",
                        "length": 40,
                        "displayName": "XID (3D Secure v1) / TAVV (Tokenización)",
                        "_id": "67bce37337eeb9b499cc6cb8"
                    },
                    {
                        "id": "DE-63.C6.7",
                        "length": 40,
                        "displayName": "CAVV – Cardholder Authentication Verification Value",
                        "_id": "67bce37337eeb9b499cc6cb9"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6cb2"
            },
            {
                "id": "DE-63.CE",
                "length": 202,
                "idToken": "CE",
                "displayName": "Token CE",
                "specification": [
                    {
                        "id": "DE-63.CE.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6cbb"
                    },
                    {
                        "id": "DE-63.CE.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6cbc"
                    },
                    {
                        "id": "DE-63.CE.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6cbd"
                    },
                    {
                        "id": "DE-63.CE.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6cbe"
                    },
                    {
                        "id": "DE-63.CE.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6cbf"
                    },
                    {
                        "id": "DE-63.CE.6",
                        "length": 2,
                        "displayName": "Indicador de autenticación",
                        "_id": "67bce37337eeb9b499cc6cc0"
                    },
                    {
                        "id": "DE-63.CE.7",
                        "length": 200,
                        "displayName": "Datos de autenticación del tarjetahabiente",
                        "_id": "67bce37337eeb9b499cc6cc1"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6cba"
            },
            {
                "id": "DE-63.CZ",
                "length": 40,
                "idToken": "CZ",
                "displayName": "Token CZ",
                "specification": [
                    {
                        "id": "DE-63.CZ.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6cc3"
                    },
                    {
                        "id": "DE-63.CZ.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6cc4"
                    },
                    {
                        "id": "DE-63.CZ.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6cc5"
                    },
                    {
                        "id": "DE-63.CZ.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6cc6"
                    },
                    {
                        "id": "DE-63.CZ.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6cc7"
                    },
                    {
                        "id": "DE-63.CZ.6",
                        "length": 2,
                        "displayName": "ATC (Application Transaction Counter)",
                        "_id": "67bce37337eeb9b499cc6cc8"
                    },
                    {
                        "id": "DE-63.CZ.7",
                        "length": 1,
                        "displayName": "ATC-VALID-IND (Indicador de validez del contador de transacciones)",
                        "_id": "67bce37337eeb9b499cc6cc9"
                    },
                    {
                        "id": "DE-63.CZ.8",
                        "length": 1,
                        "displayName": "CRD-AUTHN-IND (Indicador de autenticación de tarjeta)",
                        "_id": "67bce37337eeb9b499cc6cca"
                    },
                    {
                        "id": "DE-63.CZ.9",
                        "length": 2,
                        "displayName": "FORM-FACTR-IND (Indicador del formato del dispositivo)",
                        "_id": "67bce37337eeb9b499cc6ccb"
                    },
                    {
                        "id": "DE-63.CZ.10",
                        "length": 1,
                        "displayName": "PMNT-INITIATION-CHAN (Canal de inicio del pago)",
                        "_id": "67bce37337eeb9b499cc6ccc"
                    },
                    {
                        "id": "DE-63.CZ.11",
                        "length": 1,
                        "displayName": "CRDHLDR-VRFY-ID-BY-DEV (Verificación de identidad por el dispositivo)",
                        "_id": "67bce37337eeb9b499cc6ccd"
                    },
                    {
                        "id": "DE-63.CZ.12",
                        "length": 2,
                        "displayName": "ADNL-DATA-CDE (Código de datos adicionales)",
                        "_id": "67bce37337eeb9b499cc6cce"
                    },
                    {
                        "id": "DE-63.CZ.13",
                        "length": 22,
                        "displayName": "USER-FLD-ACI (Información adicional del usuario)",
                        "_id": "67bce37337eeb9b499cc6ccf"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6cc2"
            },
            {
                "id": "DE-63.FA",
                "length": 60,
                "idToken": "FA",
                "displayName": "Token FA",
                "specification": [
                    {
                        "id": "DE-63.FA.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6cd1"
                    },
                    {
                        "id": "DE-63.FA.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6cd2"
                    },
                    {
                        "id": "DE-63.FA.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6cd3"
                    },
                    {
                        "id": "DE-63.FA.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6cd4"
                    },
                    {
                        "id": "DE-63.FA.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6cd5"
                    },
                    {
                        "id": "DE-63.FA.6",
                        "length": 11,
                        "displayName": "PMNT-FACILITATOR-ID (ID del facilitador de pago)",
                        "_id": "67bce37337eeb9b499cc6cd6"
                    },
                    {
                        "id": "DE-63.FA.7",
                        "length": 11,
                        "displayName": "IDPNT-SALES-ORG-ID (ID de la organización de ventas independiente)",
                        "_id": "67bce37337eeb9b499cc6cd7"
                    },
                    {
                        "id": "DE-63.FA.8",
                        "length": 15,
                        "displayName": "SUB-MRCH-ID (ID del subcomercio)",
                        "_id": "67bce37337eeb9b499cc6cd8"
                    },
                    {
                        "id": "DE-63.FA.9",
                        "length": 3,
                        "displayName": "RTLR-IND (Indicador de comercio)",
                        "_id": "67bce37337eeb9b499cc6cd9"
                    },
                    {
                        "id": "DE-63.FA.10",
                        "length": 3,
                        "displayName": "CNTRY-CDE (Código de país)",
                        "_id": "67bce37337eeb9b499cc6cda"
                    },
                    {
                        "id": "DE-63.FA.11",
                        "length": 7,
                        "displayName": "USER-FLD-ACI (Reservado para uso futuro)",
                        "_id": "67bce37337eeb9b499cc6cdb"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6cd0"
            },
            {
                "id": "FT",
                "length": 130,
                "idToken": "DE-63.FT",
                "displayName": "Token FT",
                "specification": [
                    {
                        "id": "DE-63.FT.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6cdd"
                    },
                    {
                        "id": "DE-63.FT.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6cde"
                    },
                    {
                        "id": "DE-63.FT.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6cdf"
                    },
                    {
                        "id": "DE-63.FT.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6ce0"
                    },
                    {
                        "id": "DE-63.FT.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6ce1"
                    },
                    {
                        "id": "DE-63.FT.6",
                        "length": 20,
                        "displayName": "CUST-SRVC-PHONE (Número de servicio al cliente del minorista)",
                        "_id": "67bce37337eeb9b499cc6ce2"
                    },
                    {
                        "id": "DE-63.FT.7",
                        "length": 25,
                        "displayName": "STR-ADDR (Dirección del minorista)",
                        "_id": "67bce37337eeb9b499cc6ce3"
                    },
                    {
                        "id": "DE-63.FT.8",
                        "length": 1,
                        "displayName": "RETL-TYP (Tipo de minorista)",
                        "_id": "67bce37337eeb9b499cc6ce4"
                    },
                    {
                        "id": "DE-63.FT.9",
                        "length": 40,
                        "displayName": "RETL-NAM (Nombre del minorista)",
                        "_id": "67bce37337eeb9b499cc6ce5"
                    },
                    {
                        "id": "DE-63.FT.10",
                        "length": 34,
                        "displayName": "USER-FLD-ACI (Reservado para uso futuro)",
                        "_id": "67bce37337eeb9b499cc6ce6"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6cdc"
            },
            {
                "id": "FS",
                "length": 60,
                "idToken": "DE-63.FS",
                "displayName": "Token FS",
                "specification": [
                    {
                        "id": "DE-63.FS.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6ce8"
                    },
                    {
                        "id": "DE-63.FS.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6ce9"
                    },
                    {
                        "id": "DE-63.FS.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6cea"
                    },
                    {
                        "id": "DE-63.FS.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6ceb"
                    },
                    {
                        "id": "DE-63.FS.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6cec"
                    },
                    {
                        "id": "DE-63.FS.6",
                        "length": 13,
                        "displayName": "CITY",
                        "_id": "67bce37337eeb9b499cc6ced"
                    },
                    {
                        "id": "DE-63.FS.7",
                        "length": 3,
                        "displayName": "ST",
                        "_id": "67bce37337eeb9b499cc6cee"
                    },
                    {
                        "id": "DE-63.FS.7",
                        "length": 3,
                        "displayName": "ST",
                        "_id": "67bce37337eeb9b499cc6cef"
                    },
                    {
                        "id": "DE-63.FS.8",
                        "length": 3,
                        "displayName": "CNTRY-CDE",
                        "_id": "67bce37337eeb9b499cc6cf0"
                    },
                    {
                        "id": "DE-63.FS.9",
                        "length": 10,
                        "displayName": "POSTAL-CDE",
                        "_id": "67bce37337eeb9b499cc6cf1"
                    },
                    {
                        "id": "DE-63.FS.7",
                        "length": 21,
                        "displayName": "RESERVED ACI",
                        "_id": "67bce37337eeb9b499cc6cf2"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6ce7"
            },
            {
                "id": "DE-63.TM",
                "length": 230,
                "idToken": "TM",
                "displayName": "Token TM",
                "specification": [
                    {
                        "id": "DE-63.TM.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6cf4"
                    },
                    {
                        "id": "DE-63.TM.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6cf5"
                    },
                    {
                        "id": "DE-63.TM.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6cf6"
                    },
                    {
                        "id": "DE-63.TM.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6cf7"
                    },
                    {
                        "id": "DE-63.TM.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6cf8"
                    },
                    {
                        "id": "DE-63.TM.6",
                        "length": 1,
                        "displayName": "Transaction Category Code",
                        "_id": "67bce37337eeb9b499cc6cf9"
                    },
                    {
                        "id": "DE-63.TM.7",
                        "length": 2,
                        "displayName": "Payment Initiation Channel",
                        "_id": "67bce37337eeb9b499cc6cfa"
                    },
                    {
                        "id": "DE-63.TM.8",
                        "length": 3,
                        "displayName": "Wallet ID",
                        "_id": "67bce37337eeb9b499cc6cfb"
                    },
                    {
                        "id": "DE-63.TM.9",
                        "length": 2,
                        "displayName": "Token Transaction ID",
                        "_id": "67bce37337eeb9b499cc6cfc"
                    },
                    {
                        "id": "DE-63.TM.10",
                        "length": 1,
                        "displayName": "Account Number Indicator",
                        "_id": "67bce37337eeb9b499cc6cfd"
                    },
                    {
                        "id": "DE-63.TM.11",
                        "length": 19,
                        "displayName": "Account Number",
                        "_id": "67bce37337eeb9b499cc6cfe"
                    },
                    {
                        "id": "DE-63.TM.12",
                        "length": 4,
                        "displayName": "Token Expiration Date",
                        "_id": "67bce37337eeb9b499cc6cff"
                    },
                    {
                        "id": "DE-63.TM.13",
                        "length": 2,
                        "displayName": "Token Assurance Level",
                        "_id": "67bce37337eeb9b499cc6d00"
                    },
                    {
                        "id": "DE-63.TM.14",
                        "length": 11,
                        "displayName": "Token Requestor ID",
                        "_id": "67bce37337eeb9b499cc6d01"
                    },
                    {
                        "id": "DE-63.TM.15",
                        "length": 11,
                        "displayName": "Storage Technology",
                        "_id": "67bce37337eeb9b499cc6d02"
                    },
                    {
                        "id": "DE-63.TM.16",
                        "length": 1,
                        "displayName": "Cryptogram Validation Indicator",
                        "_id": "67bce37337eeb9b499cc6d03"
                    },
                    {
                        "id": "DE-63.TM.17",
                        "length": 5,
                        "displayName": "ATC Value",
                        "_id": "67bce37337eeb9b499cc6d04"
                    },
                    {
                        "id": "DE-63.TM.18",
                        "length": 5,
                        "displayName": "Discrepancy Value",
                        "_id": "67bce37337eeb9b499cc6d05"
                    },
                    {
                        "id": "DE-63.TM.19",
                        "length": 1,
                        "displayName": "ATC Inside issuer definitions",
                        "_id": "67bce37337eeb9b499cc6d06"
                    },
                    {
                        "id": "DE-63.TM.20",
                        "length": 1,
                        "displayName": "Security Protocol",
                        "_id": "67bce37337eeb9b499cc6d07"
                    },
                    {
                        "id": "DE-63.TM.21",
                        "length": 1,
                        "displayName": "Cardholder Authentication",
                        "_id": "67bce37337eeb9b499cc6d08"
                    },
                    {
                        "id": "DE-63.TM.22",
                        "length": 1,
                        "displayName": "UCAF Collection Indicator",
                        "_id": "67bce37337eeb9b499cc6d09"
                    },
                    {
                        "id": "DE-63.TM.23",
                        "length": 1,
                        "displayName": "Electronic Commerce Security Level Indicator",
                        "_id": "67bce37337eeb9b499cc6d0a"
                    },
                    {
                        "id": "DE-63.TM.24",
                        "length": 8,
                        "displayName": "Time Value",
                        "_id": "67bce37337eeb9b499cc6d0b"
                    },
                    {
                        "id": "DE-63.TM.25",
                        "length": 5,
                        "displayName": "Time Discrepancy",
                        "_id": "67bce37337eeb9b499cc6d0c"
                    },
                    {
                        "id": "DE-63.TM.26",
                        "length": 2,
                        "displayName": "Time Discrepancy Indicator",
                        "_id": "67bce37337eeb9b499cc6d0d"
                    },
                    {
                        "id": "DE-63.TM.27",
                        "length": 2,
                        "displayName": "Merchant On-behalf Service",
                        "_id": "67bce37337eeb9b499cc6d0e"
                    },
                    {
                        "id": "DE-63.TM.28",
                        "length": 1,
                        "displayName": "Merchant On-behalf Result 1",
                        "_id": "67bce37337eeb9b499cc6d0f"
                    },
                    {
                        "id": "DE-63.TM.29",
                        "length": 2,
                        "displayName": "On-behalf Service",
                        "_id": "67bce37337eeb9b499cc6d10"
                    },
                    {
                        "id": "DE-63.TM.30",
                        "length": 1,
                        "displayName": "On-behalf Result 1",
                        "_id": "67bce37337eeb9b499cc6d11"
                    },
                    {
                        "id": "DE-63.TM.31",
                        "length": 1,
                        "displayName": "On-behalf Result 2",
                        "_id": "67bce37337eeb9b499cc6d12"
                    },
                    {
                        "id": "DE-63.TM.32",
                        "length": 2,
                        "displayName": "Address Verification Service Request",
                        "_id": "67bce37337eeb9b499cc6d13"
                    },
                    {
                        "id": "DE-63.TM.33",
                        "length": 1,
                        "displayName": "AVS Response Code",
                        "_id": "67bce37337eeb9b499cc6d14"
                    },
                    {
                        "id": "DE-63.TM.34",
                        "length": 1,
                        "displayName": "CVC 2 Result Code",
                        "_id": "67bce37337eeb9b499cc6d15"
                    },
                    {
                        "id": "DE-63.TM.35",
                        "length": 3,
                        "displayName": "CVC 2",
                        "_id": "67bce37337eeb9b499cc6d16"
                    },
                    {
                        "id": "DE-63.TM.36",
                        "length": 3,
                        "displayName": "Advice Reason Code",
                        "_id": "67bce37337eeb9b499cc6d17"
                    },
                    {
                        "id": "DE-63.TM.37",
                        "length": 4,
                        "displayName": "Advice Detail Code",
                        "_id": "67bce37337eeb9b499cc6d18"
                    },
                    {
                        "id": "DE-63.TM.38",
                        "length": 53,
                        "displayName": "Advice Detail Text",
                        "_id": "67bce37337eeb9b499cc6d19"
                    },
                    {
                        "id": "DE-63.TM.39",
                        "length": 1,
                        "displayName": "POS Transaction Status",
                        "_id": "67bce37337eeb9b499cc6d1a"
                    },
                    {
                        "id": "DE-63.TM.40",
                        "length": 11,
                        "displayName": "Receiving Institution ID Code",
                        "_id": "67bce37337eeb9b499cc6d1b"
                    },
                    {
                        "id": "DE-63.TM.41",
                        "length": 29,
                        "displayName": "AVS Service Indicator 1",
                        "_id": "67bce37337eeb9b499cc6d1c"
                    },
                    {
                        "id": "DE-63.TM.42",
                        "length": 28,
                        "displayName": "FILLER",
                        "_id": "67bce37337eeb9b499cc6d1d"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6cf3"
            },
            {
                "id": "DE-63.TV",
                "length": 230,
                "idToken": "TV",
                "displayName": "Token TV",
                "specification": [
                    {
                        "id": "DE-63.TV.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d1f"
                    },
                    {
                        "id": "DE-63.TV.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d20"
                    },
                    {
                        "id": "DE-63.TV.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d21"
                    },
                    {
                        "id": "DE-63.TV.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d22"
                    },
                    {
                        "id": "DE-63.TV.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d23"
                    },
                    {
                        "id": "DE-63.TV.6",
                        "length": 4,
                        "displayName": "Network Identification Code",
                        "_id": "67bce37337eeb9b499cc6d24"
                    },
                    {
                        "id": "DE-63.TV.7",
                        "length": 4,
                        "displayName": "Message Reason Code",
                        "_id": "67bce37337eeb9b499cc6d25"
                    },
                    {
                        "id": "DE-63.TV.8",
                        "length": 17,
                        "displayName": "File Name",
                        "_id": "67bce37337eeb9b499cc6d26"
                    },
                    {
                        "id": "DE-63.TV.9",
                        "length": 4,
                        "displayName": "Elapsed Time To Live",
                        "_id": "67bce37337eeb9b499cc6d27"
                    },
                    {
                        "id": "DE-63.TV.10",
                        "length": 3,
                        "displayName": "Count of Number of Transactions",
                        "_id": "67bce37337eeb9b499cc6d28"
                    },
                    {
                        "id": "DE-63.TV.11",
                        "length": 7,
                        "displayName": "Cumulative Transaction Amount",
                        "_id": "67bce37337eeb9b499cc6d29"
                    },
                    {
                        "id": "DE-63.TV.12",
                        "length": 19,
                        "displayName": "Token",
                        "_id": "67bce37337eeb9b499cc6d2a"
                    },
                    {
                        "id": "DE-63.TV.13",
                        "length": 2,
                        "displayName": "Token Assurance Method",
                        "_id": "67bce37337eeb9b499cc6d2b"
                    },
                    {
                        "id": "DE-63.TV.14",
                        "length": 11,
                        "displayName": "Token Requestor ID",
                        "_id": "67bce37337eeb9b499cc6d2c"
                    },
                    {
                        "id": "DE-63.TV.15",
                        "length": 19,
                        "displayName": "Primary Account Number, Account Range",
                        "_id": "67bce37337eeb9b499cc6d2d"
                    },
                    {
                        "id": "DE-63.TV.16",
                        "length": 32,
                        "displayName": "Token Reference ID",
                        "_id": "67bce37337eeb9b499cc6d2e"
                    },
                    {
                        "id": "DE-63.TV.17",
                        "length": 4,
                        "displayName": "Token Expiration Date",
                        "_id": "67bce37337eeb9b499cc6d2f"
                    },
                    {
                        "id": "DE-63.TV.18",
                        "length": 2,
                        "displayName": "Token Type",
                        "_id": "67bce37337eeb9b499cc6d30"
                    },
                    {
                        "id": "DE-63.TV.19",
                        "length": 1,
                        "displayName": "Token Status",
                        "_id": "67bce37337eeb9b499cc6d31"
                    },
                    {
                        "id": "DE-63.TV.20",
                        "length": 1,
                        "displayName": "Last Updated By",
                        "_id": "67bce37337eeb9b499cc6d32"
                    },
                    {
                        "id": "DE-63.TV.21",
                        "length": 32,
                        "displayName": "PAN Reference ID",
                        "_id": "67bce37337eeb9b499cc6d33"
                    },
                    {
                        "id": "DE-63.TV.22",
                        "length": 8,
                        "displayName": "Activation Code",
                        "_id": "67bce37337eeb9b499cc6d34"
                    },
                    {
                        "id": "DE-63.TV.23",
                        "length": 12,
                        "displayName": "Activation Code Expiry Date/Time",
                        "_id": "67bce37337eeb9b499cc6d35"
                    },
                    {
                        "id": "DE-63.TV.24",
                        "length": 2,
                        "displayName": "Activation Code Verification Attempts",
                        "_id": "67bce37337eeb9b499cc6d36"
                    },
                    {
                        "id": "DE-63.TV.25",
                        "length": 2,
                        "displayName": "Number of Activation Codes Issued",
                        "_id": "67bce37337eeb9b499cc6d37"
                    },
                    {
                        "id": "DE-63.TV.26",
                        "length": 2,
                        "displayName": "Visa Token Score",
                        "_id": "67bce37337eeb9b499cc6d38"
                    },
                    {
                        "id": "DE-63.TV.27",
                        "length": 2,
                        "displayName": "Visa Token Decisioning",
                        "_id": "67bce37337eeb9b499cc6d39"
                    },
                    {
                        "id": "DE-63.TV.28",
                        "length": 2,
                        "displayName": "Number of Active Tokens",
                        "_id": "67bce37337eeb9b499cc6d3a"
                    },
                    {
                        "id": "DE-63.TV.29",
                        "length": 2,
                        "displayName": "Number of Inactive Tokens",
                        "_id": "67bce37337eeb9b499cc6d3b"
                    },
                    {
                        "id": "DE-63.TV.30",
                        "length": 2,
                        "displayName": "Number of Suspended Tokens",
                        "_id": "67bce37337eeb9b499cc6d3c"
                    },
                    {
                        "id": "DE-63.TV.31",
                        "length": 19,
                        "displayName": "Replacement PAN",
                        "_id": "67bce37337eeb9b499cc6d3d"
                    },
                    {
                        "id": "DE-63.TV.32",
                        "length": 4,
                        "displayName": "Replacement PAN Expiration Date",
                        "_id": "67bce37337eeb9b499cc6d3e"
                    },
                    {
                        "id": "DE-63.TV.33",
                        "length": 1,
                        "displayName": "Transaction Indicator",
                        "_id": "67bce37337eeb9b499cc6d3f"
                    },
                    {
                        "id": "DE-63.TV.34",
                        "length": 10,
                        "displayName": "Merchant Verification Value",
                        "_id": "67bce37337eeb9b499cc6d40"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d1e"
            },
            {
                "id": "DE-63.HA",
                "length": 268,
                "idToken": "HA",
                "displayName": "Token HA",
                "specification": [
                    {
                        "id": "DE-63.HA.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d42"
                    },
                    {
                        "id": "DE-63.HA.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d43"
                    },
                    {
                        "id": "DE-63.HA.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d44"
                    },
                    {
                        "id": "DE-63.HA.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d45"
                    },
                    {
                        "id": "DE-63.HA.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d46"
                    },
                    {
                        "id": "DE-63.HA.6",
                        "length": 3,
                        "displayName": "LGTH (Longitud de la URL)",
                        "_id": "67bce37337eeb9b499cc6d47"
                    },
                    {
                        "id": "DE-63.HA.7",
                        "length": 255,
                        "displayName": "URL-ADDR (Dirección del sitio web del propietario del terminal)",
                        "_id": "67bce37337eeb9b499cc6d48"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d41"
            },
            {
                "id": "DE-63.HB",
                "length": 110,
                "idToken": "HB",
                "displayName": "Token HB",
                "specification": [
                    {
                        "id": "DE-63.HB.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d4a"
                    },
                    {
                        "id": "DE-63.HB.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d4b"
                    },
                    {
                        "id": "DE-63.HB.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d4c"
                    },
                    {
                        "id": "DE-63.HB.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d4d"
                    },
                    {
                        "id": "DE-63.HB.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d4e"
                    },
                    {
                        "id": "DE-63.HB.6",
                        "length": 2,
                        "displayName": "FRMT-CDE (Código de formato)",
                        "_id": "67bce37337eeb9b499cc6d4f"
                    },
                    {
                        "id": "DE-63.HB.7",
                        "length": 2,
                        "displayName": "LGTH (Longitud de los datos en el búfer INFO)",
                        "_id": "67bce37337eeb9b499cc6d50"
                    },
                    {
                        "id": "DE-63.HB.8",
                        "length": 96,
                        "displayName": "INFO (Información adicional del propietario del terminal)",
                        "_id": "67bce37337eeb9b499cc6d51"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d49"
            },
            {
                "id": "DE-63.D2",
                "length": 110,
                "idToken": "D2",
                "displayName": "Token D2",
                "specification": [
                    {
                        "id": "DE-63.D2.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d53"
                    },
                    {
                        "id": "DE-63.D2.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d54"
                    },
                    {
                        "id": "DE-63.D2.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d55"
                    },
                    {
                        "id": "DE-63.D2.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d56"
                    },
                    {
                        "id": "DE-63.D2.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d57"
                    },
                    {
                        "id": "DE-63.D2.6",
                        "length": 20,
                        "displayName": "CUST-SRVC-PHONE (Número de servicio al cliente del propietario del terminal)",
                        "_id": "67bce37337eeb9b499cc6d58"
                    },
                    {
                        "id": "DE-63.D2.7",
                        "length": 25,
                        "displayName": "STR-ADDR (Dirección del terminal)",
                        "_id": "67bce37337eeb9b499cc6d59"
                    },
                    {
                        "id": "DE-63.D2.8",
                        "length": 15,
                        "displayName": "ACCPT-ID (Identificador del aceptador del terminal)",
                        "_id": "67bce37337eeb9b499cc6d5a"
                    },
                    {
                        "id": "DE-63.D2.9",
                        "length": 10,
                        "displayName": "POSTAL-CDE (Código postal del terminal)",
                        "_id": "67bce37337eeb9b499cc6d5b"
                    },
                    {
                        "id": "DE-63.D2.10",
                        "length": 30,
                        "displayName": "USER-FLD-ACI (Reservado para uso futuro)",
                        "_id": "67bce37337eeb9b499cc6d5c"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d52"
            },
            {
                "id": "DE-63.RJ",
                "length": 40,
                "idToken": "RJ",
                "displayName": "Token RJ",
                "specification": [
                    {
                        "id": "DE-63.RJ.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d5e"
                    },
                    {
                        "id": "DE-63.RJ.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d5f"
                    },
                    {
                        "id": "DE-63.RJ.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d60"
                    },
                    {
                        "id": "DE-63.RJ.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d61"
                    },
                    {
                        "id": "DE-63.RJ.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d62"
                    },
                    {
                        "id": "DE-63.RJ.6",
                        "length": 12,
                        "displayName": "Indicador de Protocolo 3DS",
                        "_id": "67bce37337eeb9b499cc6d63"
                    },
                    {
                        "id": "DE-63.RJ.7",
                        "length": 36,
                        "displayName": "DS-TXN-ID",
                        "_id": "67bce37337eeb9b499cc6d64"
                    },
                    {
                        "id": "RJ.8",
                        "length": 2,
                        "displayName": "User Field 3",
                        "_id": "67bce37337eeb9b499cc6d65"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d5d"
            },
            {
                "id": "DE-63.ER",
                "length": 2,
                "idToken": "ER",
                "displayName": "Token ER",
                "specification": [
                    {
                        "id": "DE-63.ER.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d67"
                    },
                    {
                        "id": "DE-63.ER.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d68"
                    },
                    {
                        "id": "DE-63.ER.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d69"
                    },
                    {
                        "id": "DE-63.ER.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d6a"
                    },
                    {
                        "id": "DE-63.ER.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d6b"
                    },
                    {
                        "id": "DE-63.ER.6",
                        "length": 1,
                        "displayName": "Bandera Actualización Llaves",
                        "_id": "67bce37337eeb9b499cc6d6c"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d66"
            },
            {
                "id": "DE-63.ES",
                "length": 60,
                "idToken": "ES",
                "displayName": "Token ES",
                "specification": [
                    {
                        "id": "DE-63.ES.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d6e"
                    },
                    {
                        "id": "DE-63.ES.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d6f"
                    },
                    {
                        "id": "DE-63.ES.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d70"
                    },
                    {
                        "id": "DE-63.ES.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d71"
                    },
                    {
                        "id": "DE-63.ES.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d72"
                    },
                    {
                        "id": "DE-63.ES.6",
                        "length": 60,
                        "displayName": "Configuración de cifrado / Estatus de la terminal",
                        "_id": "67bce37337eeb9b499cc6d73"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d6d"
            },
            {
                "id": "DE-63.ET",
                "length": 366,
                "idToken": "ET",
                "displayName": "Token ET",
                "specification": [
                    {
                        "id": "DE-63.ET.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d75"
                    },
                    {
                        "id": "DE-63.ET.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d76"
                    },
                    {
                        "id": "DE-63.ET.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d77"
                    },
                    {
                        "id": "DE-63.ET.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d78"
                    },
                    {
                        "id": "DE-63.ET.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d79"
                    },
                    {
                        "id": "DE-63.ET.6",
                        "length": 366,
                        "displayName": "Tabla de BINES que no se cifran",
                        "_id": "67bce37337eeb9b499cc6d7a"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d74"
            },
            {
                "id": "DE-63.EY",
                "length": 538,
                "idToken": "EY",
                "displayName": "Token EY",
                "specification": [
                    {
                        "id": "DE-63.EY.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d7c"
                    },
                    {
                        "id": "DE-63.EY.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d7d"
                    },
                    {
                        "id": "DE-63.EY.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d7e"
                    },
                    {
                        "id": "DE-63.EY.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d7f"
                    },
                    {
                        "id": "DE-63.EY.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d80"
                    },
                    {
                        "id": "DE-63.EY.6",
                        "length": 538,
                        "displayName": "Cifrado de track1",
                        "_id": "67bce37337eeb9b499cc6d81"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d7b"
            },
            {
                "id": "DE-63.EZ",
                "length": 98,
                "idToken": "EZ",
                "displayName": "Token EZ",
                "specification": [
                    {
                        "id": "DE-63.EZ.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d83"
                    },
                    {
                        "id": "DE-63.EZ.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d84"
                    },
                    {
                        "id": "DE-63.EZ.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d85"
                    },
                    {
                        "id": "DE-63.EZ.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d86"
                    },
                    {
                        "id": "DE-63.EZ.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d87"
                    },
                    {
                        "id": "DE-63.EZ.6",
                        "length": 98,
                        "displayName": "Banderas y datos sensitivos cifrados",
                        "_id": "67bce37337eeb9b499cc6d88"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d82"
            },
            {
                "id": "DE-63.EW",
                "length": 68,
                "idToken": "EW",
                "displayName": "Token EW",
                "specification": [
                    {
                        "id": "DE-63.EW.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d8a"
                    },
                    {
                        "id": "DE-63.EW.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d8b"
                    },
                    {
                        "id": "DE-63.EW.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d8c"
                    },
                    {
                        "id": "DE-63.EW.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d8d"
                    },
                    {
                        "id": "DE-63.EW.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d8e"
                    },
                    {
                        "id": "DE-63.EW.6",
                        "length": 68,
                        "displayName": "Requerimiento de generación de nueva llave",
                        "_id": "67bce37337eeb9b499cc6d8f"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d89"
            },
            {
                "id": "DE-63.EX",
                "length": 68,
                "idToken": "EX",
                "displayName": "Token EX",
                "specification": [
                    {
                        "id": "DE-63.EX.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d91"
                    },
                    {
                        "id": "DE-63.EX.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d92"
                    },
                    {
                        "id": "DE-63.EX.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d93"
                    },
                    {
                        "id": "DE-63.EX.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d94"
                    },
                    {
                        "id": "DE-63.EX.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d95"
                    },
                    {
                        "id": "DE-63.EX.6",
                        "length": 68,
                        "displayName": "Respuesta de generación de nueva llave",
                        "_id": "67bce37337eeb9b499cc6d96"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d90"
            },
            {
                "id": "DE-63.EP",
                "length": 65,
                "idToken": "EP",
                "displayName": "Token EP",
                "specification": [
                    {
                        "id": "DE-63.EP.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d98"
                    },
                    {
                        "id": "DE-63.EP.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6d99"
                    },
                    {
                        "id": "DE-63.EP.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6d9a"
                    },
                    {
                        "id": "DE-63.EP.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6d9b"
                    },
                    {
                        "id": "DE-63.EP.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6d9c"
                    },
                    {
                        "id": "DE-63.EP.6",
                        "length": 65,
                        "displayName": "Cifrado de PIN Online",
                        "_id": "67bce37337eeb9b499cc6d9d"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d97"
            },
            {
                "id": "DE-63.SX",
                "length": 64,
                "idToken": "SX",
                "displayName": "Token SX",
                "specification": [
                    {
                        "id": "DE-63.SX.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6d9f"
                    },
                    {
                        "id": "DE-63.SX.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6da0"
                    },
                    {
                        "id": "DE-63.SX.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6da1"
                    },
                    {
                        "id": "DE-63.SX.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6da2"
                    },
                    {
                        "id": "DE-63.SX.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6da3"
                    },
                    {
                        "id": "DE-63.SX.6",
                        "length": 2,
                        "displayName": "FRMT-CDE",
                        "_id": "67bce37337eeb9b499cc6da4"
                    },
                    {
                        "id": "DE-63.SX.7",
                        "length": 2,
                        "displayName": "LGTH",
                        "_id": "67bce37337eeb9b499cc6da5"
                    },
                    {
                        "id": "DE-63.SX.8",
                        "length": 1,
                        "displayName": "CRYPTO-TYP",
                        "_id": "67bce37337eeb9b499cc6da6"
                    },
                    {
                        "id": "DE-63.SX.9",
                        "length": 1,
                        "displayName": "CRYPTO-FRMT",
                        "_id": "67bce37337eeb9b499cc6da7"
                    },
                    {
                        "id": "DE-63.SX.10",
                        "length": 40,
                        "displayName": "CRYPTO",
                        "_id": "67bce37337eeb9b499cc6da8"
                    },
                    {
                        "id": "DE-63.SX.11",
                        "length": 18,
                        "displayName": "USER-FLD-GENRC",
                        "_id": "67bce37337eeb9b499cc6da9"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6d9e"
            },
            {
                "id": "DE-63.PO",
                "length": 80,
                "idToken": "PO",
                "displayName": "Token PO",
                "specification": [
                    {
                        "id": "DE-63.PO.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6dab"
                    },
                    {
                        "id": "DE-63.PO.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6dac"
                    },
                    {
                        "id": "DE-63.PO.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6dad"
                    },
                    {
                        "id": "DE-63.PO.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6dae"
                    },
                    {
                        "id": "DE-63.PO.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6daf"
                    },
                    {
                        "id": "DE-63.PO.6",
                        "length": 2,
                        "displayName": "Capacidad del Adquirente para utilizar FdA",
                        "_id": "67bce37337eeb9b499cc6db0"
                    },
                    {
                        "id": "DE-63.PO.7",
                        "length": 2,
                        "displayName": "Capacidad del Comercio para utilizar FdA",
                        "_id": "67bce37337eeb9b499cc6db1"
                    },
                    {
                        "id": "DE-63.PO.8",
                        "length": 2,
                        "displayName": "Estatus del FdA de parte del comercio",
                        "_id": "67bce37337eeb9b499cc6db2"
                    },
                    {
                        "id": "DE-63.PO.9",
                        "length": 16,
                        "displayName": "Elemento de Verificación del Tarjetahabiente (EVT)",
                        "_id": "67bce37337eeb9b499cc6db3"
                    },
                    {
                        "id": "DE-63.PO.10",
                        "length": 1,
                        "displayName": "Uso de los Elementos no convencionales (ENC) por parte del Comercio",
                        "_id": "67bce37337eeb9b499cc6db4"
                    },
                    {
                        "id": "DE-63.PO.11",
                        "length": 1,
                        "displayName": "ENC - Capacidad del Comercio para ejecutar Análisis de Riesgo",
                        "_id": "67bce37337eeb9b499cc6db5"
                    },
                    {
                        "id": "DE-63.PO.12",
                        "length": 1,
                        "displayName": "ENC - Resultado de Análisis del Comercio en la ejecución del Análisis de Riesgo",
                        "_id": "67bce37337eeb9b499cc6db6"
                    },
                    {
                        "id": "DE-63.PO.13",
                        "length": 15,
                        "displayName": "ENC - Dirección IP del Dispositivo Origen de la compra",
                        "_id": "67bce37337eeb9b499cc6db7"
                    },
                    {
                        "id": "DE-63.PO.14",
                        "length": 2,
                        "displayName": "ENC - Catálogo de Elementos No Convencionales",
                        "_id": "67bce37337eeb9b499cc6db8"
                    },
                    {
                        "id": "DE-63.PO.15",
                        "length": 38,
                        "displayName": "ENC - Detalle de Elementos No Convencionales",
                        "_id": "67bce37337eeb9b499cc6db9"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6daa"
            },
            {
                "id": "DE-63.PY",
                "length": 60,
                "idToken": "PY",
                "displayName": "Token PY",
                "specification": [
                    {
                        "id": "DE-63.PY.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6dbb"
                    },
                    {
                        "id": "DE-63.PY.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6dbc"
                    },
                    {
                        "id": "DE-63.PY.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6dbd"
                    },
                    {
                        "id": "DE-63.PY.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6dbe"
                    },
                    {
                        "id": "DE-63.PY.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6dbf"
                    },
                    {
                        "id": "DE-63.PY.6",
                        "length": 2,
                        "displayName": "Capacidad del Emisor para utilizar FdA",
                        "_id": "67bce37337eeb9b499cc6dc0"
                    },
                    {
                        "id": "DE-63.PY.7",
                        "length": 2,
                        "displayName": "Estatus de Elementos de Seguridad",
                        "_id": "67bce37337eeb9b499cc6dc1"
                    },
                    {
                        "id": "DE-63.PY.8",
                        "length": 2,
                        "displayName": "Estatus del Emisor y los FdA",
                        "_id": "67bce37337eeb9b499cc6dc2"
                    },
                    {
                        "id": "DE-63.PY.9",
                        "length": 2,
                        "displayName": "Factor 'A' - Primer Factor",
                        "_id": "67bce37337eeb9b499cc6dc3"
                    },
                    {
                        "id": "DE-63.PY.10",
                        "length": 2,
                        "displayName": "Factor 'A' - Segundo Factor",
                        "_id": "67bce37337eeb9b499cc6dc4"
                    },
                    {
                        "id": "DE-63.PY.11",
                        "length": 1,
                        "displayName": "Resultado Verificación Factor 'A'",
                        "_id": "67bce37337eeb9b499cc6dc5"
                    },
                    {
                        "id": "DE-63.PY.12",
                        "length": 2,
                        "displayName": "Factor 'B' - Primer Factor",
                        "_id": "67bce37337eeb9b499cc6dc6"
                    },
                    {
                        "id": "DE-63.PY.13",
                        "length": 2,
                        "displayName": "Factor 'B' - Segundo Factor",
                        "_id": "67bce37337eeb9b499cc6dc7"
                    },
                    {
                        "id": "DE-63.PY.14",
                        "length": 1,
                        "displayName": "Resultado de Verificación Factor 'B'",
                        "_id": "67bce37337eeb9b499cc6dc8"
                    },
                    {
                        "id": "DE-63.PY.15",
                        "length": 2,
                        "displayName": "Factor 'C' - Primer Factor; (Biométrico)",
                        "_id": "67bce37337eeb9b499cc6dc9"
                    },
                    {
                        "id": "DE-63.PY.16",
                        "length": 2,
                        "displayName": "Factor 'C' - Segundo Factor; (Biométrico)",
                        "_id": "67bce37337eeb9b499cc6dca"
                    },
                    {
                        "id": "DE-63.PY.17",
                        "length": 1,
                        "displayName": "Resultado de Verificación Factor 'C'",
                        "_id": "67bce37337eeb9b499cc6dcb"
                    },
                    {
                        "id": "DE-63.PY.18",
                        "length": 1,
                        "displayName": "Resultado del DFA",
                        "_id": "67bce37337eeb9b499cc6dcc"
                    },
                    {
                        "id": "DE-63.PY.19",
                        "length": 1,
                        "displayName": "Recepción de los Elementos no convencionales (ENC) por parte del Emisor",
                        "_id": "67bce37337eeb9b499cc6dcd"
                    },
                    {
                        "id": "DE-63.PY.20",
                        "length": 37,
                        "displayName": "USER-FLD3",
                        "_id": "67bce37337eeb9b499cc6dce"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6dba"
            },
            {
                "id": "DE-63.PJ",
                "length": 2,
                "idToken": "PJ",
                "displayName": "Token PJ",
                "specification": [
                    {
                        "id": "DE-63.PJ.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6dd0"
                    },
                    {
                        "id": "DE-63.PJ.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6dd1"
                    },
                    {
                        "id": "DE-63.PJ.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6dd2"
                    },
                    {
                        "id": "DE-63.PJ.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6dd3"
                    },
                    {
                        "id": "DE-63.PJ.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6dd4"
                    },
                    {
                        "id": "DE-63.PJ.6",
                        "length": 1,
                        "displayName": "POS-ENV-INI",
                        "_id": "67bce37337eeb9b499cc6dd5"
                    },
                    {
                        "id": "DE-63.PJ.7",
                        "length": 1,
                        "displayName": "POS-ENV-TYPE",
                        "_id": "67bce37337eeb9b499cc6dd6"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6dcf"
            },
            {
                "id": "DE-63.BL",
                "length": 34,
                "idToken": "BL",
                "displayName": "Token BL",
                "specification": [
                    {
                        "id": "DE-63.BL.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6dd8"
                    },
                    {
                        "id": "DE-63.BL.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6dd9"
                    },
                    {
                        "id": "DE-63.BL.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6dda"
                    },
                    {
                        "id": "DE-63.BL.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6ddb"
                    },
                    {
                        "id": "DE-63.BL.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6ddc"
                    },
                    {
                        "id": "DE-63.BL.6",
                        "length": 19,
                        "displayName": "PSEUDO-CRD-NUM",
                        "_id": "67bce37337eeb9b499cc6ddd"
                    },
                    {
                        "id": "DE-63.BL.7",
                        "length": 4,
                        "displayName": "EXP-DAT",
                        "_id": "67bce37337eeb9b499cc6dde"
                    },
                    {
                        "id": "DE-63.BL.8",
                        "length": 11,
                        "displayName": "USER-FLD",
                        "_id": "67bce37337eeb9b499cc6ddf"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6dd7"
            },
            {
                "id": "DE-63.Q5",
                "length": 12,
                "idToken": "Q5",
                "displayName": "Token Q5",
                "specification": [
                    {
                        "id": "DE-63.Q5.1",
                        "length": 1,
                        "displayName": "Eye-Catcher",
                        "_id": "67bce37337eeb9b499cc6de1"
                    },
                    {
                        "id": "DE-63.Q5.2",
                        "length": 1,
                        "displayName": "User Field 1",
                        "_id": "67bce37337eeb9b499cc6de2"
                    },
                    {
                        "id": "DE-63.Q5.3",
                        "length": 2,
                        "displayName": "Identificador Token",
                        "_id": "67bce37337eeb9b499cc6de3"
                    },
                    {
                        "id": "DE-63.Q5.4",
                        "length": 5,
                        "displayName": "Longitud de Datos",
                        "_id": "67bce37337eeb9b499cc6de4"
                    },
                    {
                        "id": "DE-63.Q5.5",
                        "length": 1,
                        "displayName": "User Field 2",
                        "_id": "67bce37337eeb9b499cc6de5"
                    },
                    {
                        "id": "DE-63.Q5.6",
                        "length": 19,
                        "displayName": "AMOUNT 1",
                        "_id": "67bce37337eeb9b499cc6de6"
                    },
                    {
                        "id": "DE-63.Q5.7",
                        "length": 19,
                        "displayName": "AMOUNT 2",
                        "_id": "67bce37337eeb9b499cc6de7"
                    },
                    {
                        "id": "DE-63.Q5.8",
                        "length": 19,
                        "displayName": "AMOUNT 3",
                        "_id": "67bce37337eeb9b499cc6de8"
                    },
                    {
                        "id": "DE-63.Q5.9",
                        "length": 3,
                        "displayName": "CRNCY-CDE",
                        "_id": "67bce37337eeb9b499cc6de9"
                    },
                    {
                        "id": "DE-63.Q5.10",
                        "length": 3,
                        "displayName": "CNTRY-CDE",
                        "_id": "67bce37337eeb9b499cc6dea"
                    },
                    {
                        "id": "DE-63.Q5.11",
                        "length": 8,
                        "displayName": "CONV-RATE",
                        "_id": "67bce37337eeb9b499cc6deb"
                    },
                    {
                        "id": "DE-63.Q5.12",
                        "length": 1,
                        "displayName": "CONV-RESPONDER",
                        "_id": "67bce37337eeb9b499cc6dec"
                    },
                    {
                        "id": "DE-63.Q5.13",
                        "length": 1,
                        "displayName": "USER-FLD",
                        "_id": "67bce37337eeb9b499cc6ded"
                    },
                    {
                        "id": "DE-63.Q5.14",
                        "length": 3,
                        "displayName": "04 ORG-CRNCY-CDE PIC 9",
                        "_id": "67bce37337eeb9b499cc6dee"
                    },
                    {
                        "id": "DE-63.Q5.14",
                        "length": 3,
                        "displayName": "04 SET-CRNCY-CDE PIC 9",
                        "_id": "67bce37337eeb9b499cc6def"
                    },
                    {
                        "id": "DE-63.Q5.14",
                        "length": 3,
                        "displayName": "04 ISS-CRNCY-CDE PIC 9",
                        "_id": "67bce37337eeb9b499cc6df0"
                    },
                    {
                        "id": "DE-63.Q5.14",
                        "length": 3,
                        "displayName": "04 USER_FLD2 PIC 9",
                        "_id": "67bce37337eeb9b499cc6df1"
                    },
                    {
                        "id": "DE-63.Q5.14",
                        "length": 19,
                        "displayName": "CONV-DAT-TIME",
                        "_id": "67bce37337eeb9b499cc6df2"
                    }
                ],
                "_id": "67bce37337eeb9b499cc6de0"
            }
        ],
        "_id": "67bce37337eeb9b499cc6c15"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-64",
        "displayName": "Primary Message Authentication Code",
        "dataType": "Alfanúmerico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6df3"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-66",
        "displayName": "Settlement Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 1,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6df4"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-67",
        "displayName": "Extendend Payment Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 2,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6df5"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-68",
        "displayName": "Reciving Insitution Country Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6df6"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-69",
        "displayName": "Settlement Institution Country Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6df7"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-70",
        "displayName": "Network Managment Information Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 3,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6df8"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-71",
        "displayName": "Message Number",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 4,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6df9"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-72",
        "displayName": "Message Number Last",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 4,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6dfa"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-73",
        "displayName": "Action Date",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 6,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6dfb"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-74",
        "displayName": "Number Credits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 10,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6dfc"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-75",
        "displayName": "Reversal Number Credits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 10,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6dfd"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-76",
        "displayName": "Number Debits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 10,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6dfe"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-77",
        "displayName": "Reversal Number Debits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 10,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6dff"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-78",
        "displayName": "Number Transfer",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 10,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e00"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-79",
        "displayName": "Reversal Number Transfer",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 10,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e01"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-80",
        "displayName": "Number Inquires",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 10,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e02"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-81",
        "displayName": "Number Authorizations",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 10,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e03"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-82",
        "displayName": "Processing Fee Amount Credits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 12,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e04"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-83",
        "displayName": "Transaction Fee Amount Credits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 12,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e05"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-84",
        "displayName": "Processing Fee Amount Debits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 12,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e06"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-85",
        "displayName": "Transaction Fee Amounts Debits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 12,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e07"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-86",
        "displayName": "Amounts Credits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e08"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-87",
        "displayName": "Reversal Amount Credits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e09"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-88",
        "displayName": "Amount Debits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e0a"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-89",
        "displayName": "Reversal Amount Debits",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e0b"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-90",
        "displayName": "Original Data Elements",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 42,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e0c"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-91",
        "displayName": "File Update Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 1,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e0d"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-92",
        "displayName": "File Security Code",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 2,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e0e"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-93",
        "displayName": "Response Indicator",
        "dataType": "Alfaumérico",
        "isLengthVariable": false,
        "length": 5,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e0f"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-94",
        "displayName": "Service Indicator",
        "dataType": "Alfanumérico",
        "isLengthVariable": false,
        "length": 7,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e10"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-95",
        "displayName": "Replaced Amounts",
        "dataType": "Alfanumperico",
        "isLengthVariable": false,
        "length": 42,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e11"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-96",
        "displayName": "Message Security Code",
        "dataType": "Alfanumérico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e12"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-97",
        "displayName": "Net Settlement Amount",
        "dataType": "Numérico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e13"
    },
    {
        "positionsLength": null,
        "idBitmap": "DE-98",
        "displayName": "Payee",
        "dataType": "Alfanumérico",
        "isLengthVariable": false,
        "length": 25,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e14"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 2
        },
        "idBitmap": "DE-99",
        "displayName": "Settlement Institution Identification Code",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 11,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e15"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 2
        },
        "idBitmap": "DE-100",
        "displayName": "Reciving Institution Identification Code",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 11,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e16"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 2
        },
        "idBitmap": "DE-102",
        "displayName": "Account Identification 1",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 28,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e17"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-103",
        "displayName": "Account Identification 2",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 28,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e18"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-120",
        "displayName": "Administrative Token",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 153,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e19"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-121",
        "displayName": "Authorization Indicators",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 28,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e1a"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-122",
        "displayName": "Card Issuer Identification Code",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 14,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e1b"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-123",
        "displayName": "Cryptographic Service Message",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 553,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e1c"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-124",
        "displayName": "Batch and Shift Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 687,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e1d"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-125",
        "displayName": "Settlement Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 267,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e1e"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 3
        },
        "idBitmap": "DE-126",
        "displayName": "Additional Data",
        "dataType": "Alfanúmerico Caracteres Especiales",
        "isLengthVariable": true,
        "length": 800,
        "regex": "^[a-zA-Z0-9!@#$%&*()_+=[\\]{};:\\|,.<>/?\\s]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e1f"
    },
    {
        "positionsLength": {
            "initPos": 0,
            "finalPos": 2
        },
        "idBitmap": "DE-128",
        "displayName": "Secondary Message Authentication Code",
        "dataType": "Alfanúmerico",
        "isLengthVariable": false,
        "length": 16,
        "regex": "^[a-zA-Z0-9]+$",
        "isBreakeable": false,
        "breakingRules": null,
        "_id": "67bce37337eeb9b499cc6e20"
    }
]