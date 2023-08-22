"use client"
import Loading from "@/components/loading";
import Pagination from "@/components/pagination";
import {useUserContext} from "@/hooks/userContext";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'

export default function Page() {
    const { user } = useUserContext();
    console.log(user)

    const addProductOnOrder = async (id: number, productId: number, quantity: number) => {
        const res = await fetch("http://127.0.0.1:4000/order/" + id + "/product", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user?.authToken
              },
            method:"POST",
            body: JSON.stringify({
                "productId":productId,
                "quantity":1,
                "info":""
              })
        })

        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return await res.json()
    }
    const getOrder = async (id: number) => {
        const res = await fetch("http://127.0.0.1:4000/order/" + id, {
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
    const [order, setOrder] = useState({info:"", id:0, status:""})
    const [page, setPage] = useState(1)
    const [products, setProducts] =useState( {items:[],meta:{totalItems:0,itemsPerPage:0,  currentPage:1},})
    const getProducts = async () => {
        const res = await fetch(`http://127.0.0.1:4000/product?page=${page}&limit=${5}`, {
            
        })
        return await res.json()
    }

    useEffect(() => {
        if (router.query.id != undefined) {
            if (order.id == 0){
                getOrder(parseInt(router.query.id.toString())).then((data) => {
                    setOrder(data)
                })
            }
            getProducts().then((data) => {setProducts(data)})
        }
    }, [order, router.query.id, page])

    if (order.id == 0) {
        return <Loading></Loading>
    }

    return <div className="grid grid-cols-2 gap-4"> 
    <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
        <div>
            <h2 className="mb-1 text-xl font-semibold">{order.id}</h2>
            <table>
                <thead className="caption-left text-left">
                    <tr>
                        <th>ID</th><td>{order.id}</td>
                    </tr>
                    <tr><th>Name</th><td>{order.info}</td></tr>
                    <tr><th>Stock</th><td>{order.status}</td></tr>
                </thead>
            </table>
        </div>
    </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                <th scope="col" className="px-6 py-3">ADD</th>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">UM</th>
                    <th scope="col" className="px-6 py-3">Stock</th>
                    <th scope="col" className="px-6 py-3">CreatedAt</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.items.map((elem: any) => {
                        return <tr key={elem.id} className="bg-white border-b">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "><button 
                            onClick={() =>{
                                addProductOnOrder(order.id, elem.id, 1)
                            }}>+</button></td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.id}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.name}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.um}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.stock}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.createdAt}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        <Pagination
            totalItems={products.meta.totalItems}
            currentPage={products.meta.currentPage}
            itemsPerPage={products.meta.itemsPerPage}
            renderPageLink={(page, limit) => `products?page=${page}&limit=${limit}`}
            setPage={(e) => {
                console.log(e.currentTarget.innerHTML)
                console.log(products.meta.currentPage)
                 setPage(e.currentTarget.innerHTML) } } isButton={true}/>
    </div>
}