import { CreateTemplate } from "../../interfaces";

export const saleTemplate: CreateTemplate = {
    "name": "Venta Template",
    "description": "Plantilla de una venta con su respuesta",
    "category": "Venta",
    "type": "pos",
    "validationTransaction": [
        {
            "idBitmap": "HD-1",
            "isRequired": true,
            "fields": [
                {
                    "idBitmap": "HD-1.1",
                    "function": "equals",
                    "isRequired": true,
                    "value": "ISO"
                },
                {
                    "idBitmap": "HD-1.2",
                    "function": "equals",
                    "isRequired": true,
                    "value": "02"
                },
                {
                    "idBitmap": "HD-1.3",
                    "function": "equals",
                    "isRequired": true,
                    "value": "60"
                },
                {
                    "idBitmap": "HD-1.4",
                    "function": "equals",
                    "isRequired": true,
                    "value": "000"
                },
                {
                    "idBitmap": "HD-1.5",
                    "function": "equals",
                    "isRequired": true,
                    "value": "1"
                },
                {
                    "idBitmap": "HD-1.6",
                    "function": "equals",
                    "isRequired": true,
                    "value": "0"
                }
            ]
        },
        {
            "idBitmap": "HD-2",
            "isRequired": true,
            "function": "equals",
            "value": "0200"
        },
        {
            "idBitmap": "HD-3",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-1",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-3",
            "isRequired": true,
            "fields": [
                {
                    "idBitmap": "DE-3.1",
                    "function": "equals",
                    "isRequired": true,
                    "value": "00"
                },
                {
                    "idBitmap": "DE-3.2",
                    "function": "equals",
                    "isRequired": true,
                    "value": "10"
                },
                {
                    "idBitmap": "DE-3.3",
                    "function": "equals",
                    "isRequired": true,
                    "value": "00"
                }
            ]
        },
        {
            "idBitmap": "DE-4",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-7",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-11",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-12",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-13",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-18",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-22",
            "function": "equals",
            "value": "051"
        },
        {
            "idBitmap": "DE-32",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-35",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-37",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-41",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-42",
            "isRequired": false,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-43",
            "isRequired": true,
            "fields": [
                {
                    "idBitmap": "DE-43.1",
                    "function": "includes",
                    "isRequired": true,
                    "value": "BANORTE"
                },
                {
                    "idBitmap": "DE-43.2",
                    "function": "includes",
                    "isRequired": true,
                    "value": "CD MEXICO"
                },
                {
                    "idBitmap": "DE-43.3",
                    "function": "not_validate",
                    "isRequired": true,
                    "value": "014"
                },
                {
                    "idBitmap": "DE-43.4",
                    "function": "includes",
                    "isRequired": true,
                    "value": "MX"
                }
            ]
        },
        {
            "idBitmap": "DE-48",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-49",
            "isRequired": true,
            "function": "equals",
            "value": "484"
        },
        {
            "idBitmap": "DE-60",
            "isRequired": true,
            "function": "includes",
            "value": "B062PRO1"
        },
        {
            "idBitmap": "DE-61",
            "isRequired": true,
            "function": "includes",
            "value": "B475PRO1"
        },
        {
            "idBitmap": "DE-63",
            "isRequired": true,
            "fields": [
                {
                    "idBitmap": "DE-63.HDR",
                    "isRequired": true,
                    "fields": [
                        {
                            "idBitmap": "DE-63.HDR.1",
                            "function": "equals",
                            "value": "&"
                        },
                        {
                            "idBitmap": "DE-63.HDR.2",
                            "function": "equals",
                            "value": " "
                        },
                        {
                            "idBitmap": "DE-63.HDR.3",
                            "function": "equals",
                            "value": "00001"
                        },
                        {
                            "idBitmap": "DE-63.HDR.4",
                            "function": "equals",
                            "value": "00024"
                        }
                    ]
                },
                {
                    "idBitmap": "DE-63.Q2",
                    "isRequired": true,
                    "fields": [
                        {
                            "idBitmap": "DE-63.Q2.1",
                            "function": "equals",
                            "value": "!"
                        },
                        {
                            "idBitmap": "DE-63.Q2.2",
                            "function": "equals",
                            "value": " "
                        },
                        {
                            "idBitmap": "DE-63.Q2.3",
                            "function": "equals",
                            "value": "Q2"
                        },
                        {
                            "idBitmap": "DE-63.Q2.4",
                            "function": "equals",
                            "value": "00002"
                        },
                        {
                            "idBitmap": "DE-63.Q2.5",
                            "function": "equals",
                            "value": " "
                        },
                        {
                            "idBitmap": "DE-63.Q2.6",
                            "function": "equals",
                            "value": "03"
                        }
                    ]
                },
                {
                    "idBitmap": "DE-63.B4",
                    "isRequired": true,
                    "fields": [
                        {
                            "idBitmap": "DE-63.B4.1",
                            "function": "equals",
                            "value": "!"
                        },
                        {
                            "idBitmap": "DE-63.B4.2",
                            "function": "equals",
                            "value": " "
                        },
                        {
                            "idBitmap": "DE-63.B4.3",
                            "function": "equals",
                            "value": "B4"
                        },
                        {
                            "idBitmap": "DE-63.B4.4",
                            "function": "equals",
                            "value": "00020"
                        },
                        {
                            "idBitmap": "DE-63.B4.5",
                            "function": "equals",
                            "value": " "
                        },
                        {
                            "idBitmap": "DE-63.B4.6",
                            "function": "compare_to",
                            "value": "DE-43.3"
                        },
                        {
                            "idBitmap": "DE-63.B4.7",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.B4.8",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.B4.9",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.B4.10",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.B4.11",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.B4.12",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.B4.13",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.B4.14",
                            "function": "not_validate"
                        }
                    ]
                },
                {
                    "idBitmap": "DE-63.FA",
                    "isRequired": true,
                    "fields": [
                        {
                            "idBitmap": "DE-63.FA.1",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.FA.2",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.FA.3",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.FA.4",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.FA.5",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.FA.6",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.FA.7",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.FA.8",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.FA.9",
                            "function": "not_validate"
                        },
                        {
                            "idBitmap": "DE-63.FA.10",
                            "function": "compare_to",
                            "value": "DE-49"
                        },
                        {
                            "idBitmap": "DE-63.FA.11",
                            "function": "not_validate"
                        }
                    ]
                }
            ]
        },
        {
            "idBitmap": "DE-100",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-120",
            "isRequired": true,
            "function": "includes",
            "value": "BAHIA NO 1900"
        },
        {
            "idBitmap": "DE-121",
            "isRequired": true,
            "function": "not_validate"
        },
        {
            "idBitmap": "DE-125",
            "isRequired": true,
            "function": "includes",
            "value": "P2B24"
        },
        {
            "idBitmap": "DE-126",
            "isRequired": true,
            "function": "not_validate"
        }
    ],
    "generationTransaction": [
        {
            "idBitmap": "HD-1",
            "function": "value",
            "value": "ISO026000015",
            "fields": [
                {
                    "idBitmap": "HD-1.1",
                    "function": "value",
                    "value": "ISO"
                },
                {
                    "idBitmap": "HD-1.2",
                    "function": "value",
                    "value": "02"
                },
                {
                    "idBitmap": "HD-1.3",
                    "function": "value",
                    "value": "60"
                },
                {
                    "idBitmap": "HD-1.4",
                    "function": "value",
                    "value": "000"
                },
                {
                    "idBitmap": "HD-1.5",
                    "function": "value",
                    "value": "1"
                },
                {
                    "idBitmap": "HD-1.6",
                    "function": "value",
                    "value": "5"
                }
            ]
        },
        {
            "idBitmap": "HD-2",
            "function": "value",
            "value": "0210"
        },
        {
            "idBitmap": "HD-3",
            "function": "calculated",
            "value": null
        },
        {
            "idBitmap": "DE-1",
            "function": "calculated",
            "value": null
        },
        {
            "idBitmap": "DE-3",
            "function": "echo",
            "fields": [
                {
                    "idBitmap": "DE-3.1",
                    "function": "echo"
                },
                {
                    "idBitmap": "DE-3.2",
                    "function": "echo"
                },
                {
                    "idBitmap": "DE-3.3",
                    "function": "echo"
                }
            ]
        },
        {
            "idBitmap": "DE-4",
            "function": "echo"
        },
        {
            "idBitmap": "DE-7",
            "function": "calculated"
        },
        {
            "idBitmap": "DE-11",
            "function": "echo"
        },
        {
            "idBitmap": "DE-12",
            "function": "calculated"
        },
        {
            "idBitmap": "DE-13",
            "function": "calculated"
        },
        {
            "idBitmap": "DE-18",
            "function": "echo"
        },
        {
            "idBitmap": "DE-22",
            "function": "echo"
        },
        {
            "idBitmap": "DE-25",
            "function": "echo"
        },
        {
            "idBitmap": "DE-32",
            "function": "echo"
        },
        {
            "idBitmap": "DE-35",
            "function": "echo"
        },
        {
            "idBitmap": "DE-37",
            "function": "echo"
        },
        {
            "idBitmap": "DE-38",
            "function": "calculated"
        },
        {
            "idBitmap": "DE-39",
            "function": "value",
            "value": "00"
        },
        {
            "idBitmap": "DE-41",
            "function": "echo"
        },
        {
            "idBitmap": "DE-42",
            "function": "echo"
        },
        {
            "idBitmap": "DE-48",
            "function": "echo"
        },
        {
            "idBitmap": "DE-49",
            "function": "echo"
        },
        {
            "idBitmap": "DE-60",
            "function": "echo"
        },
        {
            "idBitmap": "DE-61",
            "function": "echo"
        },
        {
            "idBitmap": "DE-63",
            "function": "echo",
            "fields": [
                {
                    "idBitmap": "DE-63.HDR",
                    "function": "echo",
                    "fields": [
                        {
                            "idBitmap": "DE-63.HDR.1",
                            "function": "echo"
                        },
                        {
                            "idBitmap": "DE-63.HDR.2",
                            "function": "echo"
                        },
                        {
                            "idBitmap": "DE-63.HDR.3",
                            "function": "echo"
                        },
                        {
                            "idBitmap": "DE-63.HDR.4",
                            "function": "echo"
                        }
                    ]
                },
                {
                    "idBitmap": "DE-63.Q2",
                    "function": "echo",
                    "fields": [
                        {
                            "idBitmap": "DE-63.Q2.1",
                            "function": "echo"
                        },
                        {
                            "idBitmap": "DE-63.Q2.2",
                            "function": "echo"
                        },
                        {
                            "idBitmap": "DE-63.Q2.3",
                            "function": "echo"
                        },
                        {
                            "idBitmap": "DE-63.Q2.3",
                            "function": "echo"
                        },
                        {
                            "idBitmap": "DE-63.Q2.4",
                            "function": "echo"
                        },
                        {
                            "idBitmap": "DE-63.Q2.6",
                            "function": "echo"
                        }
                    ]
                }
            ]
        },
        {
            "idBitmap": "DE-100",
            "function": "echo"
        },
        {
            "idBitmap": "DE-120",
            "function": "echo"
        },
        {
            "idBitmap": "DE-121",
            "function": "echo"
        },
        {
            "idBitmap": "DE-125",
            "function": "echo"
        },
        {
            "idBitmap": "DE-126",
            "function": "echo"
        }
    ]
}