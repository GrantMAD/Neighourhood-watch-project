import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const PublicProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedUser = location.state?.selectedUser;
    const [showInfoTooltip, setShowInfoTooltip] = useState(false);
    const totalTimeHours = Math.floor(selectedUser.totalTime / (60 * 60 * 1000));
    const totalTimeMinutes = Math.floor((selectedUser.totalTime % (60 * 60 * 1000)) / (60 * 1000));


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
                    className="p-8 bg-white shadow mt-24 border border-blue-600 rounded-lg"
                    key={selectedUser.id}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                            <div className="relative">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    style={{ color: "#2563eb", }}
                                    size="2x"
                                    onMouseEnter={() => setShowInfoTooltip(true)}
                                    onMouseLeave={() => setShowInfoTooltip(false)}
                                />

                                {showInfoTooltip && (
                                    <div className="absolute bg-zinc-200 rounded-md p-2 text-gray-800 border border-blue-600 mt-2 whitespace-nowrap mr-32 lg:-right-32 z-50">
                                        <h1 className="font-bold underline">Emergency Contact Information</h1>
                                        <div>
                                            <h1 className="text-blue-600 font-bold mt-1 underline underline-offset-4 decoration-2 decoration-gray-800">Name:</h1>
                                            <p className="text-gray-800">{selectedUser.emergencyContactName}</p>
                                        </div>
                                        <div>
                                            <h1 className="text-blue-600 font-bold mt-2 underline underline-offset-4 decoration-2 decoration-gray-800">Contact number:</h1>
                                            <p className="text-gray-800">{selectedUser.emergencyContactNumber}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                className="w-48 h-48 border border-blue-600 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"
                                alt=""
                                src={selectedUser.profileImage}
                            >
                            </img>
                        </div>

                        <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                            <button
                                className="text-white py-2 px-4 uppercase rounded bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 shadow hover:shadow-lg font-medium transition transform"
                                onClick={returnMembersPage}
                            >
                                Return
                            </button>
                        </div>
                    </div>

                    <div className="mt-20 text-center border-b pb-5">
                        <h1 className="text-4xl font-medium text-gray-800 underline underline-offset-4">{selectedUser.name}</h1>
                        <div>
                            <h1 className="text-blue-600 font-bold underline underline-offset-2 decoration-2 decoration-gray-800 mt-5">Address:</h1>
                            <p className=" text-gray-800">{selectedUser.address} {selectedUser.district}</p>
                        </div>
                        <div>
                            <h1 className="text-blue-600 font-bold underline underline-offset-2 decoration-2 decoration-gray-800 mt-2">Neighbourhood:</h1>
                            <p className=" text-gray-800">{selectedUser.cpfSector}</p>
                        </div>
                        <div>
                            <h1 className="text-blue-600 font-bold underline underline-offset-2 decoration-2 decoration-gray-800 mt-2">Cell Number:</h1>
                            <p className=" text-gray-800">{selectedUser.number}</p>
                        </div>
                        <div>
                            <h1 className="text-blue-600 font-bold underline underline-offset-2 decoration-2 decoration-gray-800 mt-2">Email:</h1>
                            <p className=" text-gray-800">{selectedUser.email}</p>
                        </div>
                        <div className="mt-5 border-t pt-3">
                            <h1 className="text-xl font-semibold underline underline-offset-2">User's Stats</h1>
                            <div className="flex justify-center items-center">
                                <div className="flex justify-between mt-2">
                                    <div>
                                        <div className="flex">
                                            <div className="flex items-center">
                                                <FontAwesomeIcon icon={faClock} className="text-blue-600" />
                                            </div>
                                            <h1 className="text-blue-600 underline underline-offset-2 decoration-2 decoration-gray-800 ml-2">Time checked in</h1>
                                        </div>
                                        <p className="text-gray-800">{totalTimeHours} hours and {totalTimeMinutes} minutes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 flex flex-col justify-center">
                        <h1 className="text-2xl text-blue-600 font-bold mt-2 underline underline-offset-4 decoration-2 decoration-gray-800 text-center mb-5">About</h1>
                        <p className="text-gray-800 text-center font-light lg:px-16">{selectedUser.about}</p>
                    </div>

                </div>

            </div>

        </main>
    )
}

export default PublicProfile;