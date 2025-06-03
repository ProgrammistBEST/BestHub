// src/store/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "manual",
  formData: {
    brand: "",
    platform: "BestHub",
    article: "",
    sku: "",
    sizes: [],
    pairs: [],
    category: "",
    gender: "",
    color: "",
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const { setMode, setFormData, resetFormData } = formSlice.actions;

export default formSlice.reducer;