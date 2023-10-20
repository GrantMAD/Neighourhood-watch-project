import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from "../firebase";

const UserMetrics = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const usersCollectionRef = collection(db, "users");
                const userQuery = query(usersCollectionRef);

                const data = await getDocs(userQuery);
                const userData = data.docs.map(doc => doc.data());

                // Add an "open" property to track whether the accordion is open or not
                const userDataWithOpenProp = userData.map(user => ({ ...user, open: false }));

                setUserData(userDataWithOpenProp);
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        getUsersData();
    }, []);

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
    

    return (
        <div className="min-h-screen bg-zinc-200 md:p-10 lg:pt-24 lg:pb-24 lg:px-10">
            <div className="flex justify-center pt-20 md:pt-10">
                <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold underline underline-offset-8 decoration-2 decoration-gray-800">User Metrics</h1>
            </div>
            <div className="lg:ml-[27.5%] lg:mr-[27.5%] ml-[10%] mr-[10%] mt-5 mb-5">
                <p>This is where user metrics are available to view. Below are the check-in and check-out times for all users within Sector 2. More metrics will be added in the future. This page is only visible to admins.</p>
            </div>

            <div className="flex flex-col items-center mb-3 lg:mr-[25%] lg:ml-[25%] md:ml-[4%] md:mr-[4%] mt-10">
                {userData.map(user => (
                    <div key={user.email} className="bg-gray-800 p-1 shadow-md accordion rounded-tl-lg rounded-tr-lg hover:bg-gray-700 font-semibold mb-5 w-full">
                        <div className="flex p-3 cursor-pointer" onClick={() => toggleAccordion(user.email)}>
                            <div>
                                <FontAwesomeIcon icon={faFileAlt} className="mr-4 text-white" />
                            </div>
                            <h2 className="text-lg text-zinc-200 font-semibold">{user.name}</h2>
                        </div>

                        {user.open && (
                            <div className="bg-white p-3 border border-gray-300">
                                {user.sessions && user.sessions.length > 0 ? (
                                    user.sessions.map(session => (
                                        <div key={session.sessionID} className="flex justify-between border-b border-gray-300 py-2">
                                            <div>
                                                {session.checkInTime && <div><strong>Checked-In:</strong> <div>{session.checkInTime.toDate().toLocaleString()}</div></div>}
                                                {session.checkOutTime && <div><strong>Checked-Out:</strong> <div>{session.checkOutTime.toDate().toLocaleString()}</div></div>}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-600">No Check in and out times available</div>
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
