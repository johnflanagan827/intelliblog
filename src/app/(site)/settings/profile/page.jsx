"use client";

import { BsCamera } from "react-icons/bs";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Profile() {
    const router = useRouter();
    const { data: session } = useSession();

    const [file, setFile] = useState(null);
    const [password, setPassword] = useState("");
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageUrl, setImageUrl] = useState(null);

    const submitProfile = async () => {
        if (file && file?.type.split("/")[0] !== "image") {
            toast.error("Invalid image format!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords must match!");
            return;
        }

        const data = new FormData();
        data.set("image", file);
        data.set("type", file?.type);
        data.set("name", `${firstName} ${lastName}`);
        data.set("id", session?.user?.id);
        data.set("password", password);

        const res = await fetch("/api/updateuser", {
            method: "PUT",
            body: data,
        });
        const result = await res.json();
        if (result.status === "204") {
            await signIn("credentials", {
                email: session.user.email,
                password: password,
                redirect: false,
            });
            toast.success("Profile updated successfully!");
        } else {
            toast.error(result.error);
        }
    };

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
            setFirstName(session?.user?.name.split(" ")[0]);
            setLastName(session?.user?.name.split(" ")[1]);
            fetchImage();
        } else if (session === null) {
            router.push("/login");
        }
    }, [session]);

    useEffect(() => {
        if (file) {
            setImageUrl(URL.createObjectURL(file));
        }
    }, [file]);

    if (session) {
        return (
            <div>
                <div className="margin mt-4">
                    <div className="mb-12">
                        <h2 className="font-bold mb-4 text-4xl">Edit Profile</h2>
                        <p>
                            Personalize your account to reflect your preferences and identity. 
                            Simply enter your password to confirm changes.
                        </p>
                    </div>

                    <div>
                        <div className="w-full flex justify-center mb-16">
                            <div className="w-28 h-28 outline-none rounded-full ring-offset-2 ring-gray-200 md:focus:ring-2 md:block">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        className="w-full h-full rounded-full"
                                        alt="default avatar"
                                    />
                                ) : null}
                            </div>

                            <label
                                htmlFor="dropzone-file"
                                className="ml-24 mt-4 self-end absolute "
                            >
                                {imageUrl ? (
                                    <div className="flex justify-center items-center w-10 h-10 bg-green-400 rounded-full cursor-pointer">
                                        <BsCamera className="text-2xl text-white" />
                                    </div>
                                ) : null}
                                <input
                                    onChange={(e) => {
                                        if (e.target.files[0].type.split("/")[0] === "image") {
                                            setFile(e.target.files[0]);
                                        } else {
                                            toast.error("Invalid image format!");
                                        }
                                    }}
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="grid gap-6 mb-8 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    First name
                                </label>
                                <input
                                    onChange={(e) => setFirstName(e.target.value.trim())}
                                    type="text"
                                    id="first_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={firstName}
                                    maxLength={50}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="last_name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Last name
                                </label>
                                <input
                                    onChange={(e) => setLastName(e.target.value.trim())}
                                    type="text"
                                    id="last_name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={lastName}
                                    maxLength={50}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-8">
                                <label className="block mt-8 text-sm font-medium text-gray-900">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative mt-2">
                                    <button
                                        className="text-gray-400 absolute right-2 inset-y-0 my-auto active:text-gray-600"
                                        onClick={() => setIsPasswordHidden(!isPasswordHidden)}
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
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={password}
                                        onPaste={(e) => e.preventDefault()}
                                        onDrop={(e) => e.preventDefault()}
                                        maxLength={256}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block mt-8 text-sm font-medium text-gray-900">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative mt-2">
                                <button
                                    className="text-gray-400 absolute right-2 inset-y-0 my-auto active:text-gray-600"
                                    onClick={() =>
                                        setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
                                    }
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <span
                                className={`${!confirmPassword || password === confirmPassword
                                        ? "hidden"
                                        : null
                                    } text-sm text-red-500`}
                            >
                                Confirm password must match password
                            </span>
                        </div>

                        <div className="w-full flex justify-center">
                            <button
                                onClick={() => submitProfile()}
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
