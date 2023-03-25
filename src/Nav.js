import "./index.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, updateDoc, onSnapshot } from "firebase/firestore";
import { Toaster, toast } from 'sonner';

const Nav = () => {
    const [user, setUser] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [checkedIn, setCheckedIn] = useState(
        localStorage.getItem('checkedIn') === 'true'
    );
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
        localStorage.setItem('checkedIn', checkedIn);
    }, [checkedIn]);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userEmail = currentUser.email;
            const userRef = query(usersCollectionRef, where("email", "==", userEmail));
            onSnapshot(userRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    const userData = doc.data();
                    setUserRole(userData.role);
                });
            });
        }
    }, [usersCollectionRef]);

    const handleCheckIn = async () => {
        setCheckedIn(!checkedIn)
        try {
            if (user && user.uid) {
                const usersCollectionRef = collection(db, 'users')
                const userQuery = query(usersCollectionRef, where("email", "==", user.email))
                const data = await getDocs(userQuery)
                const userDocRef = data.docs[0].ref
                const userDoc = data.docs[0].data()
                await updateDoc(userDocRef, {
                    "checkedIn": !checkedIn
                });
                console.log(JSON.stringify(userDoc, null, 2))
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    const logout = async () => {
        await signOut(auth);
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
        setIsClicked(!isClicked);
    }

    return (
        <nav>
            <div>
                <nav className="fixed top-0 w-full bg-gray-800 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <a href="/">
                                        <img className="h-8 w-8 hover:opacity-75 hover:scale-125" src="/images/ALPHAS-LOGO.png" alt="#" />
                                    </a>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline">
                                        <a href="/LandingPage"
                                            className="mr-6 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500">Home</a>
                                        {user && userRole !== 'pendingUser' &&
                                            <a href="/IncidentReportPage" className=" text-sm font-medium rounded-md text-white px-3 py-2 hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500">Incident
                                                Report's</a>
                                        }
                                        <a href="/AboutUs"
                                            className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500">About
                                            Us</a>
                                        {user && userRole !== 'pendingUser' &&
                                            <a href="/Members"
                                                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500">Members</a>
                                        }
                                        <a href="/GalleryPage"
                                            className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500">Gallery</a>
                                        <a href="/ContactPage"
                                            className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500">Contact
                                            Us</a>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    {!user &&
                                        <div className="ml-3 relative">
                                            <a href="/SignInPage"
                                                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 border border-white">Sign
                                                In</a>
                                        </div>
                                    }
                                    {!user &&
                                        <div className="ml-3 relative">
                                            <a href="/SignUpPage"
                                                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 border border-white">Sign
                                                Up</a>
                                        </div>
                                    }
                                    <div id="popup" className="hidden p-5 rounded-md text-lime-300 max-h-min">
                                        You have checked in
                                    </div>
                                    {user &&
                                        <div className="mr-5">
                                            <Toaster richColors />
                                            {userRole === "admin" && (
                                                <button
                                                    className={checkedIn ? 'px-3 py-2 border border-lime-300 max-w-xs flex items-center text-sm font-bold rounded-md text-lime-300 hover:bg-gray-700 focus:outline-none focus:shadow-solid shadow-lg shadow-lime-300 transition ease-out duration-500' : 'px-3 py-2 border border-lime-300 max-w-xs flex items-center text-sm font-bold rounded-md text-lime-300 hover:bg-gray-700 focus:outline-none focus:shadow-solid transition ease-out duration-500 hover:scale-125 ...'}
                                                    onClick={() => {
                                                        if (checkedIn) {
                                                            toast.error('You have checked out');
                                                        } else {
                                                            toast.success('You have checked in');
                                                        }
                                                        handleCheckIn();
                                                    }}
                                                >
                                                    {checkedIn ? 'Check out' : 'Check in'}
                                                </button>
                                            )}
                                        </div>
                                    }
                                    {user &&
                                        <div className="flex ml-3 relative">
                                            <button
                                                className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                                                id="user-menu" aria-label="User menu" aria-haspopup="true">
                                                <img className="h-8 w-8 rounded-full bg-gray-100 hover:opacity-75 hover:scale-125"
                                                    src="/images/profileimage.jpg" alt="" />
                                            </button>
                                            <div id="user-menu-dropdown"
                                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                                <div className="py-1 rounded-md bg-white shadow-xs" role="menu"
                                                    aria-orientation="vertical" aria-labelledby="user-menu">
                                                    <a href="/Profile"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        role="menuitem">Profile</a>
                                                    {user && userRole !== 'pendingUser' &&
                                                        <a href="/DashBoard"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            role="menuitem">DashBoard</a>
                                                    }
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
                                <div id="popup" className="hidden p-5 rounded-md text-lime-300 max-h-min">
                                    You have checked in
                                </div>
                                {user &&
                                    <div className="mr-5">
                                        <Toaster richColors />
                                        <button
                                            className={checkedIn ? 'px-3 py-2 border border-lime-300 max-w-xs flex items-center text-sm font-bold rounded-md text-lime-300 hover:bg-gray-700 focus:outline-none focus:shadow-solid shadow-lg shadow-lime-300 transition ease-out duration-500' : 'px-3 py-2 border border-lime-300 max-w-xs flex items-center text-sm font-bold rounded-md text-lime-300 hover:bg-gray-700 focus:outline-none focus:shadow-solid transition ease-out duration-500 hover:scale-125 ...'}
                                            onClick={() => {
                                                if (checkedIn) {
                                                    toast.error('You have checked out');
                                                } else {
                                                    toast.success('You have checked in');
                                                }
                                                handleCheckIn();
                                            }}
                                        >
                                            {checkedIn ? 'Check out' : 'Check in'}
                                        </button>
                                    </div>
                                }
                                <div class={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
                                    <ul class="flex flex-col p-2 mt-4 divide-y divide-gray-500 border border-gray-800 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                        <li>
                                            <a href="/" class="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Home</a>
                                        </li>
                                        {user && userRole !== 'pendingUser' &&
                                        <li>
                                            <a href="/incidentReportPage" class="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Incident Report's</a>
                                        </li>
}
                                        <li>
                                            <a href="/AboutUs" class="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">About Us</a>
                                        </li>
                                        {user && userRole !== 'pendingUser' &&
                                        <li>
                                            <a href="/Members" class="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Member's</a>
                                        </li>
}
                                        <li>
                                            <a href="/GalleryPage" class="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Gallery</a>
                                        </li>
                                        <li>
                                            <a href="/ContactPage" class="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Contact Us</a>
                                        </li>
                                        <li>
                                            <a href="/Profile" class="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Profile</a>
                                        </li>
                                        {user && userRole !== 'pendingUser' &&
                                        <li>
                                            <a href="/DashBoard" class="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0">DashBoard</a>
                                        </li>
}
                                        <li>
                                            <a href="/#" class="block py-2 pl-3 pr-4 text-gray-700 font-medium rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
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
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                                    <div
                                        className="mt-1 text-sm font-medium leading-none text-gray-400">tom@example.com
                                    </div>
                                </div>
                            </div>
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
    )
}
export default Nav;
