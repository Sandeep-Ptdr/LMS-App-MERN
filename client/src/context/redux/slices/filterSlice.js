import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name:'filteredData',
    initialState: {
        category: "All",
        statuses:"All"
    },
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setStatus: (state, action) => {
            state.statuses = action.payload
        }
    }
})

export const {setCategory, setStatus} = filterSlice.actions;
export default filterSlice.reducer;