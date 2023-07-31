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
                                className="text-white py-2 px-4 uppercase rounded bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                onClick={returnMembersPage}
                            >
                                Return
                            </button>
                        </div>
                    </div>

                    <div className="mt-20 text-center border-b pb-12">
                        <h1 className="text-4xl font-medium text-gray-800 underline underline-offset-3">{selectedUser.name}</h1>
                        <div>
                            <h1 className="text-blue-600 font-bold underline mt-5">Address:</h1>
                            <p className=" text-gray-800">{selectedUser.address}</p>
                        </div>
                        <div>
                        <h1 className="text-blue-600 font-bold underline mt-2">CPFSector:</h1>
                        <p className=" text-gray-800">{selectedUser.cpfSector}</p>
                        </div>
                        <div>
                        <h1 className="text-blue-600 font-bold underline mt-2">Cell Number:</h1>
                        <p className=" text-gray-800">{selectedUser.number}</p>
                        </div>
                        <div>
                        <h1 className="text-blue-600 font-bold underline mt-2">Email:</h1>
                        <p className=" text-gray-800">{selectedUser.email}</p>
                        </div>
                    </div>
                    <div className="mt-3 flex flex-col justify-center">
                    <h1 className="text-2xl text-blue-600 font-bold mt-2 underline text-center mb-5">About</h1>
                        <p className="text-gray-800 text-center font-light lg:px-16">{selectedUser.about}</p>
                    </div>

                </div>

            </div>

        </main>
    )
}

export default PublicProfile;