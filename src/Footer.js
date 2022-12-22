import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";

const Footer = () => {
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    return (
        <section className="bg-gray-800 border-t-2 border-white mt-auto">
            <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                    <div className="px-5 py-2">
                        <a href="/" className="text-base leading-6 text-white hover:text-lg">
                            Home
                        </a>
                    </div>
                    {user &&
                        <div className="px-5 py-2">
                            <a href="/IncidentReportPage" className="text-base leading-6 text-white hover:text-lg">
                                Incident Report's
                            </a>
                        </div>
                    }
                    <div className="px-5 py-2">
                        <a href="/AboutUs" className="text-base leading-6 text-white hover:text-lg">
                            About Us
                        </a>
                    </div>
                    {user &&
                        <div className="px-5 py-2">
                            <a href="/Members" className="text-base leading-6 text-white hover:text-lg">
                                Members
                            </a>
                        </div>
                    }
                    <div className="px-5 py-2">
                        <a href="/GalleryPage" className="text-base leading-6 text-white hover:text-lg">
                            Gallery
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="/ContactPage" className="text-base leading-6 text-white hover:text-lg">
                            Contact Us
                        </a>
                    </div>
                </nav>
                <div>
                    <div className="flex justify-center mt-5 space-x-6">
                        <a href="/#" className="hover:text-gray-500">
                            <span className="sr-only">Facebook</span>
                            <svg className="w-6 h-6 fill-blue-500" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                    <p className="mt-5 text-base leading-6 text-center text-white">
                        © 2022 Alpha Security, Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer;