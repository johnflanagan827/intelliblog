"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const AvatarMenu = () => {
    const { data: session } = useSession();
    const [state, setState] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const profileRef = useRef();

    const navigation = [
        { title: "Dashboard", path: "/dashboard/browse" },
        { title: "Settings", path: "/settings/profile" },
    ];

    useEffect(() => {
        const fetchImage = async () => {
            const res = await fetch("/api/getuserimage", {
                method: "GET",
                headers: {
                    id: session?.user.id,
                },
            });
            if (res.ok) {
                const result = await res.json();
                setImageUrl(result.image_url);
            } else {
                setImageUrl("https://i.stack.imgur.com/34AD2.jpg");
            }
        };
        if (session) {
            fetchImage();
        }
    }, [session]);

    return (
        <div className="relative border-t md:border-none">
            <div className="">
                <button
                    ref={profileRef}
                    className="hidden w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 md:focus:ring-2 md:block"
                    onClick={() => setState(!state)}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            className="w-full h-full rounded-full"
                            alt="user avatar"
                        />
                    ) : null}
                </button>
            </div>
            <ul
                className={`bg-white top-14 right-0 mt-6 space-y-6 md:absolute md:border md:rounded-md md:w-52 md:shadow-md md:space-y-0 md:mt-0 ${state ? "" : "md:hidden"
                    }`}
            >
                {navigation.map((item, idx) => (
                    <li key={idx}>
                        <a
                            className="block text-gray-600 hover:text-gray-900 md:hover:bg-gray-50 md:p-3"
                            href={item.path}
                        >
                            {item.title}
                        </a>
                    </li>
                ))}
                <button
                    onClick={() => signOut()}
                    className="block w-full text-justify text-gray-600 hover:text-gray-900 border-t py-3 md:hover:bg-gray-50 md:p-3"
                >
                    Logout
                </button>
            </ul>
        </div>
    );
};

export default function NavBar({ submenuNav }) {
    const [state, setState] = useState(false);
    const [search, setSearch] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const navigation = [
        { title: "About", path: "/about" },
        { title: "Contact", path: "/contact" },
        { title: "Privacy Policy", path: "/privacy" },
    ];

    return (
        <header className="text-base md:text-sm">
            <div
                className={`items-center gap-x-14 px-4 max-w-screen-1.5xl mx-auto md:flex md:px-8 md:static ${state ? "h-full fixed inset-x-0 z-10 bg-white" : ""
                    }`}
            >
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link className="flex items-center" href="/dashboard/browse">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-aperture"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#000000"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M3.6 15h10.55" />
                            <path d="M6.551 4.938l3.26 10.034" />
                            <path d="M17.032 4.636l-8.535 6.201" />
                            <path d="M20.559 14.51l-8.535 -6.201" />
                            <path d="M12.257 20.916l3.261 -10.034" />
                        </svg>
                        <p className="text-xl font-medium">IntelliBlog</p>
                    </Link>

                    <div className="md:hidden mt-4 mx-8">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                            className="flex-1 items-center justify-start pb-4 md:flex md:pb-0"
                        >
                            <div className="flex items-center gap-1 px-2 border rounded-lg focus-within:ring-1 focus-within:ring-blue-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={search}
                                    maxLength={512}
                                    className="w-full px-2 py-2 text-gray-500 bg-transparent rounded-md border-none focus:ring-0"
                                    onChange={(e) => {
                                        router.push(`/dashboard/search?q=${e.target.value}`);
                                        setSearch(e.target.value);
                                    }}
                                />
                            </div>
                        </form>
                    </div>

                    <div className="md:hidden">
                        <button
                            className="text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {state ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div
                    className={`nav-menu flex-1 pb-28 overflow-y-auto max-h-screen md:block md:overflow-visible md:pb-0 md:mt-0 ${state ? "" : "hidden"
                        }`}
                >
                    <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                            className="flex-1 items-center justify-start pb-4 md:flex md:pb-0 hidden md:block"
                        >
                            <div className="flex items-center gap-1 px-2 border rounded-lg focus-within:ring-1 focus-within:ring-blue-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    value={search}
                                    placeholder="Search"
                                    maxLength={512}
                                    className="w-full px-2 py-2 text-gray-500 bg-transparent rounded-md border-none focus:ring-0"
                                    onChange={(e) => {
                                        router.push(`/dashboard/search?q=${e.target.value}`);
                                        setSearch(e.target.value);
                                    }}
                                />
                            </div>
                        </form>
                        {navigation.map((item, idx) => {
                            return (
                                <li key={idx}>
                                    <Link
                                        href={item.path}
                                        className="block text-gray-700 hover:text-gray-900"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                        <AvatarMenu />
                    </ul>
                </div>
            </div>
            <nav className="border-b">
                <ul className="flex items-center gap-x-3 max-w-screen-1.5xl mx-auto px-4 overflow-x-auto md:px-8">
                    {submenuNav.map((item, idx) => {
                        return (
                            <li
                                key={idx}
                                className={`py-1 ${pathname == item.path ? "border-b-2 border-indigo-600" : ""
                                    }`}
                            >
                                <Link
                                    href={item.path}
                                    className="block py-2 px-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 duration-150 text-lg"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}
