"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Change() {
    const router = useRouter();
    const { data: session } = useSession();

    const [isPreviousPasswordHidden, setPreviousPasswordHidden] = useState(true);
    const [isNewPasswordHidden, setNewPasswordHidden] = useState(true);
    const [isConfirmNewPasswordHidden, setConfirmNewPasswordHidden] =
        useState(true);
    const [previousPassword, setPreviousPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const updatePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            toast.error("Passwords must match!");
            return;
        } else if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters!");
            return;
        }
        const res = await fetch("/api/updatepassword", {
            method: "PUT",
            body: JSON.stringify({
                id: session?.user?.id,
                previousPassword: previousPassword,
                newPassword: newPassword,
            }),
        });

        const result = await res.json();
        if (result.status === "204") {
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
                    <h2 className="font-bold mb-4 text-4xl">Change Password</h2>
                    <p>
                        Update your password for added security. Confirm changes by entering
                        your current password.
                    </p>
                </div>

                <div>
                    <div>
                        <label className="block mt-8 text-sm font-medium text-gray-900">
                            Previous Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative max-w-lg mt-2">
                            <button
                                className="text-gray-400 absolute right-2 inset-y-0 my-auto active:text-gray-600"
                                onClick={() =>
                                    setPreviousPasswordHidden(!isPreviousPasswordHidden)
                                }
                            >
                                {isPreviousPasswordHidden ? (
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
                                type={isPreviousPasswordHidden ? "password" : "text"}
                                placeholder=""
                                className="border border-gray-300 w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                value={previousPassword}
                                onChange={(e) => setPreviousPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block mt-8 text-sm font-medium text-gray-900">
                        New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative max-w-lg mt-2">
                        <button
                            className="text-gray-400 absolute right-2 inset-y-0 my-auto active:text-gray-600"
                            onClick={() => setNewPasswordHidden(!isNewPasswordHidden)}
                        >
                            {isNewPasswordHidden ? (
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
                            type={isNewPasswordHidden ? "password" : "text"}
                            placeholder=""
                            className="border border-gray-300 w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <label
                        className={`${!newPassword || newPassword.length >= 8 ? "hidden" : "block"
                            } mt-2`}
                    >
                        <p className="font-medium text-sm text-red-500">
                            New password must be at least 8 characters
                        </p>
                    </label>
                </div>

                <div>
                    <label className="block mt-8 text-sm font-medium text-gray-900">
                        Confirm New Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative max-w-lg mt-2">
                        <button
                            className="text-gray-400 absolute right-2 inset-y-0 my-auto active:text-gray-600"
                            onClick={() =>
                                setConfirmNewPasswordHidden(!isConfirmNewPasswordHidden)
                            }
                        >
                            {isConfirmNewPasswordHidden ? (
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
                            type={isConfirmNewPasswordHidden ? "password" : "text"}
                            placeholder=""
                            className="border border-gray-300 w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>
                    <label
                        className={`${!confirmNewPassword || newPassword === confirmNewPassword
                                ? "hidden"
                                : "block"
                            } mt-2`}
                    >
                        <p className="font-medium text-sm text-red-500">
                            Confirm password must match password
                        </p>
                    </label>
                </div>
                <button
                    onClick={() => updatePassword()}
                    className="mt-8 px-4 py-2 text-white bg-blue-700 rounded-lg duration-150 hover:bg-blue-800 active:shadow-lg"
                >
                    Change Password
                </button>
            </div>
        );
    } else {
        return <></>;
    }
}
