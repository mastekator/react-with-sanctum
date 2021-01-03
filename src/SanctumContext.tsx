import * as React from 'react'
import {AxiosError} from 'axios'

export interface ContextProps {
    user: Record<string, never> | null | false
    authenticated: null | boolean
    signIn: (signInData: Record<string, never>) => Promise<() => Promise<Record<string, never> | AxiosError | boolean>>
    signUp: (signUpData: Record<string, never>) => Promise<() => Promise<Record<string, never> | AxiosError | boolean>>
    forgotPassword: (signUpData: Record<string, never>) => Promise<boolean | AxiosError>
    resetPassword: (signUpData: Record<string, never>) => Promise<boolean | AxiosError>
    signOut: () => Promise<boolean | AxiosError>
    setUser: (user: Record<string, never> | null | false, authenticated?: boolean) => void
    checkAuthentication: () => Promise<boolean | AxiosError>
}

const SanctumContext = React.createContext<Partial<ContextProps>>({})

export default SanctumContext
