import { db } from "../firebase";
import { useState, useEffect, useRef } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../index.css";

const SignUpPage = (props) => {
    const [newName, setNewName] = useState();
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [showAlertFail, setShowAlertFail] = useState(false);
    const [showAlertForThreeSeconds, setShowAlertForThreeSeconds] = useState(false);
    const [showVerificationAlert, setShowVerificationAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const usersCollectionRef = collection(db, "users");
    const [showPassword, setShowPassword] = useState(false);
    const loginButtonRef = useRef(null);
    const [error, setError] = useState('');
    const auth = getAuth();

    useEffect(() => {
        if (props.funcNav) {
            props.funcNav(false)
        }
    },)

    const register = async () => {
        try {
            setIsLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            const user = userCredential.user;

            await sendEmailVerification(user);

            await addDoc(usersCollectionRef, {
                name: newName,
                email: registerEmail,
                address: '',
                number: '',
                about: '',
                checkedIn: false,
                role: "pendingUser",
                profileImage: '',
                cpfSector: '',
                profileUpdated: '',
            });

            setShowVerificationAlert(true);
            setIsAdded(!isAdded);
            setShowAlertForThreeSeconds(true);
        } catch (error) {
            setShowAlertFail(true);
            setShowAlertForThreeSeconds(true);
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                setError('Email address is already in use.');
            } else {
                setError('Error during sign-up: ' + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        let timeout;
        if (showVerificationAlert) {
            timeout = setTimeout(() => {
                setShowVerificationAlert(false);
            }, 5000);
        }

        return () => clearTimeout(timeout);
    }, [showVerificationAlert]);

    useEffect(() => {
        let timeout;
        if (showAlertForThreeSeconds) {
            timeout = setTimeout(() => {
                setShowAlertForThreeSeconds(false);
            }, 3000);
        }

        return () => clearTimeout(timeout);

    }, [showAlertForThreeSeconds]);

    return (
        <div className="p-16 bg-gray-800">
            <div className="flex flex-col sm:flex-row bg-zinc-200 rounded-2xl">
                <div className="hidden sm:flex flex-col justify-center items-center w-1/2 bg-gradient-to-l from-blue-800 to-violet-600 rounded-l-lg">
                    <div className="flex flex-col items-center">
                        <h1 className="text-zinc-200 text-xl mb-3">Nice to see you</h1>
                        <h1 className="text-zinc-200 text-5xl font-medium underline underline-offset-8">WELCOME</h1>
                        <p className="text-center mr-[25%] ml-[25%] mt-10 text-zinc-200">Welcome to the Neighbourhood Watch family!
                            We're excited to have you on board, ensuring safety with glee.
                            Join our community to protect and care, hand in hand.
                            Together, we'll create a secure neighbourhood, oh so grand.
                            Sign up now, and let's make a difference, strong and true.
                            Thank you for being a proactive neighbour, welcome anew!</p>
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
                                    className="border-2 border-blue-800 placeholder-black w-full mb-4 text-black rounded-lg"
                                    name="fullname"
                                    placeholder="Full Name"
                                    onChange={(event) => {
                                        setNewName(event.target.value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            loginButtonRef.current.click();
                                        }
                                    }}
                                />


                                <input
                                    type="email"
                                    className="border-2 border-blue-800 placeholder-black w-full mb-4 text-black rounded-lg"
                                    name="email"
                                    placeholder="Email"
                                    onChange={(event) => {
                                        setRegisterEmail(event.target.value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            loginButtonRef.current.click();
                                        }
                                    }}
                                />
                                {showAlertFail && showAlertForThreeSeconds && (
                                    <div>
                                        <div className="flex bg-red-200 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
                                            <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                            </svg>
                                            <div>
                                                <span className="font-medium">{error}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="border-2 border-blue-800 placeholder-black w-full mb-4 text-black rounded-lg"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(event) => {
                                            setRegisterPassword(event.target.value);
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                loginButtonRef.current.click();
                                            }
                                        }}
                                    />
                                    <span
                                        className="absolute mt-[22px] right-4 transform -translate-y-1/2 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEye : faEyeSlash}
                                            style={{ color: "#666" }}
                                        />
                                    </span>
                                </div>
                                {showVerificationAlert && (
                                    <div className="flex bg-green-200 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert">
                                        <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M0 10a10 10 0 1120 0 10 10 0 01-20 0zm12.293-4.293a1 1 0 011.414 0L16 7.586l2.293-2.293a1 1 0 111.414 1.414L17.414 9l2.293 2.293a1 1 0 01-1.414 1.414L16 10.414l-2.293 2.293a1 1 0 01-1.414-1.414L14.586 9l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <span className="font-medium">Please check your email to verify your account.</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-center md:px-10">
                                {isLoading ? (
                                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid mt-3 border-blue-800 align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                    </div>
                                ) : (
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-l from-blue-800 to-violet-600 text-center py-3 rounded-lg text-white focus:outline-none my-1 font-semibold hover:bg-gradient-to-r"
                                        onClick={() => {
                                            register();
                                        }}
                                        ref={loginButtonRef}

                                    >Create Account</button>
                                )}
                            </div>
                            <div className="text-gray-800 font-semibold text-center mt-3">
                                Already have an account? &nbsp;
                                <a
                                    className="no-underline text-blue-800"
                                    href="/SignInPage"
                                >
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