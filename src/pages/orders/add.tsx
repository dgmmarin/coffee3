import { useUserContext } from "@/hooks/userContext";
import { FC, useState } from "react";
interface pageProps { }

const addOrder: FC<pageProps> = ({ }) => {
    const { login, logout, signup, setRegister } = useUserContext();
    const [info, setInfo] = useState("")
    const [status, setStatus] = useState("")
return <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Add a new order
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                    <label htmlFor="info" className="block text-sm font-medium leading-6 text-gray-900">
                        Order info
                    </label>
                    <div className="mt-2">
                        <input
                            id="info"
                            name="info"
                            type="info"
                            autoComplete="info"
                            required
                            value={info}
                            onChange={e => { setInfo(e.currentTarget.value); }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                            Status
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="status"
                            name="status"
                            type="status"
                            autoComplete="status"
                            required
                            value={status}
                            onChange={e => { setStatus(e.currentTarget.value); }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <br></br>
                <div>
                    <button
                        /* onClick={async () => {
                            try {
                                let data = await handleFormSignin(email, password)
                                login({ authToken: data.access_token, email: email } as User)
                                router.push("/")
                            } catch (error) {
                                logout()
                                router.push("/login")
                            }

                        }} */
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add order
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default addOrder