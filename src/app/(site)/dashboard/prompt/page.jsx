"use client"

import Search from "../../../components/Search";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Edit() {
    const [message, setMessage] = useState("");
    const [context, setContext] = useState("");
    const [tone, setTone] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { data: session } = useSession();

    const handleSubmit = async () => {
        if (message.length < 40) {
            toast.error("Input length too short")
            return;
        }
        setLoading(true);

        const res = await fetch("/api/createblog-prompt", {
            method: "PUT",
            body: JSON.stringify({
                    message: message,
                    context: context,
                    tone: tone,
                    id: session.user.id
                })
        });

        const result = await res.json();
        if (result.status === "204") {
            toast.success("Success!");
        } else {
            toast.error(result.error);
        }

        setLoading(false);

    };

    const handleToneChange = (item) => {
        setTone(item);
    }

    useEffect(() => {
            if (message.length !== 0 && message.length < 40) {
                setErrorMsg("⚠️ Short input. Try to provide more details for better copy results.")
            } else {
                setErrorMsg("")
            }
        }, [message]);

        useEffect(() => {
            if (session === null) {
                router.push("/login");
            }
        }, [session]);
    

        const loadingAnimation = () => {
            return (
                <div className="mt-24 text-center">
                    <div className="flex justify-center m-4">
                        <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    <p className="font-bold text-3xl mb-1">Generating Blog Post...</p>
                    <p className="text-sm mb-16">This may take a few seconds, please don't close the page.</p>
                </div>
            )
        }
    
    const form = () => {
        return (
        <div>
            <div className="mb-10">
                <label htmlFor="context" className="ml-2 flex gap-2 block mb-2 text-sm font-medium text-gray-900">What are you looking to create? <span className="block mb-2 text-sm font-medium text-gray-400">Optional</span></label>
                <input onChange={(e) => setContext(e.target.value)} placeholder="e.g. How to use AI for your business" maxLength={256} type="text" id="context" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>               
            <div className="mb-4">        
                <label htmlFor="message" className="ml-2 block mb-1 text-sm font-medium text-gray-900">Your message <span className="text-red-500">*</span></label>
                <textarea onChange={(e) => setMessage(e.target.value)} id="message" rows="12" maxLength={1000} placeholder={`[product details]\n[fun facts]\n[any instructions]`} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div className="flex justify-between mb-6 mx-2">
                <p className="block text-sm font-medium text-red-500">{errorMsg}</p>
                <p className={`${message.length >= 40 ? "text-green-500" : ""} ${message.length === 0 ? "text-gray-900" : ""} ${message.length !== 0 & message.length < 40 ? "text-red-500" : ""} block text-sm font-medium`}>{message.length}/1000</p>
            </div>

            <p className="ml-2 mb-2 block text-sm font-medium text-gray-900">Choose a tone <span className="mx-2 text-sm font-medium text-gray-400">Enter a custom tone or chose a preset tone</span> </p>
            <Search onInputChange={handleToneChange}></Search>
            <div className="flex justify-center mt-3 -mb-8">
            <button onClick={() => handleSubmit()} className=" my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Submit</button>
            </div>
        </div>
        )
    }

    if (session) {
    return (
        <div className="margin">
            <h1 className="text-4xl font-bold mt-4 mb-4">Prompt-Based Generation</h1>
            <p className="mb-10">Create captivating AI-powered blog posts effortlessly with our prompt-based generation section. Simply provide your desired topic, a message, and choose a tone. Our advanced AI algorithms process the prompts, extract valuable insights, and craft compelling blog posts!</p>
            {loading ? loadingAnimation() : form()}

        </div>
    );
    } else {
        return null;
    }
}