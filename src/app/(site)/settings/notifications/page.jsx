"use client"

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Notifications() {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session === null) {
            router.push("/login");
        }
    }, [session]);


    if (session) {
        return (
            <div className="margin mt-4">
                <div className="mb-12">
                    <h2 className="font-bold mb-4 text-4xl">Notification Preferences</h2>
                    <p>
                        Customize your notification preferences and stay connected with IntelliBlog.
                    </p>
                </div>
                <div className="grid gap-6 mb-8">
                    <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-bold text-gray-900">New Blog Posts</span>
                        </label>
                        <label className="ml-14 block mb-2 text-sm font-medium text-gray-900">Get notified whenever a new blog post is generated.</label>
                    </div>
                    <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-bold text-gray-900">Improvements and Updates</span>
                        </label>
                        <label className="ml-14 block mb-2 text-sm font-medium text-gray-900"> Receive notifications for enhancements, new features, and user experience changes.</label>
                    </div>
                    <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-bold text-gray-900">Feedback and Surveys</span>
                        </label>
                        <label className="ml-14 block mb-2 text-sm font-medium text-gray-900"> Participate in surveys to provide valuable user feedback for future updates.</label>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
                        </div>
            </div>
        );
    } else {
        return (
            <></>
        );
    }
}