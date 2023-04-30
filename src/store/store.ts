import { configureStore } from '@reduxjs/toolkit'
import layoutSlice from './layoutSlice'
import filterSlice from './filterSlice'

export const store = configureStore({
  reducer: {
    layout: layoutSlice,
    filters: filterSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch