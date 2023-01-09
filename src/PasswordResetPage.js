import { useEffect, useState } from "react";
import 'firebase/compat/auth';
import { confirmPasswordReset, getAuth } from "firebase/auth";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

const PasswordResetPage = (props) => {
    const auth = getAuth();
    const [newPassword, setNewPassword] = useState('');
    const query = useQuery()
    const [successShowAlert, setSuccessShowAlert] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        if (props.funcNav) {
            props.funcNav(false)
        }
    })

    const resetPassword = (oobCode, newPassword) => {
        return confirmPasswordReset(auth, oobCode, newPassword) 
    }
     const useQuery = () => {
        const location = useLocation();
        return new URLSearchParams(location.search)
     }

    return (
        <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-center bg-gray-900 text-white">
            <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10">Password Reset</h1>
            <div>
                <input
                    value={newPassword}
                    type="password"
                    className="block border border-white-light w-80 p-3 rounded mb-4 text-black"
                    name="New Password"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            {successShowAlert &&
          <div>
            <div class="flex bg-red-200 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert">
              <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <div>
                <span class="font-medium">Password has been Changed</span>
              </div>
            </div>
          </div>
        }
            <button
                type="submit"
                className="w-64 bg-indigo-600 text-center py-3 rounded text-white hover:bg-indigo-700 focus:outline-none my-1"
                onClick={() => {
                    resetPassword(query.get('oobCode'), newPassword)
                    .then(response => 
                        console.log(response))
                        setSuccessShowAlert(true);
                        navigate('/SignInPage')
                    .catch(error => 
                        console.log(error.message))
                }}
            >Reset Password</button>
        </main>
    )
}

export default PasswordResetPage;