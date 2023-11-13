import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { faFileAlt, faClock, faChartBar, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from "../firebase";

const UserMetrics = () => {
    const [userData, setUserData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [reportsSearchQuery, setReportsSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("checkInAndOutTimes");
    const [activeExtraTab, setActiveExtraTab] = useState("reportsPosted");
    const [showAllData, setShowAllData] = useState(false);

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const usersCollectionRef = collection(db, "users");
                const userQuery = query(usersCollectionRef);

                const data = await getDocs(userQuery);
                const userData = data.docs.map(doc => doc.data());
                userData.sort((a, b) => a.name.localeCompare(b.name));

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

                    const reportCount = user.reportCount || 0;

                    return { ...user, totalTime, reportCount };
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
    }, [searchQuery]);

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

    const handleReportsSearchInputChange = (e) => {
        setReportsSearchQuery(e.target.value);
    };

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleExtraTabClick = (tabId) => {
        setActiveExtraTab(tabId);
    };

    const handleShowAllData = () => {
        setShowAllData(!showAllData);
    };

    return (
        <div className="min-h-screen bg-zinc-200 md:p-10 lg:pt-24 lg:pb-24 lg:px-10">
            <div className="flex justify-center pt-20 md:pt-10">
                <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold underline underline-offset-8 decoration-2 decoration-gray-800">User Data</h1>
            </div>

            <div className="lg:mr-[25%] lg:ml-[25%] md:ml-[4%] md:mr-[4%] mt-5 mb-5">
                <p>This is where user data are available to view. Below there are multiple different tabs on which each display's different user data for all users within Sector 2. More metrics will be added in the future. This page is only visible to admins.</p>
            </div>

            <div className="lg:mr-[25%] lg:ml-[25%] md:ml-[4%] md:mr-[4%]">
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li className="mr-2" role="presentation">
                            <button
                                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "checkInAndOutTimes" ? "border-blue-600" : ""}`}
                                id="checkInAndOutTimes-tab"
                                data-tabs-target="#checkInAndOutTimes"
                                type="button"
                                role="tab"
                                aria-controls="checkInAndOutTimes"
                                aria-selected={activeTab === "checkInAndOutTimes"}
                                onClick={() => handleTabClick("checkInAndOutTimes")}
                            >
                                <FontAwesomeIcon icon={faClock} className="mr-2 text-blue-700" />
                                User Check In and out times
                            </button>
                        </li>
                        <li className="mr-2" role="presentation">
                            <button
                                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "extraUserMetrics" ? "border-blue-600" : ""}`}
                                id="extraUserMetrics-tab"
                                data-tabs-target="#extraUserMetrics"
                                type="button"
                                role="tab"
                                aria-controls="extraUserMetrics"
                                aria-selected={activeTab === "extraUserMetrics"}
                                onClick={() => handleTabClick("extraUserMetrics")}
                            >
                                <FontAwesomeIcon icon={faChartBar} className="mr-2 text-blue-700" />
                                Additional user data
                            </button>
                        </li>
                    </ul>
                </div>

                <div id="myTabContent">
                    <div
                        className={`${activeTab === "checkInAndOutTimes" ? "block" : "hidden"} p-16 py-10 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg border border-blue-600`}
                        id="checkInAndOutTimes"
                        role="tabpanel"
                        aria-labelledby="checkInAndOutTimes-tab"
                    >
                        <div className="flex justify-center">
                            <h1 className="mb-5 font-semibold text-2xl underline underline-offset-4 decoration-blue-600">User Check in and out times</h1>
                        </div>
                        <div className="flex justify-between">
                        <div className="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md w-full sm:w-3/12 md:w-4/12 lg:w-4/12 mb-3">
                            <button
                                className="py-2 px-4 bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 rounded-l active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none"
                            >
                                Search
                            </button>
                            <input
                                type="search"
                                placeholder="User Name"
                                className="bg-transparent py-1 text-gray-600 px-4 focus:outline-gray-800 w-full border-none"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                        </div>
                        <button
                                onClick={handleShowAllData}
                                className="py-2 px-4 bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 rounded active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none mb-3"
                            >
                                {showAllData ? 'Hide All Data' : 'Show All Data'}
                            </button>
                        </div>
                        <p className="mb-3">This is where you can search and monitor user's check in, out and total time checked in.</p>
                        <hr className="border-1 border-gray-800 mb-5"></hr>
                        {searchQuery === "" && !showAllData ?  (
                            <div>
                                <p className="mb-3 font-semibold text-lg text-center">To find a user's check-in and check-out times, input their name into the search bar.</p>
                            </div>
                        ) : (
                            <>
                                {userData.map(user => (
                                    <div key={user.email} className="bg-gray-800 shadow-md accordion rounded-tl-lg rounded-tr-lg hover:bg-gray-700 font-semibold mb-5 w-full">
                                        <div className="flex p-3 cursor-pointer" onClick={() => toggleAccordion(user.email)}>
                                            <div>
                                                <FontAwesomeIcon icon={faFileAlt} className="mr-4 text-white" />
                                            </div>
                                            <div className="flex items-center justify-between w-full">
                                                <h2 className="text-zinc-200 font-semibold">{user.name}</h2>
                                                <FontAwesomeIcon icon={user.open ? faMinus : faPlus} className={`ml-2, text-white`} />
                                            </div>
                                        </div>

                                        {user.open && (
                                            <div className="bg-white p-3 border border-gray-800">
                                                <h1 className="text-center text-xl font-bold underline underline-offset-2">Time logs</h1>
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
                            </>
                        )}
                    </div>
                </div>
                <div id="myTabContent">
                    <div
                        className={`${activeTab === "extraUserMetrics" ? "block" : "hidden"} p-10 rounded-lg bg-gray-50 dark:bg-gray-800 border border-blue-600`}
                        id="extraUserMetrics"
                        role="tabpanel"
                        aria-labelledby="extraUserMetrics-tab"
                    >
                        <div className="flex justify-center">
                            <h1 className="mb-5 font-semibold text-2xl underline underline-offset-4 decoration-blue-600">Additional user data</h1>
                        </div>
                        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="extraUserMetricsTab" data-tabs-toggle="#extraUserMetricsTabContent" role="tablist">
                                <li className="mr-2" role="presentation">
                                    <button
                                        className={`inline-block p-4 border-b-2 rounded-t-lg ${activeExtraTab === "reportsPosted" ? "border-blue-600" : ""}`}
                                        id="reportsPosted-tab"
                                        data-tabs-target="#reportsPosted"
                                        type="button"
                                        role="tab"
                                        aria-controls="reportsPosted"
                                        aria-selected={activeExtraTab === "reportsPosted"}
                                        onClick={() => handleExtraTabClick("reportsPosted")}
                                    >
                                        Reports Posted
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div id="extraUserMetricsTabContent">
                            <div
                                className={`${activeExtraTab === "reportsPosted" ? "block" : "hidden"} p-10 pt-5 rounded-lg bg-gray-50 dark:bg-gray-800`}
                                id="reportsPosted"
                                role="tabpanel"
                                aria-labelledby="reportsPosted-tab"
                            >
                                <div className="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md w-full sm:w-3/12 md:w-4/12 lg:w-4/12 mb-3">
                                    <button
                                        className="py-2 px-4 bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 rounded-l active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none"
                                    >
                                        Search
                                    </button>
                                    <input
                                        type="search"
                                        placeholder="User Name"
                                        className="bg-transparent py-1 text-gray-600 px-4 focus:outline-gray-800 w-full border-none"
                                        value={reportsSearchQuery}
                                        onChange={handleReportsSearchInputChange}
                                    />
                                </div>
                                <p className="mb-5">Here you can search for users and see how many reports they have posted on the Incident report page. To search for a user input their name in the search bar.</p>
                                <div>
                                    <table className="w-full border-collapse border border-gray-800">
                                        <thead>
                                            <tr className="bg-gray-800 text-white">
                                                <th className="border border-gray-800 p-2">User Name</th>
                                                <th className="border border-gray-800 p-2">Report Count</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userData
                                                .filter(user => user.name.toLowerCase().includes(reportsSearchQuery.toLowerCase()))
                                                .map(user => (
                                                    <tr key={user.email} className="border border-gray-800">
                                                        <td className="border border-gray-800 p-2">{user.name}</td>
                                                        <td className="text-center border border-gray-800 p-2">{user.reportCount}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserMetrics;
