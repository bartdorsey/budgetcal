import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../api/authApi';
import type { RootState } from '../store';

type AuthState = {
    user: User | null
}

const initialState: AuthState = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (
            state, 
            { payload: user }: PayloadAction<User>) => {
            state.user = user;
        },
        deleteUser: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, deleteUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user