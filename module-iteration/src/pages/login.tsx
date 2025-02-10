import LoginForm from '@/components/specific/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { login } from '@/services/Auth';
import { Login as LoginType } from '@/types';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Login = () => {
    const [form, setForm] = useState<LoginType>({
        email: '',
        password: ''
    })
    const { setAuth } = useAuth()
    const router = useRouter()

    const handleLogin = async () => {
        const { access_token, refresh_token } = await login(form.email, form.password);
        if(access_token) {
            setCookie('accessToken', access_token, { maxAge: 60 * 60 * 24 })
            setCookie('refreshToken', refresh_token, { maxAge: 60 * 60 * 24 })
            setAuth()
            router.push('/')
        }
    }

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevObj) => {
            return {
                ...prevObj,
                [name]: value
            }
        })
    }

    return (
        <LoginForm handleSubmit={handleLogin} handleForm={handleForm} form={form} />
    )
}

Login.layout = "Auth";

export default Login;