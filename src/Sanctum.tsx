import * as React from 'react'
import axios, {AxiosError} from 'axios'
import SanctumContext from './SanctumContext'

axios.defaults.withCredentials = true

const token = localStorage.getItem('access_token')

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

interface Props {
    config: {
        apiUrl: string
        csrfCookieRoute: string
        signInRoute: string
        signUpRoute: string
        signOutRoute: string
        forgotPasswordRoute: string
        resetPasswordRoute: string
        userObjectRoute: string
    };
    checkOnInit?: boolean
}

interface State {
    user: null | Record<string, never> | false
    authenticated: null | boolean
}

class Sanctum extends React.Component<Props, State> {
    static defaultProps = {
        checkOnInit: true
    }

    constructor(props: Props) {
        super(props)

        this.state = {
            user: null,
            authenticated: null
        }

        this.getCSRF = this.getCSRF.bind(this)
        this.handleError = this.handleError.bind(this)
        this.getUserData = this.getUserData.bind(this)
        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)
        this.signOut = this.signOut.bind(this)
        this.forgotPassword = this.forgotPassword.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
        this.setUser = this.setUser.bind(this)
        this.checkAuthentication = this.checkAuthentication.bind(this)
    }

    /**
     * Error handler
     * @param error
     */
    handleError(error: AxiosError): boolean | AxiosError {
        if (error.response && error.response.status === 401) {
            this.setState({user: false, authenticated: false})
            return false
        } else {
            throw error
        }
    }

    /**
     *  Get CSRF cookie function
     */
    async getCSRF(): Promise<boolean | AxiosError> {
        const {apiUrl, csrfCookieRoute} = this.props.config

        return await axios
            .get(`${apiUrl}/${csrfCookieRoute}`)
            .then(() => {
                return true
            })
            .catch((error: AxiosError) => {
                return this.handleError(error)
            })
    }

    /**
     *  Get user data function
     */
    async getUserData(): Promise<Record<string, never> | AxiosError | boolean> {
        const {apiUrl, userObjectRoute} = this.props.config
        const token = localStorage.getItem('access_token')

        return await axios
            .get(`${apiUrl}/${userObjectRoute}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(({data}) => {
                this.setState({user: data, authenticated: true})
                return data
            })
            .catch((error) => {
                return this.handleError(error)
            })
    }

    /**
     * Check authentication
     */
    async checkAuthentication(): Promise<boolean | AxiosError> {
        const {apiUrl, userObjectRoute} = this.props.config

        return await axios
            .get(`${apiUrl}/${userObjectRoute}`)
            .then(({data}) => {
                this.setState({user: data, authenticated: true})
                return true
            })
            .catch((error: AxiosError) => {
                return this.handleError(error)
            })
    }

    /**
     * Sign in function
     * @param signInData
     */
    async signIn(signInData: Record<string, never>): Promise<() =>
        Promise<Record<string, never> | AxiosError | boolean>> {
        const {apiUrl, signInRoute} = this.props.config
        await this.getCSRF

        axios
            .post(`${apiUrl}/${signInRoute}`, signInData)
            .then(({data}) => localStorage.setItem('access_token', data))
            .catch((error) => {
                return this.handleError(error)
            })

        return this.getUserData
    }

    /**
     * Sign up function
     * @param signUpData
     */
    async signUp(signUpData: Record<string, never>): Promise<() =>
        Promise<Record<string, never> | AxiosError | boolean>> {
        const {apiUrl, signUpRoute} = this.props.config
        await this.getCSRF

        axios
            .post(`${apiUrl}/${signUpRoute}`, signUpData)
            .then(({data}) => localStorage.setItem('access_token', data))
            .catch((error) => {
                return this.handleError(error)
            })

        return this.getUserData
    }

    /**
     * Forgot password function
     * @param forgotPasswordData
     */
    async forgotPassword(forgotPasswordData: Record<string, never>): Promise<boolean | AxiosError> {
        const {apiUrl, forgotPasswordRoute} = this.props.config

        return axios
            .post(`${apiUrl}/${forgotPasswordRoute}`, forgotPasswordData)
            .then(() => {
                return true
            })
            .catch((error) => {
                return this.handleError(error)
            })
    }

    /**
     * Reset password function
     * @param resetPasswordData
     */
    async resetPassword(resetPasswordData: Record<string, never>): Promise<boolean | AxiosError> {
        const {apiUrl, resetPasswordRoute} = this.props.config

        return axios
            .post(`${apiUrl}/${resetPasswordRoute}`, resetPasswordData)
            .then(() => {
                return true
            })
            .catch((error) => {
                return this.handleError(error)
            })
    }

    /**
     * Sign out function
     */
    async signOut(): Promise<boolean | AxiosError> {
        const {apiUrl, signOutRoute} = this.props.config

        return axios
            .post(`${apiUrl}/${signOutRoute}`)
            .then(() => {
                this.setState({user: false, authenticated: false})
                return true
            })
            .catch((error) => {
                return this.handleError(error)
            })
    }

    /**
     * Set user to state
     * @param user
     * @param authenticated
     */
    setUser(user: Record<string, never> | false | null, authenticated = true) {
        this.setState({user, authenticated})
    }

    componentDidMount(): void {
        if (this.props.checkOnInit) {
            this.checkAuthentication()
        }
    }

    render(): JSX.Element {
        return <SanctumContext.Provider
            value={{
                user: this.state.user,
                authenticated: this.state.authenticated,
                signIn: this.signIn,
                signUp: this.signUp,
                signOut: this.signOut,
                forgotPassword: this.forgotPassword,
                resetPassword: this.resetPassword,
                setUser: this.setUser,
                checkAuthentication: this.checkAuthentication
            }}>
            {this.props.children || null}
        </SanctumContext.Provider>
    }
}

export default Sanctum
