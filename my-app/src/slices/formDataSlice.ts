import { createSlice, PayloadAction } from '@reduxjs/toolkit/react'
import { FormData } from '../components/FormHookForm'
interface FormDataState {
  data: FormData[]
}

const initialState: FormDataState = {
  data: [],
}

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.data.push(action.payload)
    },
  },
})

export const { addFormData } = formDataSlice.actions
export const formDataReducer = formDataSlice.reducer
