import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SkeletonReport from "./Skeletons/SkeletonReport";
import "./index.css";

const IncidentReportPage = (props) => {
    const [reports, setReports] = useState([]);
    const usersCollectionRef = collection(db, 'reports');
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const deleteReport = async (id) => {
        const reportDoc = doc(db, "reports", id);
        await deleteDoc(reportDoc);
    };

    const updateReport = () => {
        navigate('/Dashboard')
    }

    const addReport = () => {
        navigate('/Dashboard')
      }

    useEffect(() => {
        const getReports = async () => {
            const reportData = await getDocs(usersCollectionRef);
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
            <div className="flex flex-row justify-between ml-[25%] mr-[25%] mb-5">
                <div
                    class="bg-gray-100 rounded border border-gray-800 flex items-center drop-shadow-md">
                    <button
                        class="py-2 px-4 bg-gray-800 text-zinc-200 rounded-l border-r border-gray-200 hover:bg-gray-700 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none ">
                        Search
                    </button>
                    <input
                        type="search"
                        placeholder="Report Name"
                        class="bg-transparent py-1 text-gray-600 px-4 focus:outline-gray-800 w-full border-none "
                        onChange={e => { setSearchTerm(e.target.value) }}
                    />
                </div>
                <button
                    className="bg-gray-800 hover:bg-gray-700 hover:drop-shadow-2xl text-zinc-200 font-bold py-2 px-4 rounded shadow-md shadow-gray-800 hover:scale-125 ..."
                    onClick={addReport}
                >
                    Add Report
                </button>
            </div>
            <div className="ml-[25%] mr-[25%] mb-5">
                <p>All incident report's are displayed here. Registered patroller's have access to all report's that are currently posted. To search for a report input the name of the report above. To add a new report click on the add report button.</p>
            </div>
            {isLoading ? (
                <SkeletonReport />
            ) :
                // eslint-disable-next-line array-callback-return
                reports.filter((value) => {
                    if (searchTerm === "") {
                        return value
                    } else if (value.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return value
                    }
                }).map((report,  index) => {
                    return <div class="flex flex-col items-center hover:scale-105 ...">
                        <div class="w-1/2 mb-3">
                            <input type="checkbox" name="panel" id={`panel-${index + 1}`} class="hidden" />
                            <label for={`panel-${index + 1}`} class="relative block bg-gray-800 text-zinc-200 p-4 shadow accordion rounded-tl-lg rounded-tr-lg">{report.title}</label>
                            <div class="accordion__content overflow-hidden bg-grey-lighter transition duration-500 ease-in-out">
                                <div
                                    className="bg-white p-10 mb-10 rounded-br-lg rounded-bl-lg shadow-xl shadow-gray-500 border border-gray-800"
                                    key={report.id}
                                >
                                    {" "}
                                    <div className="flex justify-between">
                                        <h1 className="text-2xl mb-6 font-semibold underline underline-offset-8 decoration-1 text-black">{report.title}</h1>
                                        <div className="flex items-end pb-4">
                                            <h1 className="font-semibold mr-2 text-black">Date of report:</h1>
                                            <h1>{report.dateReport}</h1>
                                        </div>
                                    </div>
                                    <p className="mb-10 whitespace-pre-line ...">{report.description}</p>
                                    <div className="flex justify-between">
                                        <div>
                                            <div className="flex">
                                                <h1 className="font-semibold mr-2 text-black">Patroller's name:</h1>
                                                <h1>{report.patrollerName}</h1>
                                            </div>
                                            <div className="flex">
                                                <h1 className="font-semibold mr-2 text-black">Location:</h1>
                                                <h1>{report.location}</h1>
                                            </div>
                                            <div className="flex">
                                                <h1 className="font-semibold mr-2 text-black">Date of incident:</h1>
                                                <h1>{report.date}</h1>
                                            </div>
                                            <div className="flex">
                                                <h1 className="font-semibold mr-2 text-black">Time of incident:</h1>
                                                <h1>{report.time}</h1>
                                            </div>
                                        </div>
                                        <div className="flex items-end">
                                            <button
                                                className="bg-gray-800 hover:bg-blue-700 hover:drop-shadow-2xl text-white font-bold py-2 px-4 rounded mr-2 shadow-xl "
                                                onClick={() => updateReport()}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-gray-800 hover:bg-red-700 hover:drop-shadow-2xl text-white font-bold py-2 px-4 rounded shadow-xl"
                                                onClick={() => { deleteReport(report.id) }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
        </main>
    )
}

export default IncidentReportPage;