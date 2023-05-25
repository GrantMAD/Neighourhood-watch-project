import { useState } from "react";
import { useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import "./index.css";

const SignUpPage = (props) => {
    const [newName, setNewName] = useState();
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const usersCollectionRef = collection(db, "users");
    const navigate = useNavigate();


    useEffect(() => {
        if (props.funcNav) {
            props.funcNav(false)
        }
    },)

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);

            await addDoc(usersCollectionRef, {
                name: newName,
                email: registerEmail,
                checkedIn: false,
                role: "pendingUser"
            });

            setIsAdded(!isAdded)
            navigate("/SignInPage");
        } catch (error) {
            setShowAlert(true)
        }
    }

    return (
        <div className="p-16 bg-gray-800">
            <div className="flex flex-col sm:flex-row bg-zinc-200">
                <div className="hidden sm:flex flex-col justify-center items-center w-1/2 bg-gradient-to-b from-indigo-500 to-purple-500">
                    <div className="flex flex-col items-center">
                        <h1 className="text-zinc-200 text-xl mb-3">Nice to see you</h1>
                        <h1 className="text-zinc-200 text-5xl font-medium underline underline-offset-8">WELCOME</h1>
                        <p className="text-center mr-[25%] ml-[25%] mt-10 text-zinc-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean purus ante, pharetra id semper a, pulvinar id nulla. Sed elementum volutpat felis, sed faucibus orci auctor at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed eget nisl tristique, efficitur tellus vel, elementum dui. Morbi elementum libero in felis faucibus, ac ullamcorper massa dapibus. Fusce.</p>
                    </div>
                </div>
                <div className="bg-grey-lighter min-h-screen flex flex-col items-center justify-center text-white w-full sm:w-1/2">
                    <div className="container max-w-sm flex-1 flex flex-col items-center justify-center px-2">
                        <div className="px-8 py-8 rounded-lg text-white w-full">
                            <img src="/images/nwLogo.png" alt="" className="scale-75" />
                            <h1 className="mb-8 text-3xl text-center text-gray-900 font-semibold">Sign up</h1>
                            <div>
                                <input
                                    type="text"
                                    className="border-2 border-indigo-500 placeholder-black w-full mb-4 text-black rounded-lg"
                                    name="fullname"
                                    placeholder="Full Name"
                                    onChange={(event) => {
                                        setNewName(event.target.value);
                                    }}
                                />


                                <input
                                    type="email"
                                    className="border-2 border-indigo-500 placeholder-black w-full mb-4 text-black rounded-lg"
                                    name="email"
                                    placeholder="Email"
                                    onChange={(event) => {
                                        setRegisterEmail(event.target.value);
                                    }}
                                />
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

                                <input
                                    type="password"
                                    className="border-2 border-indigo-500 placeholder-black w-full mb-4 text-black rounded-lg"
                                    name="password"
                                    placeholder="Password"
                                    onChange={(event) => {
                                        setRegisterPassword(event.target.value);
                                    }}
                                />
                            </div>
                            <Toaster richColors />
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-center py-3 rounded-lg text-white hover:scale-105 focus:outline-none my-1 font-semibold"
                                onClick={() => {
                                    register();
                                    toast.success('Accounnt successfully created')
                                }}

                            >Create Account</button>
                            <div className="text-gray-800 font-semibold text-center mt-3">
                                Already have an account? &nbsp;
                                <a className="no-underline text-indigo-500" href="/SignInPage">
                                    Log in
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;