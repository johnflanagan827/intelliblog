"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Delete() {
    const router = useRouter();
    const { data: session } = useSession();

    const [isPasswordHidden, setPasswordHidden] = useState(true);
    const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    const deleteAccount = async () => {
        if (confirmPassword !== password) {
            toast.error("Passwords must match!");
            return;
        }
        const res = await fetch("/api/deleteaccount", {
            method: "DELETE",
            headers: {
                id: session?.user?.id
            },
        });

        const result = await res.json();
        if (result.status === "200") {
            await signOut();

        } else {
            return toast.error(result.error);
        }
    };

    useEffect(() => {
        if (session === null) {
            router.push("/login");
        }
    }, [session]);

    if (session) {

        return (
            <div className="margin mt-4">
                <div className="mb-12">
                    <h2 className="font-bold mb-4 text-4xl">Delete Account</h2>
                    <p>
                        Deleting your account will result in removing all data on your
                        IntelliBlog account from our services. This action cannot be undone.
                    </p>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative max-w-lg mt-2">
                        <button
                            className="text-gray-400 absolute right-2 inset-y-0 my-auto active:text-gray-600"
                            onClick={() => setPasswordHidden(!isPasswordHidden)}
                        >
                            {isPasswordHidden ? (
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    />
                                </svg>
                            )}
                        </button>
                        <input
                            type={isPasswordHidden ? "password" : "text"}
                            placeholder=""
                            className="border border-gray-300 w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>


                <div>
                    <label className="block mt-8 text-sm font-medium text-gray-900">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative max-w-lg mt-2">
                        <button
                            className="text-gray-400 absolute right-2 inset-y-0 my-auto active:text-gray-600"
                            onClick={() => setConfirmPasswordHidden(!isConfirmPasswordHidden)}
                        >
                            {isConfirmPasswordHidden ? (
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    />
                                </svg>
                            )}
                        </button>
                        <input
                            type={isConfirmPasswordHidden ? "password" : "text"}
                            placeholder=""
                            className="border border-gray-300 w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <label className={`${!confirmPassword || password === confirmPassword ? "hidden" : "block"} mt-2`}>
                        <p className="font-medium text-sm text-red-500">Confirm password must match password</p>
                    </label>
                    </div>
                <button onClick={() => deleteAccount()} className="mt-8 px-4 py-2 text-white bg-red-500 rounded-lg duration-150 hover:bg-red-700 active:shadow-lg">
                    Delete my account
                </button>
            </div>
        );
    } else {
        return (
            <></>
        );
    }
}
