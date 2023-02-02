import { useEffect, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const PasswordResetEmail = (props) => {
    const [email, setEmail ] = useState(''); 
    const auth = getAuth();
    const [successShowAlert, setSuccessShowAlert] = useState(false);

    useEffect(() => {
        if (props.funcNav) {
            props.funcNav(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email, 
        {url: 'http://localhost:3000/SignInPage'})
        
    }

    return (
        <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-center bg-gray-900 text-white">
            <h1 className="grid text-gray-800 text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10">Password Reset</h1>
            <div>
                <input
                    value={email}
                    type="email"
                    className="block border border-white-light w-80 p-3 rounded mb-4 text-black"
                    name="Email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {successShowAlert &&
          <div>
            <div class="flex bg-white rounded-lg p-4 mb-4 text-sm text-green-700" role="alert">
              <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <div>
                <span class="font-medium">Email has been sent, check inbox/Junk mail</span>
              </div>
            </div>
          </div>
        }
            <button
                type="submit"
                className="w-64 bg-indigo-600 text-center py-3 rounded text-white hover:bg-indigo-700 focus:outline-none my-1"
                onClick={() => {
                    forgotPassword(email)
                    .then(response => {
                        console.log(response)
                        setSuccessShowAlert(true)
                    })
                    .catch(e => 
                        console.log(e.message),
                        )
                }}
            >Send Email</button>
        </main>
    )
}

export default PasswordResetEmail;