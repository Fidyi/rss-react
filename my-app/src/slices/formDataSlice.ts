import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormValues } from '../components/FormHookForm'

type FormValuesWithBase64 = FormValues<string | null>

interface FormDataState {
  data: FormValuesWithBase64[]
}

const initialState: FormDataState = {
  data: [],
}

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormValuesWithBase64>) => {
      state.data = [action.payload]
    },
  },
})

export const { addFormData } = formDataSlice.actions
export const formDataReducer = formDataSlice.reducer
