import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { string } from 'zod';

export type StatusType = 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined;
export type InitialState = {
  data: { title: string; status: StatusType } | null;
};

const initialState: InitialState = {
  data: null,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, { payload }: PayloadAction<{ title: string; status: StatusType } | null>) => {
      state.data = payload;
    },
  },
});

export default toastSlice;

export const { setToast } = toastSlice.actions;