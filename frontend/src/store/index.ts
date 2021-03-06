import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import logger from 'redux-logger';
import { authApi } from '../api/authApi';
import authReducer from '../slices/authSlice';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    'auth': authReducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    logger,
    authApi.middleware,
  ],
  devTools: true,
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
