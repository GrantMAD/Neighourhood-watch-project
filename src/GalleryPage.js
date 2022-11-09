const GalleryPage = () => {

    return (
        <main class="h-screen bg-zinc-200">
            <div class="pt-10">
                <h1 class="grid text-4xl place-content-center font-semibold underline underline-offset-8">Gallery</h1>
            </div>
            <section class="overflow-hidden text-gray-700 ">
                <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                    <div class="flex flex-wrap -m-1 md:-m-2">
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    <div class="flex flex-wrap w-1/3">
                        <div class="w-full p-1 md:p-2">
                        <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
                            src="/images/aboutUsImage.jpg"/>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default GalleryPage;