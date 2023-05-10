import { useEffect } from "react";
import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import "./index.css";

const SignInPage = (props) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user);
      if (props.funcNav) {
        props.funcNav(true)
      }

      setLoggedIn(!loggedIn)
      navigate('/LandingPage');
    } catch (error) {
      setShowAlert(true)
    }
  }

  useEffect(() => {
    if (props.funcNav) {
      props.funcNav(false)
    }
  })

  return (
    <div className="flex flex-row bg-gray-900">
      <div className="bg-grey-lighter min-h-screen flex flex-col items-center justify-center w-1/2 text-white border-r border-zinc-200">
        <section className="flex w-[20rem] flex-col space-y-10">
        <img src="/images/nwLogo.png" alt="" className="scale-75 shadow-white"/>
          <h1 className="text-3xl text-center text-zinc-200 font-semibold">Sign In</h1>
          <div className="w-full transform text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder="Email or Username"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none rounded-lg"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
          </div>

          <div className="w-full transform text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              placeholder="Password"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none rounded-lg"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
          </div>

          <Toaster richColors />
          <button
            className="transform rounded-lg bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-700"
            onClick={() => {
              login();
              toast.success('Login successfull')
            }}
          >
            LOG IN
          </button>
          {showAlert &&
            <div>
              <div class="flex bg-red-200 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
                <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <div>
                  <span class="font-medium">Incorrect Email or password, Please try again</span>
                </div>
              </div>
            </div>
          }

          <a
            href="/PasswordResetEmail"
            className="transform text-center font-semibold text-zinc-200 duration-300 hover:text-zinc-200"
          >FORGOT PASSWORD?</a
          >
        </section>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2">

      </div>
    </div>
  )
}

export default SignInPage;
