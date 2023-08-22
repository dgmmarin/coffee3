import { useUserContext } from "@/hooks/userContext";
import { FC, useState } from "react";
interface pageProps { }

const addProduct: FC<pageProps> = ({ }) => {

    const { user } = useUserContext();
    const [name, setName] = useState("")
    const [um, setUm] = useState("")
    const [stock, setStock] = useState(0)

    const handlePostProduct = async (name: string, stock: number, um: string) => {
        const res = await fetch(`http://127.0.0.1:4000/product`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + user?.authToken
            },
            method: 'POST',
            body: JSON.stringify({
                "name":name,
                "um":um,
                "stock":stock
              })
        })
        if (!res.ok){
            throw new Error("login failed")
        }else {
            setName("")
            setUm("")
            setStock(0)
        }
        return await res.json()
       
    }
    
return <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Add a new product
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Product name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="name"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={e => { setName(e.currentTarget.value); }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            UM
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="um"
                            name="um"
                            type="um"
                            autoComplete="um"
                            required
                            value={um}
                            onChange={e => { setUm(e.currentTarget.value); }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                            Stock
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="stock"
                            name="stock"
                            type="stock"
                            autoComplete="stock"
                            required
                            value={stock}
                            onChange={e => { setStock(Number(e.currentTarget.value)); }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <br></br>
                <div>
                    <button
                        onClick={()=>handlePostProduct(name, stock, um)}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add product
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default addProduct