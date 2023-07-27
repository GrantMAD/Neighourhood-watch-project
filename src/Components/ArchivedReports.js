import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore";
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SkeletonReport from "../Skeletons/SkeletonReport";
import "../index.css";
import { Toaster, toast } from 'sonner';

const ArchivedReports = (props) => {
    const [ArchivedReports, setArchivedReports] = useState([]);
    const usersCollectionRef = collection(db, 'users');
    const ArchivedReportsCollectionRef = collection(db, 'ArchivedReports');
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [userRole, setUserRole] = useState("");

    const deleteReport = async (id) => {
        const reportDoc = doc(db, "reports", id);
        await deleteDoc(reportDoc);
        setIsDeleted(!isDeleted);
        setArchivedReports(ArchivedReports.filter((report) => report.id !== id));
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

    useEffect(() => {
        const getReports = async () => {
            const reportData = await getDocs(ArchivedReportsCollectionRef);
            setArchivedReports(reportData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
                <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-blue-700 mb-10 text-gray-800 text-center">Archived Incident Report's</h1>
            </div>
            <div className="mx-auto max-w-screen-lg mb-3 lg:w-full lg:pl-16">
                <div className="flex flex-col md:flex-row justify-between lg:pl-3 lg:pr-3">
                    <div className="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md mb-3 md:mb-0 md:mr-3">
                        <button className="py-2 px-4 bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 rounded-l border-r border-gray-200 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none ">
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
                </div>
            </div>
            <div className="lg:ml-[27.5%] lg:mr-[27.5%] ml-[10%] mr-[10%] mb-5">
                <p>These reports are a month or more old and are automatically moved here to archived reports. You may search for report's in the search bar using the title, the date it was posted (2023-03-24) or the patroller's name who posted it.</p>
            </div>
            {isLoading ? (
                <SkeletonReport />
            ) : ArchivedReports.length === 0 ? (
                <p className="text-center text-2xl font-semibold">No Reports Currently Displayed</p>
            ) : 
                // eslint-disable-next-line array-callback-return
                ArchivedReports.filter((value) => {
                    if (searchTerm === "") {
                      return value;
                    } else if (
                      value.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      value.dateReport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      value.patrollerName.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return value;
                    }
                  }).map((ArchivedReport, index) => {
                    return <div class="flex flex-col items-center mb-3 lg:mr-[25%] lg:ml-[25%] md:ml-[4%] md:mr-[4%]">
                        <div class="w-full pr-10 pl-10">
                            <input type="checkbox" name="panel" id={`panel-${index + 1}`} class="hidden" />
                            <label for={`panel-${index + 1}`} class="relative block bg-gray-800 text-zinc-200 p-4 shadow accordion rounded-tl-lg rounded-tr-lg hover:bg-gray-700 font-semibold" onClick={() => setSelectedReport(ArchivedReport)}><FontAwesomeIcon icon={faFileAlt} className="mr-4" />{ArchivedReport.title}</label>
                            {selectedReport?.id === ArchivedReport.id && (
                                <div class="accordion__content overflow-hidden bg-gray-100 transition duration-500 ease-in-out">
                                    <div class="bg-white p-5 md:p-10 rounded-br-lg rounded-bl-lg shadow-xl shadow-gray-500 border border-gray-800">
                                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                                            <h1 class="text-xl md:text-2xl mb-3 md:mb-6 font-semibold underline underline-offset-8 decoration-1 text-black text-center">{ArchivedReport.title}</h1>
                                            <div class="flex items-end pb-4 md:pb-0">
                                                <h1 class="font-semibold mr-2 text-black">Date of report:</h1>
                                                <h1>{ArchivedReport.dateReport}</h1>
                                            </div>
                                        </div>
                                        <p class="mb-5 md:mb-10 whitespace-pre-line ...">{ArchivedReport.description}</p>
                                        <div class="flex flex-col md:flex-row justify-between">
                                            <div class="mb-5 md:mb-0 md:mr-5">
                                                <div class="flex mb-2">
                                                    <h1 class="font-semibold mr-2 text-black">Patroller's name:</h1>
                                                    <h1>{ArchivedReport.patrollerName}</h1>
                                                </div>
                                                <div class="flex mb-2">
                                                    <h1 class="font-semibold mr-2 text-black">Location:</h1>
                                                    <h1>{ArchivedReport.location}</h1>
                                                </div>
                                                <div class="flex mb-2">
                                                    <h1 class="font-semibold mr-2 text-black">Date of incident:</h1>
                                                    <h1>{ArchivedReport.date}</h1>
                                                </div>
                                                <div class="flex">
                                                    <h1 class="font-semibold mr-2 text-black">Time of incident:</h1>
                                                    <h1>{ArchivedReport.time}</h1>
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
                                                <button class="bg-red-500 hover:drop-shadow-2xl text-white font-bold py-2 px-4 rounded shadow-xl hover:scale-105 border border-red-700" onClick={() => { deleteReport(ArchivedReport.id); toast.error('Story has been deleted'); }}>
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

export default ArchivedReports;