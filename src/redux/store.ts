import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import generalReducer from "./slices/generalSlice";

export const store = configureStore({
  reducer: {
    general: generalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
