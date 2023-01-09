import { useEffect, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const PasswordResetEmail = (props) => {
    const [email, setEmail ] = useState(''); 
    const auth = getAuth();

    useEffect(() => {
        if (props.funcNav) {
            props.funcNav(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            console.log(error.message);
        });
    

    return (
        <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-center bg-gray-900 text-white">
            <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10">Password Reset</h1>
            <div>
                <input
                    type="email"
                    className="block border border-white-light w-80 p-3 rounded mb-4 text-black"
                    name="Email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="w-64 bg-indigo-600 text-center py-3 rounded text-white hover:bg-indigo-700 focus:outline-none my-1"
                onClick={sendPasswordResetEmail}
            >Send Email</button>
        </main>
    )
}

export default PasswordResetEmail;