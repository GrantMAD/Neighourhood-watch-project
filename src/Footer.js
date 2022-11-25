const Footer = () => {

    return (
        <section class="bg-gray-800 border-t-2 border-white mt-auto">
            <div class="max-w-screen-xl px-4 py-8 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                <nav class="flex flex-wrap justify-center -mx-5 -my-2">
                <div class="px-5 py-2">
                        <a href="/" class="text-base leading-6 text-white hover:text-lg">
                            Home
                        </a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="/AboutUs" class="text-base leading-6 text-white hover:text-lg">
                            About Us
                        </a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="/Blog" class="text-base leading-6 text-white hover:text-lg">
                            Blog
                        </a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="/Members" class="text-base leading-6 text-white hover:text-lg">
                            Members
                        </a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="/GalleryPage" class="text-base leading-6 text-white hover:text-lg">
                            Gallery
                        </a>
                    </div>
                    <div class="px-5 py-2">
                        <a href="/ContactPage" class="text-base leading-6 text-white hover:text-lg">
                            Contact Us
                        </a>
                    </div>
                </nav>
                <div>
                    <div class="flex justify-center mt-5 space-x-6">
                        <a href="/#" class="hover:text-gray-500">
                            <span class="sr-only">Facebook</span>
                            <svg class="w-6 h-6 fill-white" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                    <p class="mt-5 text-base leading-6 text-center text-white">
                        © 2022 Alpha Security, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer;