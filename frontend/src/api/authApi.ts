import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type User = {
    id: string,
    username: string,
    email: string
}

type RegistrationRequest = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

type LoginRequest = {
    email: string,
    password: string
}

type LoggedOutResponse = {
    message: string
}

// type RegistrationError = {
//     status: number,
//     statusCode: number,
//     message: string,
//     expose: boolean
// }

// type LoginError = {
//     status: number,
//     statusCode: number,
//     message: string,
//     expose: boolean
// }

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    endpoints: builder => ({
        signUp: builder.mutation<User, RegistrationRequest>({
            query: ({username, email, password, confirmPassword}) => ({
                url: '/auth/register',
                method: 'POST',
                body: {
                    username,
                    email,
                    password,
                    confirmPassword
                }
            })
        }),
        login: builder.mutation<User, LoginRequest>({
            query: ({email, password}) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    email,
                    password
                }
            })
        }),
        logout: builder.mutation<LoggedOutResponse, void>({
            query: () => ({
                url: '/auth',
                method: 'DELETE'
            })
        }),
        protected: builder.mutation<User, void>({
            query: () => `/auth/verify`
        })
    })
});

export const { useSignUpMutation, useLoginMutation, useLogoutMutation, useProtectedMutation} = authApi;
