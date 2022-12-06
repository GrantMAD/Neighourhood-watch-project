import { useEffect } from "react";
import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUpPage = (props) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
      try{
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(user);
        navigate('/IncidentReportPage');
    } catch (error) {
        console.log(error.message);
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
        
            <a
              href="/#"
              className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
              >FORGOT PASSWORD?</a
            >
            <a
              href="SignUpPage"
              className="transform text-center font-semibold text-indigo-600 duration-300 hover:text-gray-300"
              >Sign Up</a
            >
          </section>
        </main>
    )
}

export default SignUpPage;