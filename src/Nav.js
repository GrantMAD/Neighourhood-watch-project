import "./index.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { useState } from "react";

const Nav = () => {
  const [user, setUser] = useState({});
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = () => {
    try {
      if(user && user.id) {
        setCheckedIn(!checkedIn);
    
        const userDoc = db.collection('users').doc(user.id);
    
        userDoc.update({ checkedIn: !checkedIn });
        }
    } catch (error) {
      console.log(error);
    }
  };


  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const logout = async () => {
    await signOut(auth);
  }

    return (
        <nav>
            <div>
              <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <a href="/">
                        <img className="h-8 w-8" src="/images/ALPHAS-LOGO.png" alt="#" />
                        </a>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline">
                          <a href="/LandingPage" className="mr-6 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Home</a>
                          {user &&
                          <a href="/IncidentReportPage" className=" text-sm font-medium text-white">Incident Report's</a>
                          }
                          <a href="/AboutUs" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">About Us</a>
                          {user &&
                          <a href="/Members" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Members</a>
                          }
                          <a href="/GalleryPage" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Gallery</a>
                          <a href="/ContactPage" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Contact Us</a>
                        </div>
                      </div>
                    </div>
                  
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        {!user &&
                      <div className="ml-3 relative">
                        <a href="/SignInPage" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 border border-white">Sign In</a>
                        </div>
                        }
                        {!user &&
                      <div className="ml-3 relative">
                        <a href="/SignUpPage" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 border border-white">Sign Up</a>
                        </div>
                        }
                        {user &&
                        <div className="mr-5 relative">
                          <button 
                            className={checkedIn ? 'px-3 py-2 border border-lime-300 max-w-xs flex items-center text-sm font-bold rounded-md text-lime-300 hover:bg-gray-700 focus:outline-none focus:shadow-solid bg-lime-200' : 'px-3 py-2 border border-lime-300 max-w-xs flex items-center text-sm font-bold rounded-md text-lime-300 hover:bg-gray-700 focus:outline-none focus:shadow-solid'} 
                            onClick={handleCheckIn}
                            >
                            {checkedIn ? 'Check out' : 'Check in'}
                          </button>
                        </div>
                        }
                        {user &&
                        <div className="flex ml-3 relative">
                          <button className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
                             <img className="h-8 w-8 rounded-full bg-gray-100" src="/images/profileimage.jpg" alt="" />
                          </button>
                          <div id="user-menu-dropdown" className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                            <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                              <a href="/Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</a>
                              <a href="/DashBoard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">DashBoard</a>
                              <a href="/#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={logout}>Sign Out</a>
                            </div>
                          </div>
                        </div>
                      }
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                        <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg className="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hidden md:hidden">
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                     <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                        <div className="mt-1 text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                      </div>
                    </div>
                    <div className="mt-3 px-2">
                      <a href="/ProfilePage" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Your Profile</a>
                      <a href="/DashBoard" className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">DashBoard</a>   
                      <a href="/SignInPage"  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Sign In</a>
                    </div>
                  </div>
                </div>
              </nav>

            </div>
            </nav>

    )
}

export default Nav;