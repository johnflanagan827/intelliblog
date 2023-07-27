// add a validation for title length - if too long, ask ChatGpt to generate new title that is shorter - max length gonna be 71
// rename UpdateNumPages

"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Browse() {

    const [blogPosts, setBlogPosts] = useState(null);
    const [activeBlogPosts, setActiveBlogPosts] = useState(null);
    const [themes, setThemes] = useState(null);
    const [activeBtn, setActiveBtn] = useState("All");
    const [numPages, setNumPages] = useState(1);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: session } = useSession();
    const router = useRouter();

    const handleGetPosts = async () => {
        const res = await fetch("/api/getallposts", {
            method: "GET",
            headers: {
                id: session.user.id
            },
        });

        const posts = await res.json();

        setBlogPosts(posts);
        setActiveBlogPosts(posts);

        const subjects = new Set();
        posts.forEach(e => {
            subjects.add(e.subject);
        });
        subjects.add("All");
        setThemes(subjects);

        setNumPages(Math.ceil(posts.length / 12));

    };

    useEffect(() => {
        if (session) {
            handleGetPosts();
        } else if (session !== undefined) {
            router.push("/login");
        }
    }, [session]);


    useEffect(() => {
        initializePages();
    }, [numPages]);

    const renderBlogPosts = () => {

        if (blogPosts.length === 0) {
            return (
                <main>
                <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start md:px-8">
                    <div className="bg-slate-100 shadow-2xl p-5 rounded-3xl max-w-lg mx-auto">
                        <div>
                            <h3 className="my-6 text-4xl font-semibold text-center">
                                Welcome {session?.user?.name}!
                            </h3>
                            <p>
                            You haven't created any blog posts yet? No worries! Visit our Media Generation or Prompt Generation pages to generate amazing blog content from videos or prompts.</p>
                        </div>
                        <div className="mt-6">
                            <ul className="divide-y">                       
                            <li className="flex gap-x-4 py-6">
                                <div className="flex-none w-14 h-14 bg-indigo-50 rounded-full text-indigo-600 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold">Media Generation</h4>
                                    <p className="text-gray-600">
                                        Transform videos into captivating blog posts with our Media Generation!
                                    </p>
                                    <Link href="/dashboard/media" className="text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1">
                                        Learn more
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </li>
                            <li className="flex gap-x-4 py-6">
                                <div className="flex-none w-14 h-14 bg-indigo-50 rounded-full text-indigo-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold">Prompt Generation</h4>
                                    <p className="text-gray-600">
                                        Turn Your Prompts into Engaging Blog Posts with our Prompt Generation!
                                    </p>
                                    <Link href="/dashboard/prompt" className="text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1">
                                        Learn more
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </li>        
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            );
        } else {
        return (
            <div>
                <div className="flex gap-4 mt-8 mb-12 overflow-x-scroll no-scrollbar">
                    {[...themes].sort().map((e, key) => {
                        return (
                            <button
                            onClick={() => {
                                setActiveBtn(e);
                                updateNumPages(e);

                            }} key={key} className={`${e == activeBtn ? "bg-gray-200" : "hover:bg-gray-100"} text-gray-800 font-bold py-2 px-4 rounded-lg`}>{e}</button>
                        )
                    })}
                </div>
                <>
                    <div className="hidden md:block">
                        {renderDesktop()}
                    </div>
                    <div className="block md:hidden">
                        {renderMobile()}
                    </div>
                </>
            </div>
        )
    }
}

    const loadingAnimation = () => {
        return (
            <div className="flex justify-center mt-36">
                <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
        )
    }

    const initializePages = () => {
        setCurrentPage(1);

        if (numPages == 1) {
            setPages([]);
        } else if (numPages <= 8) {
            setPages(Array.from({ length: numPages }, (e, i) => i + 1));
        } else {
            setPages([1, 2, 3, 4, 5, 6, "...", numPages]);
        }
    }

    const updateNumPages = (selectedTheme) => {
        const filteredPosts = selectedTheme === "All" ? blogPosts : blogPosts.filter(post => post.subject === selectedTheme);
        setNumPages(Math.ceil(filteredPosts.length / 12));
        setActiveBlogPosts(filteredPosts);
      };


    const updatePages = (page) => {
        setCurrentPage(page);
        
        let newPages = [];

        if (numPages <= 8) {
            newPages = Array.from({ length: numPages }, (e, i) => i + 1);
        } else if (page <= 4) {
            newPages = [1, 2, 3, 4, 5, 6, "...", numPages];
        } else if (numPages - page < 4) {
            newPages = [1, "...", numPages - 6, numPages - 5, numPages - 4, numPages - 3, numPages - 2, numPages - 1, numPages];
        } else {
            newPages = [1, "...", page - 2, page - 1, page, page + 1, "...", numPages];
        }
        setPages(newPages);
    }

    const pagination = () => {
        if (numPages <= 1) return null;
        return (
            <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
                <div className="hidden justify-center md:flex" aria-label="Pagination">
                    <ul className="flex items-center">
                        <li>
                            <button onClick={() => currentPage > 1 ? updatePages(currentPage - 1) : null} className="hover:text-indigo-600 hover:bg-gray-50 px-2 py-2.5 border rounded-tl-lg rounded-bl-lg">
                                <span className="inline-flex flex-row-reverse items-center gap-x-2 mr-2">
                                    Previous
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </button>
                        </li>
                        {
                            pages.map((item, key) => (
                                <li key={key} className="">
                                    {
                                        item == "..." ? (
                                            <span className="px-4 py-3.5 border border-l-0">
                                                {item}
                                            </span>
                                        ) : (

                                            <button onClick={() => updatePages(item)} aria-current={currentPage == item ? "page" : false} className={`px-4 py-3 border border-l-0 duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${currentPage == item ? "bg-indigo-50 text-indigo-600 font-medium" : ""}`}>
                                                {item}
                                            </button>
                                        )
                                    }
                                </li>
                            ))
                        }
                        <li>
                            <button onClick={() => currentPage < numPages ? updatePages(currentPage + 1) : null} className="hover:text-indigo-600 hover:bg-gray-50 px-2 py-3 border border-l-0 rounded-tr-lg rounded-br-lg pl-4">
                                <span className="inline-flex items-center gap-x-2">
                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
                {/* On mobile version */}
                <div className="flex items-center justify-between text-sm text-gray-600 font-medium md:hidden">
                    <button onClick={() => currentPage > 1 ? updatePages(currentPage - 1) : null} className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Previous</button>
                    <div className="font-medium">
                        Page {currentPage} of {numPages}
                    </div>
                    <button onClick={() => currentPage < numPages ? updatePages(currentPage + 1) : null} className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Next</button>
                </div>
            </div>
        )
    }

    const renderMobile = () => {
        return (
            <>
                {activeBlogPosts.slice((currentPage - 1) * 12, currentPage * 12).map((e, key) => {

                    return (
                        <div className="grid grid-cols-6 gap-12" key={key}>
                            {key % 3 == 0 ? (<div className="col-span-6">
                                <Link href={`/dashboard/${e.hash}`}>
                                    <img className="rounded-3xl w-full" alt="blog post image" src={e.image_url} />
                                </Link>
                                <div className="m-1">
                                <p className="my-2 text-blue-600 font-medium">{e.subject}</p>
                                <p className="mb-2 font-bold text-xl">{e.title}</p>
                                <p>{e.content[1].trim().slice(0, 125)}...</p>
                                </div>
                            </div>) : (<> <div className="col-span-4 m-1">
                                <p className="text-blue-600 font-medium">{e.subject}</p>
                                <div className="my-2">
                                    <Link href={`/dashboard/${e.hash}`} className="font-bold text-lg hover:underline">{e.title}</Link>
                                </div>
                                <p>{e.content[1].trim().slice(0, 100)}...</p>
                            </div>

                                <div className="col-span-2 flex justify-center items-center">
                                    <Link href={`/dashboard/${e.hash}`}>
                                        <img className="rounded-3xl" alt="blog post image" src={e.image_url} />
                                    </Link>
                                </div> </>)
                            }
                            <hr className="h-px my-8 bg-gray-400 border-0 col-span-6" />
                        </div>
                    )
                })
                }
            </>
        )
    }

    const renderDesktop = () => {
        return (
            <div className="grid grid-cols-6 gap-12">
                {activeBlogPosts.slice((currentPage - 1) * 12, currentPage * 12).map((e, key) => {
                    currentPage
                    return (
                        <div className="col-span-2 overflow-hidden bg-slate-100 shadow-2xl p-5 rounded-3xl" key={key}>
                            <div className="overflow-hidden rounded-3xl">
                                <Link href={`/dashboard/${e.hash}`}>
                                    <img className="rounded-3xl hover:transform hover:scale-110 ease-in-out duration-500 w-full" alt="blog post image" src={e.image_url} />
                                </Link>
                            </div>
                            <div className="my-1 overflow-hidden">
                                <p className="text-md my-2 text-blue-600 font-medium">{e.subject}</p>
                                <div className="mb-2">
                                    <Link href={`/dashboard/${e.hash}`} className="font-bold xl:text-xl text-lg hover:underline">{e.title}</Link>
                                </div>
                                <p className="text-sm mb-2">{e.content[1].trim().slice(0, 110)}{e.content[1].trim().length > 100 ? "..." : ""}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    if (session) {
        return (
            <div className="margin">
                <h1 className="text-4xl font-bold mt-4">Browse Articles</h1>
                <p className="mb-12 mt-4">Discover a collection of AI-generated articles. Explore diverse topics and perspectives, as your collaboration with AI brings forth an ever-evolving tapestry of creativity. Dive in and unlock a world of personalized insights and fresh ideas.</p>
                {blogPosts ? renderBlogPosts() : loadingAnimation()}
                {pagination()}
            </div>
        );
    } else {
        return (
            <></>
        );
    }

}