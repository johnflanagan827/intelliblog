"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BiLink } from "react-icons/bi";
import { GiArtificialHive } from "react-icons/gi";
import { PiWarningDiamondBold } from "react-icons/pi";
import { MdUploadFile } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Media() {
  const [inputValue, setInputValue] = useState("");
  const [activeBtn, setActiveBtn] = useState("Youtube");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const validFileExtensions = [
    "m4a",
    "mp3",
    "mp4",
    "mpeg",
    "mpga",
    "wav",
    "webm",
  ];

  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();
    data.set("mediaFile", file);
    data.set("url", inputValue);
    data.set("id", session.user.id);
    setInputValue("");

    const res = await fetch("/api/createblog-media", {
      method: "PUT",
      body: data,
    });

    const result = await res.json();
    setLoading(false);
    if (result.status === "200") {
      return toast.success("Successfully Generated Blog Post!");
    } else {
      return toast.error(result.error);
    }
  };
  const getVideoDuration = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const media = new Audio(reader.result);
      media.onloadedmetadata = () => resolve(media.duration);
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
  });



  useEffect(() => {
    if (session === null) {
        router.push("/login");
    }
}, [session]);

  const renderYoutube = () => {
    return (
      <>
        
        <div className="flex justify-center items-center gap-5 mt-4 mb-8">
          <img
            className="w-40 h-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/2560px-Logo_of_YouTube_%282015-2017%29.svg.png"
          />
          <p className="font-bold text-4xl">Converter</p>
        </div>
        <div className="relative m-auto md:w-11/12 md:max-w-2xl w-full mb-8">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Paste your video link here"
            required
          />
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Submit
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-12 w-screen margin">
          <div className="shadow-2xl flex flex-col p-5 md:max-w-md">
            <BiLink className="text-slate-100 text-9xl self-center mt-2 bg-red-700 rounded-full p-2" />
            <br />
            <p className="font-bold text-xl text-center h-12">
              Paste Your YouTube Video URL
            </p>
            <br />
            <p>
              Copy and paste the URL of your desired YouTube video into the
              designated field. We will process the URL to generate a blog post
              based on the video content.
            </p>
          </div>
          <div className="shadow-2xl flex flex-col p-5 md:max-w-md">
            <PiWarningDiamondBold className="text-slate-100 text-9xl self-center mt-2 bg-red-700 rounded-full p-2" />
            <br />
            <p className="font-bold text-xl text-center h-12">Constraints</p>
            <br />
            <p>
              To ensure quality blog posts, please adhere to these constraints:
            </p>
            <br />
            <p>
              <b>Duration Limit:</b> Videos must be under 15 minutes.
            </p>
            <p>
              <b>Word Requirement:</b> Videos should have at least 200 words of
              spoken content or subtitles.
            </p>
          </div>
          <div className="shadow-2xl flex flex-col p-5 md:max-w-md">
            <GiArtificialHive className="text-slate-100 text-9xl self-center mt-2 bg-red-700 rounded-full p-2" />
            <br />
            <p className="font-bold text-xl text-center h-12">
              Effortless Blog Generation
            </p>
            <br />
            <p>
              Our service effortlessly converts YouTube videos into blog posts.
              We analyze the video's content, structure it into an introduction,
              main sections, and a conclusion. To enhance the visual appeal, our
              AI technology will create an accompanying image.
            </p>
          </div>
        </div>
      </>
    );
  };

  const renderFileUpload = () => {
    return (
      <>
        <div
          onDragOver={(e) => setFile(e.dataTransfer.files[0])}
          className="w-full"
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                m4a, mp3, mp4, mpeg, mpga, wav, or webm
              </p>
            </div>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
          <div className="flex justify-center w-full mt-6">
            <div
              className={`${
                file ? "block" : "hidden"
              } flex justify-center max-w-md gap-8`}
            >
              <div className="flex gap-2">
                {(validFileExtensions.includes(file?.name.slice(-3)) ||
                validFileExtensions.includes(file?.name.slice(-4))) && file?.size < 50000000 && getVideoDuration(file).then(duration => duration < 900) ? (
                  <BsCheckCircle className="text-5xl text-green-500 self-center mr-4" />
                ) : (
                  <BsXCircle className="text-5xl text-red-600 self-center mr-4" />
                )}
                <div className="self-center">
                  <p className="self-center overflow-hidden truncate sm:w-96 w-32">
                    {file?.name}
                  </p>
                  <p className="text-gray-600">
                    {file ? (file.size / 1000000).toFixed(1) + " MB" : null}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="disabled h-9 self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 disabled:opacity-25"
                disabled={
                  !(
                    validFileExtensions.includes(file?.name.slice(-3)) ||
                    validFileExtensions.includes(file?.name.slice(-4))
                  )
                }
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-10 w-screen margin">
          <div className="shadow-2xl flex flex-col p-5 md:max-w-md">
            <MdUploadFile className="text-slate-100 text-9xl self-center mt-2 bg-green-600 rounded-full p-2" />
            <br />
            <p className="font-bold text-xl text-center">Upload Media File</p>
            <br />
            <p>
              Our platform offers the option to upload media files for blog
              generation. Supported file formats include m4a, mp3, mp4, mpeg,
              mpga, wav, and webm. Simply upload a valid file from your device
              to proceed with the generation process.
            </p>
          </div>
          <div className="shadow-2xl flex flex-col p-5 md:max-w-md">
            <PiWarningDiamondBold className="text-slate-100 text-9xl self-center mt-2 bg-green-600 rounded-full p-2" />
            <br />
            <p className="font-bold text-xl text-center"> Constraints</p>
            <br />
            <p className="mb-2">
              To ensure quality blog posts, please adhere to these constraints:
            </p>
            <p className="mb-2">
              <b>Duration Limit:</b> Videos must be under 15 minutes.
            </p>
            <p className="mb-2">
              <b>Word Requirement:</b> Videos should have at least 200 words of
              spoken content or subtitles.
            </p>
            <p>
              <b>Size Requirement:</b> Videos should be less than 50MB in size
            </p>
          </div>
          <div className="shadow-2xl flex flex-col p-5 md:max-w-md">
            <GiArtificialHive className="text-slate-100 text-9xl self-center mt-2 bg-green-600 rounded-full p-2" />
            <br />
            <p className="font-bold text-xl text-center">
              Effortless Blog Generation
            </p>
            <br />
            <p>
              Easily transform your uploaded media files into captivating blog
              posts using our platform. After selecting and uploading a valid
              m4a, mp3, mp4, mpeg, mpga, wav, or webm file, our advanced AI
              algorithms will analyze the content and generate a well-structured
              blog post.
            </p>
          </div>
        </div>
      </>
    );
  };

  const loadingAnimation = () => {
    return (
      <div className="mt-16 text-center">
        <div className="flex justify-center m-4">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-gray-200 animate-spin fill-blue-600"
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
        <p className="font-bold text-3xl mb-1">Generating Blog Post...</p>
        <p className="text-sm mb-16">
          This may take a few seconds, please don't close the page.
        </p>
      </div>
    );
  };

  if (session) {
  return (
    <div className="margin flex flex-col justify-center">
      <h1 className="text-4xl font-bold my-4">Media-Based Generation</h1>
      <p>
        Our media-based generation section allows you to generate captivating
        blog content in two ways: by pasting a YouTube video URL or uploading a
        valid media file. Our AI algorithms process the media, extracting
        valuable information and creating a compelling blog post. Experience the
        seamless transformation of your media into engaging blog posts!
      </p>
      <div className="flex gap-4 mt-8 mb-4">
        <button
          onClick={() => {
            setActiveBtn("Youtube");
            setFile(null);
          }
          }
          className={`${
            activeBtn === "Youtube" ? "bg-gray-200" : "hover:bg-gray-100"
          } text-gray-800 font-bold py-2 px-4 rounded-lg`}
        >
          Youtube
        </button>
        <button
          onClick={() => setActiveBtn("File Upload")}
          className={`${
            activeBtn === "File Upload" ? "bg-gray-200" : "hover:bg-gray-100"
          } text-gray-800 font-bold py-2 px-4 rounded-lg`}
        >
          File Upload
        </button>
      </div>
      {!loading && activeBtn === "Youtube" ? renderYoutube() : null}
      {!loading && activeBtn === "File Upload" ? renderFileUpload() : null}
      {loading ? loadingAnimation() : null}
    </div>
  );
        } else {
          return (
            <></>
          );
        }
}
