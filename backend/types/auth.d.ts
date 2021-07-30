import type { Session } from 'express-session';

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

interface UserSession extends Session {
    user?: User
}