import { useEffect } from "react";
import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignInPage = (props) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user);
      navigate('/IncidentReportPage');
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
    <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
      <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">Sign In</div>
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            placeholder="Email or Username"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
        </div>

        <button
          className="transform rounded-lg bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-700"
          onClick={login}
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
          href="/#"
          className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
        >FORGOT PASSWORD?</a
        >
      </section>
    </main>
  )
}

export default SignInPage;