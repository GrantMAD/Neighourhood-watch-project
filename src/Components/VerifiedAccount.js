import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const VerifiedAccount = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.funcNav) {
            props.funcNav(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const SignInRedirect = () => {
        navigate('/SignInPage')
    }

    return (
        <main className="mx-auto flex flex-col min-h-screen w-full items-center justify-center bg-gray-900 text-white">
            <div className="flex-shrink-0">
                <a href="/">
                    <img className="h-20 scale-75 hover:opacity-75 hover:scale-125 shadow-white" src="/images/nwLogo.png" alt="#" />
                </a>
            </div>
            <p>Your Account has been verified</p>
            <button className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 p-3 mt-3 rounded-md" onClick={SignInRedirect}>
                Back to Sign in
            </button>
        </main>
    )
}

export default VerifiedAccount;