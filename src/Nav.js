import "./index.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";



const Nav = () => {
  const [user, setUser] = useState({});
  
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const logout = async () => {
    await signOut(auth);
  }

    return (
        <nav>
            <div>
              <nav class="bg-gray-800">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        <img class="h-8 w-8" src="/images/ALPHAS-LOGO.png" alt="#" />
                      </div>
                      <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline">
                          <a href="/LandingPage" class="mr-6 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Home</a>
                          {user &&
                          <a href="IncidentReportPage" class=" text-sm font-medium text-white">Incident Report's</a>
                          }
                          <a href="/AboutUs" class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">About Us</a>
                          {user &&
                          <a href="/Members" class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Members</a>
                          }
                          <a href="/GalleryPage" class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Gallery</a>
                          <a href="/ContactPage" class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Contact Us</a>
                        </div>
                      </div>
                    </div>
                  
                    <div class="hidden md:block">
                      <div class="ml-4 flex items-center md:ml-6">
                        {!user &&
                      <div class="ml-3 relative">
                        <a href="/SignInPage" class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 border border-white">Sign In</a>
                        </div>
                        }
                        {user &&
                        <div class="flex ml-3 relative">
                          <button class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
                             <img class="h-8 w-8 rounded-full bg-gray-100" src="/images/profileimage.jpg" alt="" />
                          </button>
                          <div id="user-menu-dropdown" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                            <div class="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                              <a href="/Profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</a>
                              <a href="/DashBoard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">DashBoard</a>
                              <a href="/#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={logout}>Sign Out</a>
                            </div>
                          </div>
                        </div>
                      }
                      </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                      <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                        <svg class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg class="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="hidden md:hidden">
                  <div class="pt-4 pb-3 border-t border-gray-700">
                    <div class="flex items-center px-5">
                     <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      </div>
                      <div class="ml-3">
                        <div class="text-base font-medium leading-none text-white">Tom Cook</div>
                        <div class="mt-1 text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                      </div>
                    </div>
                    <div class="mt-3 px-2">
                      <a href="/ProfilePage" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Your Profile</a>
                      <a href="/DashBoard" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">DashBoard</a>   
                      <a href="/"  class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Sign In</a>
                    </div>
                  </div>
                </div>
              </nav>

            </div>
            </nav>

    )
}

export default Nav;