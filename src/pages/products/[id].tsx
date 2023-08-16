"use client"
import Loading from "@/components/loading";
import {useUserContext} from "@/hooks/userContext";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'

export default function Page() {
    const { user } = useUserContext();
    console.log(user)
    const getProduct = async (id: number) => {
        const res = await fetch("http://127.0.0.1:4000/product/" + id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user?.authToken
              },
        })

        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return await res.json()
    }
    const router = useRouter()
    const [product, setProduct] = useState({name:"", id:0, stock:0, um:""})
    useEffect(() => {
        if (router.query.id != undefined) {
            if (product.id == 0){
                getProduct(parseInt(router.query.id.toString())).then((data) => {
                    setProduct(data)
                })
            }
        }
    }, [product, router.query.id])

    if (product.id == 0) {
        return <Loading></Loading>
    }

    return <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
        <div className="flex space-x-4">
            <img alt="" src="https://source.unsplash.com/100x100/?portrait" className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
            <div className="flex flex-col space-y-1">
                <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">Leroy Jenkins</a>
                <span className="text-xs dark:text-gray-400">4 hours ago</span>
            </div>
        </div>
        <div>
            <img src="https://source.unsplash.com/random/100x100/?5" alt="" className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500" />
            <h2 className="mb-1 text-xl font-semibold">{product.name}</h2>
            <table>
                <thead className="caption-left text-left">
                    <tr>
                        <th>ID</th><td>{product.id}</td>
                    </tr>
                    <tr><th>Name</th><td>{product.name}</td></tr>
                    <tr><th>Stock</th><td>{product.stock}</td></tr>
                    <tr><th>UM</th><td>{product.um}</td></tr>
                    <tr><th>CreatedAt</th></tr>
                    <tr><th>DeletedAt</th></tr>

                </thead>
            </table>
        </div>
    </div>
}