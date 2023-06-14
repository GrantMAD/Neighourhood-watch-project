import "../index.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [userRole, setUserRole] = useState("");
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userEmail = currentUser.email;
            const userRef = query(usersCollectionRef, where("email", "==", userEmail));
            onSnapshot(userRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    const userData = doc.data();
                    setUserRole(userData.role);
                    setUser(userData);
                });
            });
        }
    }, [usersCollectionRef]);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    const logout = async () => {
        await signOut(auth);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsClicked(!isClicked);
    }

    useEffect(() => {
        if (props.funcNav) {
            props.funcNav(false)
        }
    })

    const signUpPage = async () => {
        navigate('/SignUpPage')
    }

    return (
        <div>
            <div>
                <nav>
                    <div>
                        <nav className="fixed top-0 w-full bg-gray-800 z-50">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <a href="/">
                                                <img className="h-12 scale-75 hover:opacity-75 hover:scale-125 shadow-white" src="/images/nwLogo.png" alt="#" />
                                            </a>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="lg:ml-10 flex items-baseline">
                                                <a href="/HomePage"
                                                    className="mr-3 lg:px-3 px-2 py-2 rounded-md text-sm font-medium text-zinc-200 hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500">Home</a>
                                                <a href="/AboutUs"
                                                    className="ml-4 lg:px-3 px-2 py-2 rounded-md text-sm font-medium text-zinc-200 hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500 md:text-center">About
                                                    Us</a>
                                                <a href="/ContactPage"
                                                    className="ml-4 lg:px-3 px-2 py-2 rounded-md text-sm font-medium text-zinc-200 hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500 md:text-center">Contact
                                                    Us</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {!user &&
                                                <div className="ml-3 relative hover:scale-125">
                                                    <a href="/SignInPage"
                                                        className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white  focus:outline-none focus:text-indigo-400 focus:bg-gray-700 border border-indigo-500">Sign
                                                        In</a>
                                                </div>
                                            }
                                            {user &&
                                                <div className="flex ml-3 relative">
                                                    <button
                                                        className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                                                        id="user-menu"
                                                        aria-label="User menu"
                                                        aria-haspopup="true"
                                                    >
                                                        <img
                                                            className="h-8 w-8 rounded-full bg-gray-100 hover:opacity-75 hover:scale-125"
                                                            src={user.profileImage ? user.profileImage : "/images/profileAvatar.png"}
                                                            alt=""
                                                        />
                                                    </button>
                                                    <div id="user-menu-dropdown"
                                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                                        <div className="py-1 rounded-md bg-white shadow-xs" role="menu"
                                                            aria-orientation="vertical" aria-labelledby="user-menu">
                                                            <a href="/Profile"
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                role="menuitem">Profile</a>
                                                            <a href="/#"
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                                                role="menuitem" onClick={logout}>Sign Out</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden menu-wrapper">
                                        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
                                            <ul class="flex flex-col p-2 mt-4 divide-y divide-gray-500 border border-gray-800 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                                <li>
                                                    <a href="/HomePage" className="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Home</a>
                                                </li>
                                                {user && userRole !== 'pendingUser' &&
                                                    <li>
                                                        <a href="/incidentReportPage" className="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Incident Report's</a>
                                                    </li>
                                                }
                                                <li>
                                                    <a href="/AboutUs" className="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">About Us</a>
                                                </li>
                                                {user && userRole !== 'pendingUser' &&
                                                    <li>
                                                        <a href="/Members" className="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Member's</a>
                                                    </li>
                                                }
                                                <li>
                                                    <a href="/GalleryPage" className="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Gallery</a>
                                                </li>
                                                <li>
                                                    <a href="/ContactPage" className="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Contact Us</a>
                                                </li>
                                                <li>
                                                    <a href="/Profile" className="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Profile</a>
                                                </li>
                                                <li>
                                                    <a href="/#" className="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                                                        onClick={logout}
                                                    >SignOut</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <button
                                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white relative"
                                            onClick={toggleMenu}
                                        >
                                            <svg className={`block h-6 w-6 ${isClicked ? 'animate-x-rotate' : 'animate-lines-rotate'}`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                                <path className={`${isClicked ? 'hidden' : 'block'} animate-lines-draw`} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                                <path className={`${isClicked ? 'block' : 'hidden'} animate-x-draw`} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:hidden">
                                <div className="pt-4 pb-3 border-t border-gray-700">
                                    <div className="mt-3 px-2">
                                        <a href="/ProfilePage"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Your
                                            Profile</a>
                                        <a href="/DashBoard"
                                            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">DashBoard</a>
                                        <a href="/SignInPage"
                                            className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Sign
                                            In</a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </nav>
                <div className="flex flex-col md:flex-row bg-gray-800 pt-32 pb-20 px-6 md:px-[20%]">
                    <div className="flex flex-col justify-center items-start md:w-3/5">
                        <div className="font-semibold text-3xl md:text-5xl">
                            <h1 className="text-zinc-200">Welcome to the</h1>
                            <h1 className="text-blue-600">Neighbourhood Watch App.</h1>
                        </div>
                        <div className="text-base md:text-lg text-zinc-200 mt-3 font-semibold">
                            <p>We are here to help you keep your neighbourhood safe. A central place</p>
                            <p>for all your CPF neighbourhood security needs.</p>
                            <div className="mt-7 hover:scale-105">
                                <button
                                    className="px-3 py-2 h-12 md:h-14 w-full md:w-1/2 rounded-md text-sm md:text-md font-semibold text-gray-800 focus:outline-none focus:text-indigo-400 bg-zinc-200"
                                    onClick={signUpPage}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-2/5"></div>
                </div>
                <div className="bg-zinc-200">
                    <div className="px-6 md:px-[20%] pb-10">
                        <h1 className="text-center text-3xl md:text-5xl font-bold pt-20 font-sans mb-3">Sector Snippet's</h1>
                        <div className="px-8 md:px-[30%]">
                            <hr className="border border-blue-600 cursor-pointer hover:border-red-500 duration-500" />
                        </div>
                        <p className="text-center font-semibold pt-10 font-sans">Here we have snippets from each of the main 5 pages. Once you have either created your sector for your local neighbourhood watch or joined a sector that has already been created, you will get access to these pages within your chosen sector.</p>
                    </div>
                    <div>
                        <div className="pt-20 pb-20 px-6 md:px-[20%]">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/2 ml-0 p-3 text-center lg:text-start">
                                    <h1 className="text-3xl font-bold mb-3">Welcome section</h1>
                                    <hr className="border border-blue-600 cursor-pointer hover:border-red-500 duration-500 mb-3 lg:w-4/5 md:w-3/5 md:mx-auto lg:mx-0" />
                                    <p className="text-base md:text-lg font-semibold font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in massa nec sem rutrum pellentesque. Cras venenatis ex ornare libero dignissim efficitur. Maecenas sed tristique.</p>
                                </div>
                                <div className="lg:w-1/2 p-3">
                                    <img src="/images/HomePage/WelcomeScreenshot.PNG" alt="" className="w-full h-full object-contain md:float-left md:mr-5 lg:max-h-md lg:max-w-md lg:border lg:border-zinc-200 rounded-md" />
                                </div>
                            </div>
                        </div>
                        <div className="pb-20 px-6 md:px-[20%]">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/2 p-3">
                                    <img src="/images/HomePage/SectorNewsScreenshot.PNG" alt="" className="w-full h-full object-contain md:float-left md:mr-5 lg:max-h-md lg:max-w-md lg:border lg:border-zinc-200 rounded-md" />
                                </div>
                                <div className="lg:w-1/2 ml-0 p-3 text-center lg:text-start">
                                    <h1 className="text-3xl font-bold mb-3">News section</h1>
                                    <hr className="border border-blue-600 cursor-pointer hover:border-red-500 duration-500 mb-3 lg:w-4/5 md:w-3/5 md:mx-auto lg:mx-0" />
                                    <p className="text-base md:text-lg font-semibold font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in massa nec sem rutrum pellentesque. Cras venenatis ex ornare libero dignissim efficitur. Maecenas sed tristique.</p>
                                </div>
                            </div>
                        </div>
                        <div className="pb-20 px-6 md:px-[20%]">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/2 ml-0 p-3 text-center lg:text-start">
                                    <h1 className="text-3xl font-bold mb-3">Incident Report section</h1>
                                    <hr className="border border-blue-600 cursor-pointer hover:border-red-500 duration-500 mb-3 lg:w-4/5 md:w-3/5 md:mx-auto lg:mx-0" />
                                    <p className="text-base md:text-lg font-semibold font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in massa nec sem rutrum pellentesque. Cras venenatis ex ornare libero dignissim efficitur. Maecenas sed tristique.</p>
                                </div>
                                <div className="lg:w-1/2 p-3">
                                    <img src="/images/HomePage/incidentReportScreenshot.PNG" alt="" className="w-full h-full object-contain md:float-left md:mr-5 lg:max-h-md lg:max-w-md lg:border lg:border-zinc-200 rounded-md" />
                                </div>
                            </div>
                        </div>
                        <div className="pb-20 px-6 md:px-[20%]">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/2 p-3">
                                    <img src="/images/HomePage/MembersScreenshot.PNG" alt="" className="w-full h-full object-contain md:float-left md:mr-5 lg:max-h-md lg:max-w-md lg:border lg:border-zinc-200 rounded-md" />
                                </div>
                                <div className="lg:w-1/2 ml-0 p-3 text-center lg:text-start">
                                    <h1 className="text-3xl font-bold mb-3">Members section</h1>
                                    <hr className="border border-blue-600 cursor-pointer hover:border-red-500 duration-500 mb-3 lg:w-4/5 md:w-3/5 md:mx-auto lg:mx-0" />
                                    <p className="text-base md:text-lg font-semibold font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in massa nec sem rutrum pellentesque. Cras venenatis ex ornare libero dignissim efficitur. Maecenas sed tristique.</p>
                                </div>
                            </div>
                        </div>
                        <div className="pb-20 px-6 md:px-[20%]">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/2 ml-0 p-3 text-center lg:text-start">
                                    <h1 className="text-3xl font-bold mb-3">About us section</h1>
                                    <hr className="border border-blue-600 cursor-pointer hover:border-red-500 duration-500 mb-3 lg:w-4/5 md:w-3/5 md:mx-auto lg:mx-0" />
                                    <p className="text-base md:text-lg font-semibold font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in massa nec sem rutrum pellentesque. Cras venenatis ex ornare libero dignissim efficitur. Maecenas sed tristique.</p>
                                </div>
                                <div className="lg:w-1/2 p-3">
                                    <img src="/images/HomePage/AboutUsScreenshot.PNG" alt="" className="w-full h-full object-contain md:float-left md:mr-5 lg:max-h-md lg:max-w-md lg:border lg:border-zinc-200 rounded-md" />
                                </div>
                            </div>
                        </div>
                        <div className="pb-20 px-6 md:px-[20%]">
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/2 p-3">
                                    <img src="/images/HomePage/GalleryScreenshot.PNG" alt="" className="w-full h-full object-contain md:float-left md:mr-5 lg:max-h-md lg:max-w-md lg:border lg:border-zinc-200 rounded-md" />
                                </div>
                                <div className="lg:w-1/2 ml-0 p-3 text-center lg:text-start">
                                    <h1 className="text-3xl font-bold mb-3">Gallery section</h1>
                                    <hr className="border border-blue-600 cursor-pointer hover:border-red-500 duration-500 mb-3 lg:w-4/5 md:w-3/5 md:mx-auto lg:mx-0" />
                                    <p className="text-base md:text-lg font-semibold font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in massa nec sem rutrum pellentesque. Cras venenatis ex ornare libero dignissim efficitur. Maecenas sed tristique.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 border-t-2 border-white mt-auto ">
                    <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                            <div className="px-5 py-2">
                                <a href="/" className="text-base leading-6 text-white hover:text-lg font-medium">
                                    Home
                                </a>
                            </div>
                            <div className="px-5 py-2">
                                <a href="/#" className="text-base leading-6 text-white hover:text-lg font-medium">
                                    About Us
                                </a>
                            </div>
                            <div className="px-5 py-2">
                                <a href="/#" className="text-base leading-6 text-white hover:text-lg font-medium">
                                    Contact Us
                                </a>
                            </div>
                        </nav>
                        <div>
                            <div className="flex justify-center space-x-6">
                                <a href="/#" className="hover:text-gray-500">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="w-6 h-6 fill-blue-500 hover:scale-125" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                            <p className="mt-5 text-base leading-6 text-center text-white">
                                © 2023 The Neighbourhood Watch App. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage