// store/slices/alertSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define el estado inicial para el slice
interface IAlertMessage {
  type: "success" | "info" | "warning" | "error" | undefined;
  message: string | null;
}

interface globalState {
  value: IAlertMessage;
}

const initialState: globalState = {
  value: {
    type: undefined,
    message: null,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IAlertMessage>) => {
      state.value = action.payload;

      // setTimeout(() => {
      //   state.value = {
      //     type: undefined,
      //     message: null,
      //   };
      // }, 5000);
    },

    resetMessage: (state) => {
      state.value = {
        type: undefined,
        message: null,
      };
    },
  },
});

export const { addMessage, resetMessage } = globalSlice.actions;

export default globalSlice.reducer;
