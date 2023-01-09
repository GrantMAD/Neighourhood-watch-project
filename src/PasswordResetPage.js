import { useEffect } from "react";
import 'firebase/compat/auth';

const PasswordResetPage = (props) => {
    

    useEffect(() => {
        if (props.funcNav) {
            props.funcNav(false)
        }
    })

    

    return (
        <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-center bg-gray-900 text-white">
            <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10">Password Reset</h1>
            <div>
                <input
                    type="password"
                    className="block border border-white-light w-80 p-3 rounded mb-4 text-black"
                    name="New Password"
                    placeholder="New Password"
                    
                />
            </div>
            <div>
                <input
                    type="password"
                    className="block border border-white-light w-80 p-3 rounded mb-4 text-black"
                    name="Confirm Password"
                    placeholder="Confirm Password"
                    
                />
            </div>
            <button
                type="submit"
                className="w-64 bg-indigo-600 text-center py-3 rounded text-white hover:bg-indigo-700 focus:outline-none my-1"
                
            >Reset Password</button>
        </main>
    )
}

export default PasswordResetPage;