import { useState } from "react";
import { useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const SignUpPage = (props) => {
    const [newName, setNewName] = useState();
    const [newNumber, setNewNumber] = useState(0);
    const [newAddress, setNewAddress] = useState();
    const [newCpfSector, setNewCpfSector] = useState();
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
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
                number: newNumber,
                address: newAddress,
                CPFSector: newCpfSector,
                checkedIn: false,
            });

            navigate("/SignInPage");
        } catch (error) {
            setShowAlert(true)
        }
    }

    return (
        <main className="p-10 bg-gray-900">
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-gray-900 px-6 py-8 rounded shadow-md text-white w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <div>
                            <input
                                type="text"
                                className="block border border-white-light w-full p-3 rounded mb-4 text-black"
                                name="fullname"
                                placeholder="Full Name"
                                onChange={(event) => {
                                    setNewName(event.target.value);
                                }}
                            />

                            <input
                                type="email"
                                className="block border border-white-light w-full p-3 rounded mb-4 text-black"
                                name="email"
                                placeholder="Email"
                                onChange={(event) => {
                                    setRegisterEmail(event.target.value);
                                }}
                            />
                            <input
                                type="text"
                                className="block border border-white-light w-full p-3 rounded mb-4 text-black"
                                name="Address"
                                placeholder="Address"
                                onChange={(event) => {
                                    setNewAddress(event.target.value);
                                }}
                            />
                            <input
                                type="text"
                                className="block border border-white-light w-full p-3 rounded mb-4 text-black"
                                name="CPFSector"
                                placeholder="Sector(Charles/Alphas/Bravo)"
                                onChange={(event) => {
                                    setNewCpfSector(event.target.value);
                                }}
                            />
                            <input
                                type="number"
                                name="number"
                                id="number"
                                autoComplete="number"
                                className="block border border-white-light w-full p-3 rounded mb-4 text-black"
                                placeholder="Number"
                                onChange={(event) => {
                                    setNewNumber(event.target.value);
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
                                className="block border border-white-light w-full p-3 rounded mb-4 text-black"
                                name="password"
                                placeholder="Password"
                                onChange={(event) => {
                                    setRegisterPassword(event.target.value);
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-center py-3 rounded text-white hover:bg-indigo-700 focus:outline-none my-1"
                            onClick={() => {
                                register()
                            }}

                        >Create Account</button>
                        {/*
                        <div className="text-center text-sm text-white mt-4">
                            By signing up, you agree to the &nbsp;
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#/">
                                Terms of Service
                            </a> and &nbsp; 
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#/">
                                Privacy Policy
                            </a>
                        </div>
                        */}
                    </div>

                    <div className="text-white">
                        Already have an account? &nbsp;
                        <a className="no-underline border-b border-blue text-blue" href="../components/SignInPage">
                            Log in
                        </a>.
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignUpPage;