import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, getDocs, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SkeletonReport from "./Skeletons/SkeletonReport";
import "./index.css";
import { Toaster, toast } from 'sonner';

const IncidentReportPage = (props) => {
    const [reports, setReports] = useState([]);
    const usersCollectionRef = collection(db, 'users');
    const reportsCollectionRef = collection(db, 'reports');
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    const deleteReport = async (id) => {
        const reportDoc = doc(db, "reports", id);
        await deleteDoc(reportDoc);
        setIsDeleted(!isDeleted);
        setReports(reports.filter((report) => report.id !== id));
        if (selectedReport && selectedReport.id === id) {
            setSelectedReport(null);
        }
    };

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userEmail = currentUser.email;
            const userRef = query(usersCollectionRef, where("email", "==", userEmail));
            onSnapshot(userRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    const userData = doc.data();
                    setUserRole(userData.role);
                });
            });
        }
    }, [usersCollectionRef]);

    const addReport = () => {
        navigate('../AddReport')
    }

    useEffect(() => {
        const getReports = async () => {
            const reportData = await getDocs(reportsCollectionRef);
            setReports(reportData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setIsLoading(false);
        };

        getReports();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (props.funcNav) {
            props.funcNav(true)
        }
    })

    return (
        <main className="flex flex-col bg-zinc-200 min-h-screen">
            <div className="pt-24">
                <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10 text-gray-800">Incident Report's</h1>
            </div>
            <div className="mx-auto max-w-screen-lg mb-5 lg:w-full lg:pl-16 lg:pr-16">
                <div className="flex flex-col md:flex-row justify-between lg:pl-3 lg:pr-3">
                    <div className="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md mb-3 md:mb-0 md:mr-3">
                        <button className="py-2 px-4 bg-gray-800 text-zinc-200 rounded-l border-r border-gray-200 hover:bg-gray-700 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none ">
                            Search
                        </button>
                        <input
                            type="search"
                            placeholder="Report Name"
                            className="bg-transparent py-1 text-gray-600 px-4 focus:outline-gray-800 w-full border-none "
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        className="bg-gray-800 hover:drop-shadow-2xl text-zinc-200 font-bold py-2 px-4 rounded hover:scale-125"
                        onClick={addReport}
                    >
                        Add Report
                    </button>
                </div>
            </div>
            <div className="lg:ml-[27%] lg:mr-[27%] ml-[10%] mr-[10%] mb-5">
                <p>All incident report's are displayed here. Registered patroller's have access to all report's that are currently posted. To search for a report input the name of the report above. To add a new report click on the add report button.</p>
            </div>
            {isLoading ? (
                <SkeletonReport />
            ) : reports.length === 0 ? (
                <p className="text-center text-2xl font-semibold">No Reports Currently Displayed</p>
            ) : 
                // eslint-disable-next-line array-callback-return
                reports.filter((value) => {
                    if (searchTerm === "") {
                        return value
                    } else if (value.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return value
                    }
                }).map((report, index) => {
                    return <div class="flex flex-col items-center mb-3">
                        <div class="w-full md:w-1/2 pr-10 pl-10">
                            <input type="checkbox" name="panel" id={`panel-${index + 1}`} class="hidden" />
                            <label for={`panel-${index + 1}`} class="relative block bg-gray-800 text-zinc-200 p-4 shadow accordion rounded-tl-lg rounded-tr-lg hover:bg-gray-700" onClick={() => setSelectedReport(report)}>{report.title}</label>
                            {selectedReport?.id === report.id && (
                                <div class="accordion__content overflow-hidden bg-gray-100 transition duration-500 ease-in-out">
                                    <div class="bg-white p-5 md:p-10 rounded-br-lg rounded-bl-lg shadow-xl shadow-gray-500 border border-gray-800">
                                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                                            <h1 class="text-xl md:text-2xl mb-3 md:mb-6 font-semibold underline underline-offset-8 decoration-1 text-black text-center">{report.title}</h1>
                                            <div class="flex items-end pb-4 md:pb-0">
                                                <h1 class="font-semibold mr-2 text-black">Date of report:</h1>
                                                <h1>{report.dateReport}</h1>
                                            </div>
                                        </div>
                                        <p class="mb-5 md:mb-10 whitespace-pre-line ...">{report.description}</p>
                                        <div class="flex flex-col md:flex-row justify-between">
                                            <div class="mb-5 md:mb-0 md:mr-5">
                                                <div class="flex mb-2">
                                                    <h1 class="font-semibold mr-2 text-black">Patroller's name:</h1>
                                                    <h1>{report.patrollerName}</h1>
                                                </div>
                                                <div class="flex mb-2">
                                                    <h1 class="font-semibold mr-2 text-black">Location:</h1>
                                                    <h1>{report.location}</h1>
                                                </div>
                                                <div class="flex mb-2">
                                                    <h1 class="font-semibold mr-2 text-black">Date of incident:</h1>
                                                    <h1>{report.date}</h1>
                                                </div>
                                                <div class="flex">
                                                    <h1 class="font-semibold mr-2 text-black">Time of incident:</h1>
                                                    <h1>{report.time}</h1>
                                                </div>
                                            </div>
                                            <div class="flex items-end">
                                                {/*
                                                <button class="bg-blue-500 hover:drop-shadow-2xl text-white font-bold py-2 px-4 rounded mr-2 shadow-xl hover:scale-125" onClick={() => handleEdit(report.docId)}>
                                                    Edit
                                                </button>
                            */}
                                                <Toaster richColors />
                                                {userRole === "admin" && (
                                                <button class="bg-red-500 hover:drop-shadow-2xl text-white font-bold py-2 px-4 rounded shadow-xl hover:scale-125" onClick={() => { deleteReport(report.id); toast.error('Story has been deleted'); }}>
                                                    Delete
                                                </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                })}
        </main>
    )
}

export default IncidentReportPage;