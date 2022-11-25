const GalleryPage = () => {

    return (
        <main class="h-100% bg-zinc-200">
            <div class="grid pt-10 place-content-center">
                <h1 class="text-4xl  font-semibold mb-10 underline underline-offset-8">Gallery</h1>
            </div>
            <section class="overflow-hidden text-gray-700">
                <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32 border-solid mb-10">
                    <div class="flex flex-wrap -m-1 md:-m-2">
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg shadow-md shadow-stone-400"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg shadow-md shadow-stone-400"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg shadow-md shadow-stone-400"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg shadow-md shadow-stone-400"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg shadow-md shadow-stone-400"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg shadow-md shadow-stone-400"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg shadow-md shadow-stone-400"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg shadow-md shadow-stone-400"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg shadow-md shadow-stone-400"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    </div>
                </div> 
                <div class="flex justify-center max-w-2xl mx-auto mb-10">
                    <nav aria-label="Page navigation example">
                        <ul class="inline-flex -space-x-px shadow-xl">
                            <li>
                                <a href="/#" aria-current="page"
                                    class="bg-white border border-gray-300 text-gray-500  hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                            </li>
                            <li>
                                <a href="/#"
                                    class="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="/#"
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="/#" 
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                            </li>
                            <li>
                                <a href="/#"
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                            </li>
                            <li>
                                <a href="/#"
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                            </li>
                            <li>
                                <a href="/#"
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </main>
    )
}

export default GalleryPage;