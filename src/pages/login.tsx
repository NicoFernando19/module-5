import LoginForm from '@/components/specific/LoginForm';
// import { useEffect } from 'react';

const Login = () => {

    const handleLogin = () => {

    }

    return (
        <LoginForm handleSubmit={handleLogin} />
    )
}

Login.layout = "Auth";

export default Login;