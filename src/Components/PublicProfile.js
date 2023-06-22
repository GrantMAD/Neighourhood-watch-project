import { useNavigate, useLocation } from "react-router-dom";

const PublicProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedUser = location.state?.selectedUser;

    const returnMembersPage = () => {
        navigate('/Members');
    }

    if (!selectedUser)
        return <div>No user data found</div>;

        console.log(selectedUser.name);

    return (
        <main className="h-screen p-10 bg-zinc-200">
            <div className="p-16">
                <div
                    className="p-8 bg-white shadow mt-24"
                    key={selectedUser.id}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">

                        </div>
                        <div className="relative">
                            <img
                                className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"
                                alt=""
                                src={selectedUser.profileImage}
                            >                               
                            </img>
                        </div>

                        <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                            <button
                                className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                onClick={returnMembersPage}
                            >
                                Return
                            </button>
                        </div>
                    </div>

                    <div className="mt-20 text-center border-b pb-12">
                        <h1 className="text-4xl font-medium text-gray-800">{selectedUser.name}</h1>
                        <p className="font-light text-gray-600 mt-3">{selectedUser.address}</p>

                        <p className="mt-8 text-gray-500">{selectedUser.number}</p>
                        <p className="mt-2 text-gray-500">{selectedUser.email}</p>
                    </div>

                    <div className="mt-12 flex flex-col justify-center">
                        <p className="text-gray-600 text-center font-light lg:px-16">{selectedUser.about}</p>
                    </div>

                </div>

            </div>

        </main>
    )
}

export default PublicProfile;