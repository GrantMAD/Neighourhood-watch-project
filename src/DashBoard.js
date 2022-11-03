import { useAuth0 } from "@auth0/auth0-react";

const DashBoard = () => {
    const {logout, isAuthenticated } = useAuth0();

    return (
        <div class="mt-6">
            {isAuthenticated &&  (
                <button
                    onClick={() => logout()}
                    class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign out
                </button>
            )}        
    </div>

                           
    )
}

export default DashBoard;