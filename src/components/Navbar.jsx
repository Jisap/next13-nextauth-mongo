"use client"

import Link from "next/link";
//import { getServerSession } from "next-auth";
import { useSession } from 'next-auth/react';


function Navbar() {

    //const session = await getServerSession();
    const { data: session, status } = useSession();

    return (
        <nav className="bg-zinc-900 p-4">
            <div className="container mx-auto flex justify-between">
                <Link href="/">
                    <h1 className="font-bold text-xl text-white">NextAuth</h1>
                </Link>

                <ul className="flex gap-x-2">
                    {session ? (
                        <>
                            <li className="px-3 py-1">
                                <Link
                                    className="text-white"  
                                    href="/dashboard/profile">Perfil</Link>
                            </li>
                            <li className="px-3 py-1">
                                <Link
                                    className="text-white"
                                    href="/api/auth/signout">Signout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="px-3 py-1">
                                <Link
                                    className="text-white" 
                                    href="/about">About</Link>
                            </li>
                            <li className="bg-indigo-500 px-3 py-1">
                                <Link
                                    className="text-white"  
                                    href="/login">Login</Link>
                            </li>
                            <li className="bg-indigo-700 px-3 py-1">
                                <Link
                                    className="text-white"  
                                    href="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;