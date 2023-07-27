import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SkeletonReport from "../Skeletons/SkeletonReport";
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../index.css";

const IncidentReportPage = (props) => {
    const [reports, setReports] = useState([]);
    const reportsCollectionRef = collection(db, 'reports');
    const archivedReportsCollectionRef = collection(db, 'ArchivedReports');
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedReport, setSelectedReport] = useState(null);

    const navigate = useNavigate();

    const addReport = () => {
        navigate('../AddReport')
    }

    const moveReportsToArchived = async (reports) => {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const reportsToMove = reports.filter((report) => {
            const reportDate = new Date(report.dateReport);
            return reportDate < oneMonthAgo;
        });

        for (const report of reportsToMove) {
            const { id, ...reportData } = report;
            try {
                await addDoc(archivedReportsCollectionRef, reportData);
                const reportDocRef = doc(db, 'reports', id);
                await deleteDoc(reportDocRef);
            } catch (error) {
                console.error("Error moving report:", error);
            }
        }
    };

    const compareReportsByDate = (a, b) => {
        const dateA = new Date(a.dateReport);
        const dateB = new Date(b.dateReport);
        return dateB - dateA; // Sort in descending order (newest first)
    };

    useEffect(() => {
        const getReports = async () => {
            const reportData = await getDocs(reportsCollectionRef);
            setReports(reportData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setIsLoading(false);

            moveReportsToArchived(reports);
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
                <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-blue-700 mb-10 text-gray-800">Incident Report's</h1>
            </div>
            <div className="mx-auto max-w-screen-lg mb-5 lg:w-full lg:pl-16 lg:pr-16">
                <div className="flex flex-col md:flex-row justify-between lg:pl-3 lg:pr-3">
                    <div className="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md mb-3 md:mb-0 md:mr-3">
                        <button className="py-2 px-4 bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 rounded-l border-r border-gray-200 hover:bg-gray-700 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none">
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
                        className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 hover:drop-shadow-2xl text-zinc-200 font-bold py-2 px-4 rounded"
                        onClick={addReport}
                    >
                        Add Report
                    </button>
                </div>
            </div>
            <div className="lg:ml-[27.5%] lg:mr-[27.5%] ml-[10%] mr-[10%] mb-5">
                <p>All Incident report's are displayed here. Registered patroller's have access to all report's that are currently posted. To search for a report input either the name of the report, the patroller who created the report or the full date of when the report was created above, exp. (2023-03-24). Reports automatically get moved to archived reports after 1 month.</p>
            </div>
            {isLoading ? (
                <SkeletonReport />
            ) : reports.length === 0 ? (
                <p className="text-center text-2xl font-semibold">No Reports Currently Displayed</p>
            ) :
                // eslint-disable-next-line array-callback-return
                reports.filter((value) => {
                    if (searchTerm === "") {
                        return value;
                    } else if (
                        value.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        value.dateReport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        value.patrollerName.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                        return value;
                    }
                })
                .sort(compareReportsByDate)
                .map((report, index) => {
                    return <div class="flex flex-col items-center mb-3 lg:mr-[25%] lg:ml-[25%] md:ml-[4%] md:mr-[4%]">
                        <div class="w-full pr-10 pl-10">
                            <input type="checkbox" name="panel" id={`panel-${index + 1}`} class="hidden" />
                            <label for={`panel-${index + 1}`} class="relative block bg-gray-800  text-zinc-200 p-4 shadow-md accordion rounded-tl-lg rounded-tr-lg hover:bg-gray-700 font-semibold" onClick={() => setSelectedReport(report)}> <FontAwesomeIcon icon={faFileAlt} className="mr-4" />{report.title}</label>
                            {selectedReport?.id === report.id && (
                                <div class="accordion__content overflow-hidden bg-gray-100 transition duration-500 ease-in-out">
                                    <div class="bg-white p-5 md:p-10 rounded-br-lg rounded-bl-lg shadow-xl shadow-gray-500 border border-blue-800">
                                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                                            <h1 class="text-xl md:text-2xl mb-3 md:mb-6 font-semibold underline underline-offset-8 decoration-1 text-black text-center">{report.title}</h1>
                                            <div class="flex items-end pb-4 md:pb-0">
                                                <h1 class="font-semibold mr-2 text-black">Date of report:</h1>
                                                <h1>{report.dateReport}</h1>
                                            </div>
                                        </div>
                                        <p class="mb-5 md:mb-10 whitespace-pre-line">{report.description}</p>
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
                                                <div class="flex mb-2">
                                                    <h1 class="font-semibold mr-2 text-black">Referance number:</h1>
                                                    <h1>{report.policeNumber}</h1>
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