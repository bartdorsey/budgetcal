import type { Session } from 'express-session';
import User from '../models/User'

// Merge our User class into the Express Session module
declare module 'express-session' {
    interface Session {
        user: User
    }
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