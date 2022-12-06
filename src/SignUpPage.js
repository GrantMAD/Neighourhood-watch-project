import { useState } from "react";
import { useEffect } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";


  const SignUpPage = (props) => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const navigate = useNavigate();
   

    useEffect(() => {
      if (props.funcNav) {
        props.funcNav(false)
      }
    },)

    const register = async () => {
        try{
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
            navigate("/SignInPage");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <main className="p-10 bg-gray-900">
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-gray-900 px-6 py-8 rounded shadow-md text-white w-full">
                        <h1 className="mb-8 text-3xl text-center underline">Sign up</h1>
                        <input 
                            type="text"
                            className="block border border-white-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name" />
                            
                        <input
                            type="text"
                            className="block border border-white-light w-full p-3 rounded mb-4 text-black"
                            name="email"
                            placeholder="Email"
                            onChange={(event) => {
                                setRegisterEmail(event.target.value);
                            }}
                            />

                        <input 
                            type="password"
                            className="block border border-white-light w-full p-3 rounded mb-4 text-black"
                            name="password"
                            placeholder="Password"
                            onChange={(event) => {
                                setRegisterPassword(event.target.value);
                            }}
                            />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-center py-3 rounded text-white hover:bg-indigo-700 focus:outline-none my-1"
                            onClick={register}
                            
                        >Create Account</button>

                        <div className="text-center text-sm text-white mt-4">
                            By signing up, you agree to the &nbsp;
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#/">
                                Terms of Service
                            </a> and &nbsp; 
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#/">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div className="text-white mt-6">
                        Already have an account? &nbsp;
                        <a className="no-underline border-b border-blue text-blue" href="../login/">
                            Log in
                        </a>.
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignUpPage;