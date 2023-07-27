import Image from "next/image";
import headshot from "../../public/images/headshot.jpg";
import Link from "next/link";

export default function About() {
    return (
        <div>
            <section className="mt-14 flex justify-center">
                <div className="max-w-screen-xl mx-auto">
                    <div className="items-center gap-24 px-5 lg:flex">
                        <div className="">
                            <Image
                                className="h-72 object-scale-down lg:max-w-lg rounded-lg"
                                src={headshot}
                                alt="John Flanagan Headshot"
                            ></Image>
                        </div>
                        <div className="max-w-2xl space-y-3 mt-6 lg:mt-0">
                            <h3 className="text-indigo-600 font-semibold">About Me</h3>
                            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                                VlogScribe
                            </p>
                            <p className="mt-3 text-gray-600">
                                IntelliBlog is a revolutionary platform created by John
                                Flanagan, a current Junior at the University of Notre Dame,
                                majoring in Computer Science and Mathematics. Our mission is to
                                transform videos into captivating blog posts with the help of
                                advanced AI technology. Whether you have a YouTube video URL or
                                an uploaded video, IntelliBlog's seamless solution generates
                                high-quality written content that resonates with your audience.
                            </p>
                            <p className="text-gray-600">
                                We prioritize originality, ease of use, and customization,
                                allowing you to express yourself creatively while reaching a
                                wider audience. Join us on this content creation journey and
                                experience the power of AI-driven storytelling with IntelliBlog.
                                Unleash your creativity and connect with your readers like never
                                before.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
                            >
                                Contact Us
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
