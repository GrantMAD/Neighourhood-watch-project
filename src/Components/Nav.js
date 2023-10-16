import "../index.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect, useState, useRef } from "react";
import { collection, query, where, getDocs, updateDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faArrowRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';

const Nav = () => {
    const [user, setUser] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
    const [showAdminOptions, setShowAdminOptions] = useState(false);
    const [isPanelClicked, setIsPanelClicked] = useState(false);
    const [showCheckOutPopup, setShowCheckOutPopup] = useState(false);
    const [pendingUser, setPendingUser] = useState(false);
    const [showNotification, setShowNotification] = useState();
    const [checkedIn, setCheckedIn] = useState(
        localStorage.getItem('checkedIn') === 'true'
    );
    const usersCollectionRef = collection(db, "users");
    const navigate = useNavigate();
    const adminPanelRef = useRef(null);
    const isAdmin = userRole === 'admin';

    useEffect(() => {
        localStorage.setItem('checkedIn', checkedIn);
    }, [checkedIn]);

    useEffect(() => {
        localStorage.setItem('userRole', userRole);
    }, [userRole]);

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
                    localStorage.setItem("profileImage", userData.profileImage);
                    setShowNotification(!userData.profileUpdated);
                    if (userData.role === "pendingUser") {
                        setPendingUser(true);
                    } else {
                        setPendingUser(false);
                    }
                });
            });
        }
    }, [usersCollectionRef]);

    useEffect(() => {
        const notificationsRef = collection(db, "notifications");
        const queryNotifications = query(notificationsRef);

        onSnapshot(queryNotifications, (snapshot) => {
            const notificationData = [];
            snapshot.forEach((doc) => {
                notificationData.push(doc.data());
            });
            setNotifications(notificationData);
        });
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (adminPanelRef.current && !adminPanelRef.current.contains(event.target)) {
                setShowAdminOptions(false);
                setIsPanelClicked(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const visibleNotifications = notifications.filter(notification => {
        if (notification.type === 'newUserSignup' && !isAdmin) {
            return false;
        }
        return true;
    });

    const handleCheckIn = async () => {
        setCheckedIn(!checkedIn)
        try {
            if (user && user.email) {
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsClicked(!isClicked);
    }

    const handleProfileUpdate = async () => {
        try {
            if (user && user.email) {
                const usersCollectionRef = collection(db, 'users')
                const userQuery = query(usersCollectionRef, where("email", "==", user.email))
                const data = await getDocs(userQuery)
                const userDocRef = data.docs[0].ref
                await updateDoc(userDocRef, {
                    profileUpdated: true
                });
                setShowNotification(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = () => {
        setShowAdminOptions(!showAdminOptions);
        setIsPanelClicked(!showAdminOptions);
    };

    const handleDeleteNotification = async (notificationId) => {
        try {
            const notificationsRef = collection(db, "notifications");
            const notificationDocRef = doc(notificationsRef, notificationId);

            await deleteDoc(notificationDocRef);

            const updatedNotifications = notifications.filter((item) => item.notificationId !== notificationId);
            setNotifications(updatedNotifications);

            toast.success('Notification deleted successfully.');
            navigate('/MembersPanel');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while deleting the notification.');
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await deleteDoc(doc(db, "notifications", notificationId));
            console.log("Notification deleted successfully");
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    const handleNotificationButtonClick = async (reportId, notificationId) => {
        try {
            console.log(notificationId);
            const notificationsRef = collection(db, "notifications");
            const notificationDocRef = doc(notificationsRef, notificationId);

            await deleteDoc(notificationDocRef);

            const updatedNotifications = notifications.filter((item) => item.notificationId !== notificationId);
            setNotifications(updatedNotifications);

            navigate(`/IncidentReportPage?reportId=${reportId}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRequest = async (notificationId) => {
        navigate('/Requests');
        await deleteNotification(notificationId);
    }

    const toggleCheckOutPopup = () => {
        setShowCheckOutPopup(!showCheckOutPopup);
    };


    return (
        <nav>
            <div>
                <nav className="fixed top-0 w-full bg-gray-800 z-50">
                    <div className="max-w-7xl mx-auto pr-4 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <a href="/">
                                        <img className="h-12 scale-75 hover:opacity-75 hover:scale-125 shadow-white" src="/images/nwLogo.png" alt="#" />
                                    </a>
                                </div>
                                <div className="hidden md:block">
                                    <div className="lg:ml-10 flex items-center">
                                        <a href="/LandingPage"
                                            className="mr-3 lg:px-3 px-2 py-2 rounded-md text-sm font-medium text-zinc-200 hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500">Home</a>
                                        {user && userRole !== 'pendingUser' &&
                                            <a href="/IncidentReportPage" className=" text-sm font-medium rounded-md text-zinc-200 px-3 py-2 hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500 md:text-center">Incident
                                                Report's</a>
                                        }
                                        <a href="/AboutUs"
                                            className="ml-4 lg:px-3 px-2 py-2 rounded-md text-sm font-medium text-zinc-200 hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500 md:text-center">About
                                            Us</a>
                                        {user && userRole !== 'pendingUser' &&
                                            <a href="/Members"
                                                className="ml-4 lg:px-3 px-2 py-2 rounded-md text-sm font-medium text-zinc-200 hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500">Members</a>
                                        }
                                        <a href="/GalleryPage"
                                            className="ml-4 lg:px-3 px-2 py-2 rounded-md text-sm font-medium text-zinc-200 hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500">Gallery</a>
                                        <a href="/ContactPage"
                                            className="ml-4 lg:px-3 px-2 py-2 rounded-md text-sm font-medium text-zinc-200 hover:bg-gray-700 hover:text-base focus:outline-none focus:text-white focus:bg-gray-700 transition ease-out duration-500 md:text-center">Contact
                                            Us</a>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="lg:ml-4 flex items-center md:ml-6">
                                    {!user && (
                                        <div className="lg:ml-3 relative hover:scale-125 flex-shrink-0">
                                            <a
                                                href="/SignInPage"
                                                className="lg:ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 md:text-base"
                                            >
                                                Sign In
                                            </a>
                                        </div>
                                    )}

                                    {!user && (
                                        <div className="lg:ml-3 relative hover:scale-125 flex-shrink-0">
                                            <a
                                                href="/SignUpPage"
                                                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 md:text-base"
                                            >
                                                Sign Up
                                            </a>
                                        </div>
                                    )}
                                    <div id="popup" className="hidden p-5 rounded-md text-lime-300 max-h-min">
                                        You have checked in
                                    </div>
                                    <div className="relative">
                                        {user &&
                                            <div className="mr-5 lg:block md:block hidden">
                                                <Toaster richColors />
                                                {(userRole === "user" || userRole === "admin") && (
                                                    <button
                                                        className={checkedIn ? 'px-3 py-2 border border-lime-300 max-w-xs flex items-center lg:text-sm font-bold rounded-md text-lime-300 hover:bg-gray-700 focus:outline-none focus:shadow-solid shadow-lg shadow-lime-300 transition ease-out duration-500 md:text-xs' : 'px-3 py-2 border border-lime-300 max-w-xs flex items-center lg:text-sm font-bold rounded-md text-lime-300 hover:bg-gray-700 focus:outline-none focus:shadow-solid transition ease-out duration-500 hover:scale-125 md:text-xs'}
                                                        onClick={() => {
                                                            if (checkedIn) {
                                                                toast.error('You have checked out');
                                                                toggleCheckOutPopup();
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
                                        {showCheckOutPopup && (
                                            <div className="absolute top-12 right-0 mt-2 bg-white p-4 rounded-md shadow-lg w-48 border border-blue-600">
                                                <h1 className="font-semibold underline">Add Report</h1>
                                                <p className="mt-2 text-sm">Done with your patrol? Add a incident report.</p>
                                                <div className="flex justify-between">
                                                    <button onClick={() => {
                                                        navigate('/AddReport');
                                                        toggleCheckOutPopup();
                                                    }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:scale-105 hover:bg-blue-700">Add Report</button>
                                                    <button onClick={toggleCheckOutPopup} className="text-xl pt-3"><FontAwesomeIcon
                                                        icon={faTimesCircle}
                                                        className="text-xl pt-2 text-red-500 cursor-pointer hover:scale-125"
                                                        onClick={toggleCheckOutPopup}
                                                    /></button>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                    {user && (
                                        <div className="relative">
                                            <FontAwesomeIcon
                                                icon={faBell}
                                                className="text-zinc-200 hidden sm:block cursor-pointer"
                                                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                                            />
                                            {(userRole === 'admin' || visibleNotifications.length > 0) && notifications.length > 0 && (
                                                <div className="absolute hidden sm:block animate-pulse top-0 right-0 transform translate-x-1/2 -translate-y-1/2 lg:flex items-center justify-center lg:h-4 lg:w-4 h-3 w-3 rounded-full bg-red-500 text-white text-xs">
                                                    {userRole === 'admin' ? notifications.length : visibleNotifications.length}
                                                </div>
                                            )}
                                            {showNotificationDropdown && (
                                                <div className="absolute top-10 right-0 z-50 w-72 sm:w-80 ">
                                                    <div className="p-4 pt-2">
                                                        <div className="font-bold text-lg bg-gray-800 p-1 pl-2 rounded-md text-white mb-1 underline">Notifications</div>
                                                        {visibleNotifications.length > 0 ? (
                                                            visibleNotifications.map((notification, index) => (
                                                                <div key={index} className="flex flex-col text-sm mb-2 bg-gray-800 rounded-md text-white">
                                                                    {notification.type === 'newUserSignup' && userRole === 'admin' && (
                                                                        <>
                                                                            <div>
                                                                                <div className="font-bold underline pt-3 pb-1 px-3 rounded-md">
                                                                                    {notification.title}
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 mt-1 px-3">
                                                                                {notification.message}
                                                                            </div>
                                                                            <div className="flex justify-center">
                                                                                <FontAwesomeIcon
                                                                                    icon={faArrowRight}
                                                                                    className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 text-zinc-200 text-lg rounded-md w-1/4 py-1 mb-3 "
                                                                                    onClick={() => handleDeleteNotification(notification.notificationId)}
                                                                                />
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                    {notification.type === 'newComment' && (
                                                                        <>
                                                                            <div>
                                                                                <div className=" underline underline-offset-2 decoration-2 decoration-blue-600 pt-3 pb-1 px-3 rounded-md">
                                                                                    {notification.title}
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 mt-1 px-3">
                                                                                {notification.message}
                                                                            </div>
                                                                            <div className="flex justify-center">
                                                                                <button
                                                                                    className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 text-zinc-200 font-semibold rounded-md w-1/2 py-1 mb-3 "
                                                                                    onClick={() => handleNotificationButtonClick(notification.reportId, notification.notificationId)}
                                                                                >
                                                                                    Go to Report
                                                                                </button>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                    {notification.type === 'neighbourhoodRequest' && (
                                                                        <>
                                                                            <div>
                                                                                <div className=" underline underline-offset-2 decoration-2 decoration-blue-600 pt-3 pb-1 px-3 rounded-md">
                                                                                    {notification.title}
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 mt-1 px-3">
                                                                                {notification.message}
                                                                            </div>
                                                                            <div className="flex justify-center">
                                                                                <button
                                                                                    className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 text-zinc-200 font-semibold rounded-md w-1/2 py-1 mb-3 "
                                                                                    onClick={() => handleRequest(notification.notificationId)}
                                                                                >
                                                                                    Go to Request
                                                                                </button>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="text-sm bg-gray-800 p-3 rounded-md text-zinc-200">
                                                                {isAdmin ? "No notifications currently." : "No notifications currently."}
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {user &&
                                        <div className="lg:flex md:flex hidden ml-3 relative">
                                            {showNotification && (
                                                <div className="fixed top-16 right-56 z-50 bg-zinc-200 p-2 rounded-md shadow border-2 border-blue-700 mt-1 font-semibold">
                                                    <p className="text-sm">
                                                        Please update your Profile.
                                                        <Link
                                                            to="/Profile"
                                                            className="ml-2 underline hover:text-blue-700"
                                                            onClick={handleProfileUpdate}
                                                        >
                                                            Update Now
                                                        </Link>
                                                        <button
                                                            className="ml-2 underline hover:text-blue-700"
                                                            onClick={handleProfileUpdate}
                                                        >
                                                            Close
                                                        </button>
                                                    </p>
                                                </div>
                                            )}
                                            <button
                                                className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                                                id="user-menu"
                                                aria-label="User menu"
                                                aria-haspopup="true"
                                            >
                                                <img
                                                    className="lg:h-8 lg:w-8 md:h-8 md:w-10 w-8 h-8 rounded-full bg-gray-100 hover:opacity-75 hover:scale-125"
                                                    src={localStorage.getItem('profileImage') || "/images/profileAvatar.png"}
                                                    alt=""
                                                />
                                            </button>
                                            <div id="user-menu-dropdown" className="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                                <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                                    <a href="/Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
                                                    {userRole === "admin" && (
                                                        <div
                                                            className={`${isPanelClicked ? " border-2 border-blue-700 bg-zinc-300 rounded-sm" : ""}`}
                                                        >
                                                            <button
                                                                className="flex justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full"
                                                                onClick={handleClick}
                                                                ref={adminPanelRef}
                                                            >
                                                                Admin Panel
                                                            </button>
                                                            {showAdminOptions && (
                                                                <div className="bg-zinc-100">
                                                                    <a href="/SectorAddition" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem">Sector Addition's</a>
                                                                    <a href="/ArchivedReports" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem">Archived Report's</a>
                                                                    <a href="/MembersPanel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem">Member's Panel</a>
                                                                    <a href="/Requests" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" role="menuitem">Requests</a>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    <a href="/#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={logout}>Sign Out</a>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            {user &&
                                <div className="lg:hidden md:hidden">
                                    <Toaster richColors />
                                    {(userRole === "user" || userRole === "admin") && (
                                        <button
                                            className={checkedIn ? 'px-3 py-1 text-xs border border-lime-300 max-w-xs flex items-center font-bold rounded-md text-lime-300 hover:bg-gray-700 focus:outline-none focus:shadow-solid shadow-lg shadow-lime-300 transition ease-out duration-500' : 'px-3 py-1 text-xs border border-lime-300 max-w-xs flex items-center font-bold rounded-md text-lime-300 hover:bg-gray-700 focus:outline-none focus:shadow-solid transition ease-out duration-500 hover:scale-125'}
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
                            <div className="-mr-2 flex md:hidden menu-wrapper">
                                <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 z-50 ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
                                    <ul class="flex flex-col p-2 mt-4 divide-y divide-gray-500 border border-gray-800 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                        <li>
                                            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Home</a>
                                        </li>
                                        {user && userRole !== 'pendingUser' &&
                                            <li>
                                                <a href="/incidentReportPage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Incident Report's</a>
                                            </li>
                                        }
                                        <li>
                                            <a href="/AboutUs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:hover:bg-transparent  md:p-0">About Us</a>
                                        </li>
                                        {user && userRole !== 'pendingUser' &&
                                            <li>
                                                <a href="/Members" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Member's</a>
                                            </li>
                                        }
                                        <li>
                                            <a href="/GalleryPage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Gallery</a>
                                        </li>
                                        <li>
                                            <a href="/ContactPage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Contact Us</a>
                                        </li>
                                        <li>
                                            <a href="/Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:hover:bg-transparent  md:p-0">Profile</a>
                                        </li>
                                        <li>
                                            <a href="/#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:hover:bg-transparent  md:p-0" onClick={logout}>Sign Out</a>
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
                {pendingUser && (
                    <div className="fixed top-16 left-44 z-50 bg-zinc-200 p-2 shadow rounded-md text-center border-2 border-blue-700 mt-1 font-semibold">
                        <p className="text-sm">
                            To get approved and get full access to this sector, please click the link and download the form
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSenLvVNes7YRk2cxcUXW4q1I8bm4h-djs-Ew_BMRpaalJd-Rg/viewform?pli=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-1 underline hover:text-blue-700"
                            >
                                here
                            </a>
                            .
                        </p>
                    </div>
                )}


            </div>
        </nav>
    )
}
export default Nav;
