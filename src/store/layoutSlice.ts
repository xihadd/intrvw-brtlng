import { createSlice } from '@reduxjs/toolkit'

export interface LayoutState {
    searchOpen: boolean
    mobileMenuOpen: boolean
}

const initialState: LayoutState = {
    searchOpen: false,
    mobileMenuOpen: false,
}

export const layoutSlice= createSlice({
name:"layout",
initialState,
reducers:{
     toggleSearch:state=>{
        state.searchOpen= !state.searchOpen;
     },
     toggleMobileMenu:state=>{
        state.mobileMenuOpen= !state.mobileMenuOpen
    },
   }
})

export const { toggleSearch, toggleMobileMenu } = layoutSlice.actions

export default layoutSlice.reducer
