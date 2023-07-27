import DefaultNavbar from './components/DefaultNavbar';
import Link from 'next/link.js';
import Image from 'next/image';
import defaultCorporate from "./public/images/default-corporate.avif";
import defaultTechnology from "./public/images/default-technology.png";


export default function Home() {

const stats = [
  {
    data: "10K",
    title: "Posts Generated"
  },

  {
      data: "1,500",
      title: "Average Word Count"
  },

  {
    data: "2 Hours",
    title: "Saved Per Post"
  },

  {
      data: "97%",
      title: "Accuracy Rating"
  },

]



const features = [
  {
      icon:
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>,
      title: "AI-Powered Content Generation",
      desc: "Harness the power of AI technology to generate high-quality, engaging blog posts effortlessly. Our AI algorithms ensure accurate, relevant, and well-structured content that captivates your audience."
  },
  {
      icon:
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>,
      title: "Versatile Input Options",
      desc: "Choose from a variety of input options to generate blog posts that suit your preferences. Whether it's a YouTube URL, uploaded video, or prompt-based description, we provide flexibility to accommodate your content creation needs."
  },
  {
      icon:
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>,
      title: "Seamless User Experience",
      desc: "Enjoy a smooth and user-friendly experience throughout your journey on our platform. We prioritize intuitive interfaces, easy navigation, and clear instructions to ensure a seamless user experience from start to finish."
  },
  {
      icon:
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
          </svg>,
      title: "Time-Saving Efficiency",
      desc: "Maximize your productivity with our time-saving features. By automating the content generation process, you can save valuable time and allocate it to other essential tasks, helping you stay ahead in your content strategy."
  },
  {
      icon:
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>,
      title: "AI-Enhanced Visuals",
      desc: "Our AI system not only generates captivating written content but also creates visually appealing images that complement your blog posts. Elevate your content with stunning visuals that capture attention and enhance reader engagement."
  },
  {
      icon:
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>,
      title: "Customization Options",
      desc: "Tailor your blog posts to match your unique style and tone. Customize the generated content by providing specific instructions or preferences, ensuring that the final result aligns perfectly with your brand and target audience."
  },
]


  return (
    <div>
        <div className='relative'>
            <div className="absolute inset-0 blur-xl h-[580px] bg-blue-100"></div>
            <div className='relative'>
                <DefaultNavbar />
                <section>
                    <div className="max-w-screen-xl mx-auto px-4 py-16 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
                        <div className='flex-none space-y-5 max-w-xl'>
                            
                            <h1 className="text-4xl text-gray-800 font-extrabold sm:text-5xl">
                            Transform Videos into Engaging Blog Posts
                            </h1>
                            <p>
                            At IntelliBlog, we offer a seamless solution for transforming videos into captivating blog posts. Whether you have a YouTube video URL, an uploaded video, or a prompt-based description, our AI-powered platform generates high-quality content.</p>
                            <div className='flex items-center gap-x-3 sm:text-sm'>
                                <a href="/register" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
                                    Get started
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="flex-1 hidden md:block">
                            <Image  src={defaultTechnology} alt="default technology" className="max-w-xl" />
                        </div>
                    </div>
                </section>
            </div>
        </div>



        <hr />



        <section className="py-16">
            <div className="mx-auto px-4 text-gray-600 md:px-8 max-w-7xl">
                <div className="mx-auto text-center">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                      Stats that Speak for Themselves
                    </h3>
                    <p className="mt-3"> Discover the transformative power of our AI system that effortlessly crafts engaging articles, saving you valuable time. Experience unparalleled accuracy, as our AI generates precise and reliable content. Embrace the convenience of our automated transcriptions, allowing you to focus on your core tasks while receiving top-quality blog posts. Elevate your content strategy with AI-powered efficiency and remarkable precision. </p>            
                </div>
                <div className="mt-12">
                    <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x">
                        {
                            stats.map((item, idx) => (
                                <li key={idx} className="text-center px-12">
                                    <h4 className="text-4xl text-indigo-600 font-semibold">{item.data}</h4>
                                    <p className="mt-3 font-medium">{item.title}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>



        <hr />

        <section className="py-16">
            <div className="max-w-7xl mx-auto md:px-8">
                <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                    <div className="flex-1 sm:hidden lg:block">
                        <Image src={defaultCorporate} alt="four men looking at whiteboard" className="md:max-w-lg sm:rounded-lg" />
                    </div>
                    <div className="px-4 space-y-3 mt-6 sm:px-0 md:mt-0">
                        <h3 className="text-indigo-600 font-semibold">
                           About Us
                        </h3>
                        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Effortless Blog Generation with AI
                        </p>
                        <p className="mt-3 text-gray-600">
                        Say goodbye to complex content creation processes. At IntelliBlog, we make it easy to generate blog posts using AI. Simply provide a YouTube URL, upload a video, or describe your content, and our AI system will seamlessly transform it into captivating written pieces accompanied by stunning AI-generated images. Experience hassle-free content creation with IntelliBlog.                        </p>
                        <Link href="/about" className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium">
                            Learn more
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>



        <hr />



        <section className="py-16">
            <div className="mx-auto px-4 text-gray-600 md:px-8 max-w-7xl">
                <div className="relative mx-auto sm:text-center">
                    <div className="relative z-10">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Why Choose Us?
                        </h3>
                        <p className="mt-3">
                        Discover what makes IntelliBlog unique. Our AI-powered platform offers accurate and engaging content generation, versatile input options, seamless user experience, time-saving efficiency, stunning AI-enhanced visuals, and customizable options. Experience the future of content creation with us.</p>
                    </div>
                    <div className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div>
                </div>
                <div className="relative mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="bg-white space-y-3 p-4 border rounded-lg">
                                    <div className="text-indigo-600 pb-3">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>



        <hr />


        <section className="py-16">
            <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                <div className="max-w-xl space-y-3 md:mx-auto">
                    <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                      Get Started Today
                    </p>
                    <p className="text-gray-600">
                      Unlock the Power of AI-Generated Blog Posts and Transform Your Content Strategy. Experience Effortless Creation and Engaging Results.
                    </p>
                </div>
                <div className="mt-4">
                    <Link href="/register" className="inline-block py-2 px-4 text-white font-medium bg-blue-600 duration-150 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-md hover:shadow-none">
                        Get started
                    </Link>
                </div>
            </div>
        </section>
  </div>
  )
}
