"use client"
import User, { useUserContext } from "@/hooks/userContext";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { Inter } from 'next/font/google'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Login from "./login";

const inter = Inter({ subsets: ['latin'] })
export default function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const router  = useRouter();
    const { user, getUser } = useUserContext();
    const [usr, setUsr] = useState<User|null>(null);
    useEffect(() => {
        if (usr == null){
            console.log(usr)
            let _user = getUser()
            setUsr(_user)
        }
    },[usr, user])
    return (<>
        <Navbar></Navbar>
        <div className='h-full overflow-hidden bg-white pt-16'>
            <Sidebar></Sidebar>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
            <div id="main-content" className="flex flex-col h-full bg-white overflow-y-auto lg:ml-64">
                <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
                    {usr != null ? <div className="pt-6 px-4 text-black">
                        {children}
                    </div> : <Login></Login>}
                </main>
                <Footer></Footer>
            </div>
        </div>
    </>
    )
}