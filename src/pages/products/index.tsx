import Loading from '@/components/loading'
import Pagination from '@/components/pagination'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function Products() {
    const getProducts = async (page:number, limit:number) => {
        const res = await fetch(`http://127.0.0.1:4000/product?page=${page}&limit=${limit}`, {
            next: {
                revalidate: 2
            },
        })
        return await res.json()
    }
    const searchParams = useSearchParams()
    const limit = parseInt(searchParams.get("limit") ?? "2") 
    const [data, setData] = useState({items:[],meta:{totalItems:0,itemsPerPage:0,  currentPage:1},})
    var page = parseInt(searchParams.get("page") ?? "1")
    
    useEffect(() =>{
        getProducts(page, limit).then((dt) => {
            setData(dt)
        })
    },[page])

    if (data.items.length == 0) {
        return <Loading></Loading>
    }

    return <>
    <div className="relative w-full overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">UM</th>
                    <th scope="col" className="px-6 py-3">Stock</th>
                    <th scope="col" className="px-6 py-3">CreatedAt</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.items.map((elem: any) => {
                        return <tr key={elem.id} className="bg-white border-b">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "><Link href={"/products/" + elem.id}> {elem.id}</Link></td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.name}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.um}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.stock}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.createdAt}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
    <Pagination
     totalItems={data.meta.totalItems}
     currentPage={data.meta.currentPage}
     itemsPerPage={data.meta.itemsPerPage}
     renderPageLink={(page, limit) => `products?page=${page}&limit=${limit}`} 
     setPage={()=>{}}/>
    </>
}

