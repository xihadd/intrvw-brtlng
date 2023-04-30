import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface LayoutState {
    searchOpen: boolean
    mobileMenuOpen: boolean
}

const initialState: LayoutState = {
    searchOpen: false,
    mobileMenuOpen: false,
}

// create a slice 
export const layoutSlice= createSlice({
name:"layout",
initialState,
reducers:{
     toggleSearch:state=>{
        console.log("toggleSearch");
        state.searchOpen= !state.searchOpen;
     },
     toggleMobileMenu:state=>{
        console.log("toggleMobileMenu");
        state.mobileMenuOpen= !state.mobileMenuOpen
    },
   }
})

export const { toggleSearch, toggleMobileMenu } = layoutSlice.actions

export default layoutSlice.reducer
