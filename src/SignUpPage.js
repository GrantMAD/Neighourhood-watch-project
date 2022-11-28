import { useEffect } from "react";

  const SignUpPage = (props) => {
    useEffect(() => {
      if (props.funcNav) {
        props.funcNav(false)
      }
    },)

    return (
        <main class="p-10 bg-gray-900">
            <div class="bg-grey-lighter min-h-screen flex flex-col">
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div class="bg-gray-900 px-6 py-8 rounded shadow-md text-white w-full">
                        <h1 class="mb-8 text-3xl text-center underline">Sign up</h1>
                        <input 
                            type="text"
                            class="block border border-white-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name" />
                            
                        <input
                            type="text"
                            class="block border border-white-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            />

                        <input 
                            type="password"
                            class="block border border-white-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            />
                        <button
                            type="submit"
                            class="w-full bg-indigo-600 text-center py-3 rounded text-white hover:bg-indigo-700 focus:outline-none my-1"
                        >Create Account</button>

                        <div class="text-center text-sm text-white mt-4">
                            By signing up, you agree to the &nbsp;
                            <a class="no-underline border-b border-grey-dark text-grey-dark" href="#/">
                                Terms of Service
                            </a> and &nbsp; 
                            <a class="no-underline border-b border-grey-dark text-grey-dark" href="#/">
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div class="text-white mt-6">
                        Already have an account? &nbsp;
                        <a class="no-underline border-b border-blue text-blue" href="../login/">
                            Log in
                        </a>.
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SignUpPage;