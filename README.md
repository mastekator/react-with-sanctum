# React-with-sanctum - your React authentication for laravel-sanctum

[![npm version](https://badge.fury.io/js/react-with-sanctum.svg)](https://www.npmjs.com/package/react-with-sanctum)

React-with-sanctum provides an `Sanctum` component and `SanctumContext` context for Laravel-sanctum. Making it easy to use Laravel-Sanctum authentication in your React application.

## Installation

```
npm i react-with-sanctum
```

## Usage
Configure sanctum and wrap your application with it in `app.tsx`
```tsx
// app.tsx

// import Sanctum component
import {Sanctum} from "react-with-sanctum";

// config example
const sanctumConfig = {
    apiUrl: 'http://localhost:8888/',
    csrfCookieRoute: 'sanctum/csrf-cookie',
    signInRoute: 'login',
    signUpRoute: 'register',
    signOutRoute: 'logout',
    forgotPasswordRoute: 'forgot',
    resetPasswordRoute: 'reset',
    userObjectRoute: 'user'
}

// set config to Sanctum component
const application =
    <Sanctum config={sanctumConfig}>
        /* Your application */
    </Sanctum>
```
Next use context for get access to authentication data and methods

```tsx
// Login.tsx

// Login example
import React, {useContext,useState} from 'react'
import {SanctumContext} from 'react-with-sanctum'

const Login: React.FC = (props) => {
    const {signIn} = useContext(SanctumContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signInHandler = () => {
        signIn({email, password})
            .then(() => console.log('sign in success'))
            .catch((error) => console.log('error', error))
    }

    return <div>
        <input 
            type="text"
            name="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
        />
        <input 
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => signInHandler()}>Sign in</button>
    </div>
}

export default Login
```

## Examples
Full code of example you can see in `examples` directory

## License
React-with-sanctum is open source software released under the MIT license. See [LICENSE](LICENSE) for more information.
