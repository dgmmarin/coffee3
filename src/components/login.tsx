"use client"
import { FC, useState } from "react";
import User, { useUserContext } from '../hooks/userContext';
import { useRouter } from 'next/router'
interface pageProps { }

const Login: FC<pageProps> = ({ }) => {
    const { login, logout, signup, setRegister } = useUserContext();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstname] = useState("")
    const [lastName, setLastname] = useState("")
    const router = useRouter()
    const handleFormSignin = async (email: string, password: string) => {
        console.log(email, password)
        const res = await fetch(`http://127.0.0.1:4000/auth/login`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ "email": email, "password": password })
        })
        if (!res.ok){
            logout()
            router.push("/login")
            throw new Error("login failed")
        }
        return await res.json()
       
    }
    const handleFormSignup= async (firstName: string, lastName: string, email: string, password: string) => {
        console.log(email, password)
        const res = await fetch(`http://127.0.0.1:4000/auth/login`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ "email": email, "password": password })
        })
        if (!res.ok){
            logout()
            router.push("/login")
            throw new Error("login failed")
        }
        return await res.json()
       
    }
    console.log(signup);
    if (!signup){
    return <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={e => { setEmail(e.currentTarget.value); }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="text-sm">
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={e => { setPassword(e.currentTarget.value); }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <br></br>
                <div>
                    <button
                        onClick={async () => {
                            try {
                                let data = await handleFormSignin(email, password)
                                login({ authToken: data.access_token, email: email } as User)
                                router.push("/")
                            } catch (error) {
                                logout()
                                router.push("/login")
                            }

                        }}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <button onClick={ () => setRegister(true)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    </>
    }else{
        return <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create a new account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                        First Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="first_name"
                            name="first_name"
                            type="first_name"
                            autoComplete="first_name"
                            required
                            value={firstName}
                            onChange={e => { setFirstname(e.currentTarget.value); }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                        Last Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="last_name"
                            name="last_name"
                            type="last_name"
                            autoComplete="last_name"
                            required
                            value={lastName}
                            onChange={e => { setLastname(e.currentTarget.value); }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={e => { setEmail(e.currentTarget.value); }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={e => { setPassword(e.currentTarget.value); }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <br></br>
                <div>
                    <button
                        onClick={async () => {
                            try {
                                let data = await handleFormSignup(firstName, lastName, email, password)
                                login({ authToken: data.access_token, email: email } as User)
                                router.push("/")
                            } catch (error) {
                                logout()
                                router.push("/login")
                            }

                        }}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign up
                    </button>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <button onClick={ () => setRegister(false)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    </>
    }
}

export default Login