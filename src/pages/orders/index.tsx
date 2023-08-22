import Loading from '@/components/loading'
import Pagination from '@/components/pagination'
import { useUserContext } from '@/hooks/userContext'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function Orders() {
    const { user } = useUserContext();
    const getOrders = async (page:number, limit:number) => {
        const res = await fetch(`http://127.0.0.1:4000/order?page=${page}&limit=${limit}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user?.authToken
            },
        })
        return await res.json()
    }
    const searchParams = useSearchParams()
    const limit = parseInt(searchParams.get("limit") ?? "4") 
    const [data, setData] = useState({items:[],meta:{totalItems:0,itemsPerPage:0,  currentPage:1},})
    var page = parseInt(searchParams.get("page") ?? "1")
    
    useEffect(() =>{
        getOrders(page, limit).then((dt) => {
            setData(dt)
        })
    },[page])

    if (data.items.length == 0) {
        return <Loading></Loading>
    }

    return <>
    <div>
    <a className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
       href="/orders/add" >
        Add order
    </a>
    <br></br>
    </div>
    <div className="relative w-full overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Info</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.items.map((elem: any) => {
                        return <tr key={elem.id} className="bg-white border-b">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "><Link href={"/orders/" + elem.id}> {elem.id}</Link></td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.info}</td>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{elem.status}</td>
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
            renderPageLink={(page, limit) => `orders?page=${page}&limit=${limit}`}
            setPage={() => { } } isButton={false}/>
    </>
}

