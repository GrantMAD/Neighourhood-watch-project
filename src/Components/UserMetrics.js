import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { faFileAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from "../firebase";

const UserMetrics = () => {
    const [userData, setUserData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const usersCollectionRef = collection(db, "users");
                const userQuery = query(usersCollectionRef);
    
                const data = await getDocs(userQuery);
                const userData = data.docs.map(doc => doc.data());
    
                const userDataWithInitializedSessions = userData.map(user => ({
                    ...user,
                    sessions: user.sessions || [],
                }));
    
                const userDataWithTotalTime = userDataWithInitializedSessions.map(user => {
                    const totalTime = user.sessions.reduce((acc, session) => {
                        if (session.checkInTime && session.checkOutTime) {
                            const checkInTime = new Date(session.checkInTime).getTime();
                            const checkOutTime = new Date(session.checkOutTime).getTime();
                            return acc + (checkOutTime - checkInTime);
                        } else {
                            return acc;
                        }
                    }, 0);
    
                    return { ...user, totalTime };
                });
    
                const userDataWithOpenProp = userDataWithTotalTime.map(user => ({ ...user, open: false }));
    
                // Step 3: Apply search filter
                const filteredUserData = userDataWithOpenProp.filter(user => 
                    user.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
    
                setUserData(filteredUserData);
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };
    
        getUsersData();
    }, [searchQuery]); // Step 3: Add searchQuery to the dependency array
    

    const toggleAccordion = (email) => {
        setUserData(prevData => {
            return prevData.map(user => {
                if (user.email === email) {
                    return { ...user, open: !user.open };
                } else {
                    return user;
                }
            });
        });
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="min-h-screen bg-zinc-200 md:p-10 lg:pt-24 lg:pb-24 lg:px-10">
            <div className="flex justify-center pt-20 md:pt-10">
                <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold underline underline-offset-8 decoration-2 decoration-gray-800">User Metrics</h1>
            </div>
            <div class="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md w-full sm:w-3/12 md:w-4/12 lg:w-2/12 lg:mr-[25%] lg:ml-[25%] md:ml-[4%] md:mr-[4%] mt-5">
                <button
                    class="py-2 px-4 bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 rounded-l active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none"
                >
                    Search
                </button>
                <input
                    type="search"
                    placeholder="Name/CPF Sector"
                    class="bg-transparent py-1 text-gray-600 px-4 focus:outline-gray-800 w-full border-none"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className="lg:mr-[25%] lg:ml-[25%] md:ml-[4%] md:mr-[4%] mt-5 mb-5">
                <p>This is where user metrics are available to view. Below are the check-in and check-out times for all users within Sector 2. More metrics will be added in the future. This page is only visible to admins. Use the search input to search for a spercific user's name.</p>
            </div>

            <div className="flex flex-col items-center mb-3 lg:mr-[25%] lg:ml-[25%] md:ml-[4%] md:mr-[4%] mt-10">
                {userData.map(user => (
                    <div key={user.email} className="bg-gray-800 shadow-md accordion rounded-tl-lg rounded-tr-lg hover:bg-gray-700 font-semibold mb-5 w-full">
                        <div className="flex p-3 cursor-pointer" onClick={() => toggleAccordion(user.email)}>
                            <div>
                                <FontAwesomeIcon icon={faFileAlt} className="mr-4 text-white" />
                            </div>
                            <h2 className="text-lg text-zinc-200 font-semibold">{user.name}</h2>
                        </div>

                        {user.open && (
                            <div className="bg-white p-3 border border-gray-800">
                                {user.sessions && user.sessions.length > 0 ? (
                                    user.sessions.map(session => (
                                        <div key={session.sessionID} className="flex justify-between border-b border-gray-300 py-2">
                                            <div>
                                                {session.checkInTime && (
                                                    <div>
                                                        <strong>
                                                            <span className="text-green-500 mr-2">●</span>Checked-In:
                                                        </strong>
                                                        <div>{new Date(session.checkInTime).toLocaleString()}</div>
                                                    </div>
                                                )}
                                                {session.checkOutTime && (
                                                    <div>
                                                        <strong>
                                                            <span className="text-red-500 mr-2">●</span>Checked-Out:
                                                        </strong>
                                                        <div>{new Date(session.checkOutTime).toLocaleString()}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-600">No Check in and out times available</div>
                                )}
                                {user.totalTime > 0 && (
                                    <div>
                                        <strong>
                                            <FontAwesomeIcon icon={faClock} className="mt-3 mr-2 text-blue-700" />
                                            Total Time checked in:
                                        </strong>
                                        <div>
                                            {user.totalTime >= 60 * 60 * 1000
                                                ? `${Math.floor(user.totalTime / (60 * 60 * 1000))} ${Math.floor(user.totalTime / (60 * 60 * 1000)) === 1 ? 'hour' : 'hours'} `
                                                : ''}
                                            {user.totalTime % (60 * 60 * 1000) >= 60 * 1000
                                                ? `${Math.floor((user.totalTime % (60 * 60 * 1000)) / (60 * 1000))} ${Math.floor((user.totalTime % (60 * 60 * 1000)) / (60 * 1000)) === 1 ? 'minute' : 'minutes'}`
                                                : ''}
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserMetrics;
