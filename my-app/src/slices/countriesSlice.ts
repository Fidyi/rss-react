import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
  countries: ['USA', 'Canada', 'Germany', 'France', 'Australia'],
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
})

export const selectCountries = (state: RootState) => state.countries.countries
export default countriesSlice.reducer
