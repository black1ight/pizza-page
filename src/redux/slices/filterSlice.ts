import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FilterSliceState {
    searchValue: string
    currentPage: number
    categoryId: number
    sortType: number
    sortArrow: boolean
}

const initialState: FilterSliceState = {
    searchValue: '',
    currentPage: 1,
    categoryId: 0,
    sortType: 0,
    sortArrow: false
}

const filterSlise = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSortType(state, action) {
            state.sortType = action.payload
        },
        setSortArrow(state, action: PayloadAction<boolean>) {
            state.sortArrow = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilter(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.sortType = Number(action.payload.sortType)
            state.sortArrow = action.payload.sortArrow
        }
    }
})

export const { setSearchValue, setCategoryId, setSortType, setSortArrow, setCurrentPage, setFilter } = filterSlise.actions

export default filterSlise.reducer