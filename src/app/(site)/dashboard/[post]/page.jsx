"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Post({ params }) {
    const router = useRouter();
    const {data : session} = useSession();
    const [post, setPost] = useState(null);

    const getFormatedDate = (createdAt) => {
        const dateObject = new Date(createdAt);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        return formattedDate;
    }


    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch("/api/getpost", {
                method: "GET",
                headers: {
                "hash": params.post,
                "id": session?.user.id,
                "author": session?.user.name
                },
            });
    
            const post = await res.json();

            if (post.status !== "200") {
                router.push("/" + post.status);
            }

            const formattedPost = {
                title: post.title,
                subject: post.subject,
                content: post.content.slice(1),
                date: getFormatedDate(post.createdAt),
                author: session.user.name,
                image_url: post.image_url,
                status: post.status,
            };

            setPost(formattedPost);
        }
      
        if (session) {
          fetchPost();
        } else if (session === null) {
        router.push("/login");
        }
      }, [params.post, session]);

    

      if (post) {
        return (
                <div className="max-w-7xl p-10 mx-auto font-sans text-gray-800">
                    <div className="grid grid-col-8 w-full">
                        <div className="flex justify-center mt-8">
                            <p className="text-center font-bold text-blue-600 text-xl">{post.subject}</p>
                        </div>
                        <div className="flex justify-center mt-4 mb-6 mx-12 font-serif">
                            <p className="font-black text-5xl text-center max-w-screen-lg">{post.title}</p>
                        </div>
                        <div className="flex justify-center mb-8">
                            <p>Written By {post.author}</p>
                            &nbsp; <p>•</p> &nbsp;
                            <p>{post.date}</p>
                        </div>
                        <p className="italic text-lg mb-8">{post.content[0]}</p>
                        <div className="flex justify-center mb-8" >
                            <img src={post.image_url} />
                        </div>
                    </div>
                    {post.content.slice(1).map((e, key) => {
                        return (
                            <p key={key} className={`${e.length < 150 ? "font-bold text-3xl mb-2": "text-lg mb-12"}`}>{e}</p>
                        )
                    })
                    }
                </div>
        );
      } else {
        return (
            <></>
        );
      }


}
