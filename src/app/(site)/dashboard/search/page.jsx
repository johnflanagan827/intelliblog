"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import noResults from "../../../public/images/no-results.png"
import Link from "next/link";

export default function Search() {
    const [blogPosts, setBlogPosts] = useState(null);
    const [activeBlogPosts, setActiveBlogPosts] = useState(null);
    const searchParams = useSearchParams();
    const search = searchParams.get("q");
    const [numPages, setNumPages] = useState(1);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: session } = useSession();

    const handleGetPosts = async () => {
        const res = await fetch("/api/getallposts", {
            method: "GET",
            headers: {
                id: session.user.id,
            },
        });

        const posts = await res.json();
        setBlogPosts(posts);
        setActiveBlogPosts(posts);
        setNumPages(Math.ceil(posts.length / 12));
    };

    useEffect(() => {
        if (session) {
            handleGetPosts();
        }
    }, [session]);

    useEffect(() => {
        if (blogPosts) {
            let filteredPosts = [];
            blogPosts.forEach((e) => {
                if (
                    e.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    e.subject.toLowerCase().indexOf(search.toLowerCase()) !== -1
                ) {
                    filteredPosts.push(e);
                } else if (
                    e.content.some(
                        (e) => e.toLowerCase().indexOf(search.toLowerCase()) !== -1
                    )
                ) {
                    filteredPosts.push(e);
                }
            });
            setNumPages(Math.ceil(filteredPosts.length / 12));
            setActiveBlogPosts(filteredPosts);
        }
    }, [search]);

    useEffect(() => {
        initializePages();
    }, [numPages]);

    const initializePages = () => {
        setCurrentPage(1);

        if (numPages <= 1) {
            setPages([]);
        } else if (numPages <= 8) {
            setPages(Array.from({ length: numPages }, (e, i) => i + 1));
        } else {
            setPages([1, 2, 3, 4, 5, 6, "...", numPages]);
        }
    };

    const updatePages = (page) => {
        setCurrentPage(page);

        let newPages = [];

        if (numPages <= 8) {
            newPages = Array.from({ length: numPages }, (e, i) => i + 1);
        } else if (page <= 4) {
            newPages = [1, 2, 3, 4, 5, 6, "...", numPages];
        } else if (numPages - page < 4) {
            newPages = [
                1,
                "...",
                numPages - 6,
                numPages - 5,
                numPages - 4,
                numPages - 3,
                numPages - 2,
                numPages - 1,
                numPages,
            ];
        } else {
            newPages = [
                1,
                "...",
                page - 2,
                page - 1,
                page,
                page + 1,
                "...",
                numPages,
            ];
        }
        setPages(newPages);
    };

    const pagination = () => {
        if (numPages <= 1) {
            return <></>;
        } else {
            return (
                <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
                    <div
                        className="hidden justify-center md:flex"
                        aria-label="Pagination"
                    >
                        <ul className="flex items-center">
                            <li>
                                <button
                                    onClick={() =>
                                        currentPage > 1 ? updatePages(currentPage - 1) : null
                                    }
                                    className="hover:text-indigo-600 hover:bg-gray-50 px-2 py-2.5 border rounded-tl-lg rounded-bl-lg"
                                >
                                    <span className="inline-flex flex-row-reverse items-center gap-x-2 mr-2">
                                        Previous
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </li>
                            {pages.map((item, key) => (
                                <li key={key} className="">
                                    {item == "..." ? (
                                        <span className="px-4 py-3.5 border border-l-0">
                                            {item}
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => updatePages(item)}
                                            aria-current={currentPage == item ? "page" : false}
                                            className={`px-4 py-3 border border-l-0 duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${currentPage == item
                                                    ? "bg-indigo-50 text-indigo-600 font-medium"
                                                    : ""
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    )}
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() =>
                                        currentPage < numPages ? updatePages(currentPage + 1) : null
                                    }
                                    className="hover:text-indigo-600 hover:bg-gray-50 px-2 py-3 border border-l-0 rounded-tr-lg rounded-br-lg pl-4"
                                >
                                    <span className="inline-flex items-center gap-x-2">
                                        Next
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 font-medium md:hidden">
                        <button
                            onClick={() =>
                                currentPage > 1 ? updatePages(currentPage - 1) : null
                            }
                            className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <div className="font-medium">
                            Page {currentPage} of {numPages}
                        </div>
                        <button
                            onClick={() =>
                                currentPage < numPages ? updatePages(currentPage + 1) : null
                            }
                            className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            );
        }
    };

    const renderBlogPosts = () => {
        return (
            <div className="mt-8 mb-12">
                {activeBlogPosts.length !== 0 ? (
                    <>
                        <div className="hidden md:block">{renderDesktop()}</div>
                        <div className="block md:hidden">{renderMobile()}</div>
                    </>
                ) : (
                    <div className="w-full flex flex-col items-center">
                        <div className="self-center w-72">
                            <Image
                                src={noResults}
                                alt="Not found"
                            />
                        </div>
                        <p className="text-center font-semibold text-xl">
                            Sorry! No Results found :&#40;
                        </p>
                        <p className="text-center">
                            Sorry, no blog posts were found. Please try a different criteria.
                        </p>
                    </div>
                )}
            </div>
        );
    };

    const loadingAnimation = () => {
        return (
            <div className="flex justify-center mt-36">
                <svg
                    aria-hidden="true"
                    className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
            </div>
        );
    };

    const renderMobile = () => {
        return (
            <>
                {activeBlogPosts
                    .slice((currentPage - 1) * 12, currentPage * 12)
                    .map((e, key) => {
                        return (
                            <div className="grid grid-cols-6 gap-12" key={key}>
                                {key % 3 == 0 ? (
                                    <div className="col-span-6">
                                        <img className="rounded-3xl w-full" alt="blog post image" src={e.image_url} />
                                        <p className="mt-2">{e.subject}</p>
                                        <p className="font-bold text-xl">{e.title}</p>
                                        <p>{e.content[1].trim().slice(0, 125)}...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="col-span-4">
                                            <p>{e.subject}</p>
                                            <p className="font-bold text-lg">{e.title}</p>
                                            <p>{e.content[1].trim().slice(0, 100)}...</p>
                                        </div>
                                        <div className="col-span-2 flex justify-center items-center">
                                            <img className="rounded-3xl" alt="blog post image" src={e.image_url} />
                                        </div>
                                    </>
                                )}
                                <hr className="h-px my-8 bg-gray-400 border-0 col-span-6" />
                            </div>
                        );
                    })}
            </>
        );
    };

    const renderDesktop = () => {
        return (
            <div className="grid grid-cols-6 gap-12">
                {activeBlogPosts
                    .slice((currentPage - 1) * 12, currentPage * 12)
                    .map((e, key) => {
                        return (
                            <div className="col-span-2 overflow-hidden" key={key}>
                                <div className="overflow-hidden rounded-3xl">
                                    <Link href={`/ui/${e.hash}`}>
                                        <img
                                            className="rounded-3xl hover:transform hover:scale-110 ease-in-out duration-500 w-full"
                                            src={e.image_url}
                                        />
                                    </Link>
                                </div>
                                <div className="m-1">
                                    <p>{e.subject}</p>
                                    <div className="h-20 overflow-hidden mb-4">
                                        <Link
                                            href={`/ui/${e.hash}`}
                                            className="font-bold xl:text-xl text-lg mb-2 hover:underline"
                                        >
                                            {e.title}
                                        </Link>
                                    </div>
                                    <p className="text-xs mb-2">
                                        {e.content[1].trim().slice(0, 100)}...
                                    </p>
                                </div>
                            </div>
                        );z
                    })}
            </div>
        );
    };

    return (
        <div className="margin">
            <h3 className="text-4xl font-bold mt-4">Search Results:&nbsp; <span className="text-2xl font-normal align-middle">{search}</span></h3>
            {blogPosts ? renderBlogPosts() : loadingAnimation()}
            {pagination()}
        </div>
    );
}
