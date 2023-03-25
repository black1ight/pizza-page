import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { calcTotalPrice } from "../../utils/calcTotalPrice"
import { getLocalCart } from "../../utils/getLocalCart"
import { RootState } from "../store"

export type CartItemType = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    count: number
}

interface CartSliceState {
    items: CartItemType[]
    totalPrice: number
}

const { items, totalPrice } = getLocalCart()

const initialState: CartSliceState = {
    items,
    totalPrice
}

const cartSlise = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
            console.log(findItem)
        },

        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem && findItem.count > 1) {
                findItem.count--
            }
            state.totalPrice = calcTotalPrice(state.items)
        },

        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
            state.totalPrice = calcTotalPrice(state.items)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const selectCart = (state: RootState) => state.cart

export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)

export const { addItem, minusItem, removeItem, clearItems } = cartSlise.actions

export default cartSlise.reducer