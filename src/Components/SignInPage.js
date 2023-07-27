import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../index.css";

const SignInPage = (props) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const loginButtonRef = useRef(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      setIsLoading(true);
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user);
      if (props.funcNav) {
        props.funcNav(true)
      }

      setLoggedIn(!loggedIn)
      navigate('/LandingPage');
    } catch (error) {
      setShowAlert(true)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (props.funcNav) {
      props.funcNav(false)
    }
  })

  return (
    <div className="p-16 bg-gray-800">
      <div className="flex flex-row bg-zinc-200 rounded-2xl">
        <div className="bg-grey-lighter min-h-screen flex flex-col items-center justify-center text-white w-full sm:w-1/2">
          <div className="flex w-[20rem] flex-col">
            <img src="/images/nwLogo.png" alt="" className="scale-75" />
            <h1 className="text-3xl text-center text-gray-800 font-semibold mb-5">Sign In</h1>
            <div className="md:px-3">
              <div className="flex items-center justify-center mb-5">
                <input
                  type="text"
                  placeholder="Email or Username"
                  className="lg:w-full border-2 border-blue-800 bg-transparent outline-none placeholder:italic focus:outline-none rounded-lg text-black"
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      loginButtonRef.current.click();
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="lg:w-full border-2 border-blue-800 bg-transparent outline-none placeholder:italic focus:outline-none rounded-lg text-black"
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        loginButtonRef.current.click();
                      }
                    }}
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      style={{ color: "#666" }}
                    />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center md:px-10">
                {isLoading ? (
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid mt-3 border-blue-800 align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                  </div>
                ) : (
                  <button
                    className="transform rounded-lg bg-gradient-to-l from-blue-800 to-violet-600 py-2 font-bold duration-300 hover:bg-gradient-to-r lg:w-full md:w-full w-3/5 mt-5"
                    onClick={() => {
                      login();
                    }}
                    ref={loginButtonRef}
                  >
                    LOG IN
                  </button>
                )}
              </div>
            </div>
            {showAlert &&
              <div>
                <div class="flex bg-red-200 rounded-lg p-4 mb-4 text-sm text-red-700 mt-3" role="alert">
                  <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                  <div>
                    <span class="font-medium">Incorrect Email or password, Please try again</span>
                  </div>
                </div>
              </div>
            }

            <a
              href="/PasswordResetEmail"
              className="transform text-center font-semibold text-gray-800 duration-300 hover:text-gray-900 mt-5"
            >FORGOT PASSWORD?</a
            >
          </div>
        </div>
        <div className="hidden sm:flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-blue-800 to-violet-600 rounded-r-lg">
          <div className="flex flex-col items-center">
            <h1 className="text-zinc-200 text-xl mb-3">Nice to see you again</h1>
            <h1 className="text-zinc-200 text-5xl font-medium underline underline-offset-8 md:text-center">WELCOME BACK</h1>
            <p className="text-center mr-[25%] ml-[25%] mt-10 text-zinc-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean purus ante, pharetra id semper a, pulvinar id nulla. Sed elementum volutpat felis, sed faucibus orci auctor at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed eget nisl tristique, efficitur tellus vel, elementum dui. Morbi elementum libero in felis faucibus, ac ullamcorper massa dapibus. Fusce.</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SignInPage;
