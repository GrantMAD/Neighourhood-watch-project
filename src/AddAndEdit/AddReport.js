import { useState, useEffect } from "react"
import { db, auth } from "../firebase";
import { collection, addDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Toaster, toast } from 'sonner';

const AddReport = () => {
    const [newTitle, setNewTitle] = useState('');
    const [newPatrollerName, setNewPatrollerName] = useState('');
    const [newTime, setNewTime] = useState('');
    const [newDate, setNewDate] = useState();
    const [newPoliceNumber, setNewPoliceNumber] = useState('');
    const [newDateReport, setNewDateReport] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const navigate = useNavigate();
    const usersCollecctionRef = collection(db, "reports");

    const updateUserReportCount = async (userUID) => {
        const usersCollectionRef = collection(db, "users");
    
        try {
            const querySnapshot = await getDocs(usersCollectionRef);
            querySnapshot.forEach(async (userDoc) => {
                const userData = userDoc.data();
                if (userData.uid === userUID) {
                    const reportCount = userData.reportCount || 0;
                    const userDocRef = doc(db, "users", userDoc.id);
    
                    if (!userData.hasOwnProperty("reportCount")) {
                        await updateDoc(userDocRef, {
                            reportCount: 1,
                        });
                    } else {
                        await updateDoc(userDocRef, {
                            reportCount: reportCount + 1,
                        });
                    }
                }
            });
        } catch (error) {
            console.error("Error updating user report count:", error);
        }
    };

    const addReport = async (e) => {
        e.preventDefault();
        if (!newTitle || !newPatrollerName || !newTime || !newDate || !newDateReport || !newLocation || !newDescription || !newPoliceNumber) {
            setShowWarning(true);
            return;
        }

        const user = auth.currentUser;
        const userUID = user.uid;

        await addDoc(usersCollecctionRef, { title: newTitle, patrollerName: newPatrollerName, time: newTime, date: newDate, dateReport: newDateReport, location: newLocation, description: newDescription, policeNumber: newPoliceNumber, uid: userUID, viewCount: 0, });
        
        setIsAdded(!isAdded);
        toast.success('Report saved successfully!');

        await updateUserReportCount(userUID);
        navigate('/IncidentReportPage');
    }

    useEffect(() => {
        const currentDate = new Date().toISOString().split("T")[0];
        setNewDateReport(currentDate);
    }, []);

    const handleTimeChange = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, "");

        if (value.length >= 2) {
            value = value.substring(0, 2) + ":" + value.substring(2);
        }

        setNewTime(value);
    };

    return (
        <main className="p-10 bg-zinc-200">
            <h1 className="grid text-gray-800 text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10 mt-16">Add Report</h1>
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>

            <div className="mt-10 sm:mt-0" id="incident-report-area">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Incident Report</h3>
                            <p className="mt-1 text-sm text-gray-600">To create incident report add information in inputs</p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#">
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                autoComplete="title"
                                                placeholder="Incident Title"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                onChange={(event) => {
                                                    setNewTitle(event.target.value);
                                                }}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <div class="flex">
                                                <div class="mb-3 xl:w-96">
                                                    <label for="name" className="form-label inline-block mb-2 font-medium text-gray-700"
                                                    >Patroller's name</label>
                                                    <input
                                                        type="text"
                                                        className="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                                        id="PatrollersName"
                                                        placeholder="Name"
                                                        onChange={(event) => {
                                                            setNewPatrollerName(event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <div class="flex">
                                                <div class="mb-3 xl:w-96">
                                                    <label for="name" className="form-label inline-block mb-2 font-medium text-gray-700"
                                                    >Referance number</label>
                                                    <input
                                                        type="number"
                                                        className="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                                        id="PatrollersName"
                                                        placeholder="Name"
                                                        onChange={(event) => {
                                                            setNewPoliceNumber(event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <div className="flex">
                                                <div className="mb-3 xl:w-96">
                                                    <label for="Time" className="form-label inline-block mb-2 font-medium text-gray-700"
                                                    >Time of Incident</label>
                                                    <input
                                                        type="text"
                                                        className="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                                        id="time"
                                                        placeholder="Time"
                                                        value={newTime}
                                                        onChange={handleTimeChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <div className="flex">
                                                <div className="mb-3 xl:w-96">
                                                    <label for="date" className="form-label inline-block mb-2 font-medium text-gray-700"
                                                    >Date of Incident</label>
                                                    <input
                                                        type="Date"
                                                        className="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                                        id="DateOfIncident"
                                                        onChange={(event) => {
                                                            setNewDate(event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <div className="flex">
                                                <div className="mb-3 xl:w-96">
                                                    <label for="Time" className="form-label inline-block mb-2 font-medium text-gray-700"
                                                    >Date of Report</label>
                                                    <input
                                                        type="Date"
                                                        className="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                "
                                                        id="DateOfReport"
                                                        value={newDateReport}
                                                        onChange={(event) => {
                                                            setNewDateReport(event.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="Location-of-incident" className="block text-sm font-medium text-gray-700">
                                                Location of Incident
                                            </label>
                                            <input
                                                type="text"
                                                name="LocationOfIncident"
                                                id="LocationOfIncident"
                                                autoComplete="Location-of-incident"
                                                placeholder="Location"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                onChange={(event) => {
                                                    setNewLocation(event.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <div className="flex">
                                                <div className="mb-3 xl:w-96">
                                                    <label for="incident-desciption" className="form-label inline-block mb-2 font-medium text-gray-700">Incident Desciption</label>
                                                    <textarea
                                                        type="text"
                                                        className="
                                form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                resize 
                            "
                                                        id="incidentDesciption"
                                                        rows="10"
                                                        placeholder="Desciption"
                                                        onChange={(event) => {
                                                            setNewDescription(event.target.value);
                                                        }}
                                                    ></textarea>
                                                    <h1 className="text-xs">To make the window larger click and drag the bottom right corner</h1>
                                                    {showWarning && (
                                                        <p className="text-red-500 text-sm mt-2">Please fill in all the input fields.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white px-4 py-3 text-right sm:px-6">
                                    <Toaster richColors />
                                    <button
                                        className="mr-5 inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={(e) => {
                                            addReport(e);
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>
        </main>
    )
}

export default AddReport
