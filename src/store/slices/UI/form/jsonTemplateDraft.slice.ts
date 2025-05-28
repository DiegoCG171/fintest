import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateTemplate, JsonTemplateState } from "../../../../config/interfaces";
import { saleTemplate } from "../../../../config/mock";

const initialState: JsonTemplateState = {
    data: saleTemplate,
};

export const jsonTemplateDraftSlice = createSlice({
    name: "jsonTemplateDraft",
    initialState,
    reducers: {
        setJsonTemplate(state, action: PayloadAction<CreateTemplate>) {
            state.data = action.payload;
        },
        resetJsonTemplate(state) {
            state.data = saleTemplate;
        },
    },
});

export const { setJsonTemplate, resetJsonTemplate } = jsonTemplateDraftSlice.actions;