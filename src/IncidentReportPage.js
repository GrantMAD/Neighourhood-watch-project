import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const IncidentReportPage = (props) => {
    const [reports, setReports] = useState([]);
    const usersCollectionRef = collection(db, 'reports');
    const navigate = useNavigate();

    const deleteReport = async (id) => {
        const reportDoc = doc(db, "reports", id);
        await deleteDoc(reportDoc);
      };

    const updateReport = async (id) => {
        navigate('/Dashboard')
    }

    

    useEffect(() => {
        const getReports = async () => {
            const reportData = await getDocs(usersCollectionRef);
            setReports(reportData.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };

        getReports();
    },)

    useEffect(() => {
        if (props.funcNav) {
          props.funcNav(true)
        }
      })
    

    return (
        <main class="flex flex-col bg-zinc-200 min-h-screen">
            <div class="pt-10">
                <h1 class="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1">Incident Report's</h1>
            </div>
            {reports.map((report) => { 
                return <div class="bg-white p-10 mt-10 ml-[25%] mr-[25%] rounded-lg shadow-xl">
                    {" "}
                <div class="flex justify-between">
                    <h1 class="text-2xl mb-6 font-semibold underline underline-offset-8 decoration-1">{report.title}</h1>
                    <div class="flex items-end pb-4">
                    <h1 class="font-semibold mr-2">Date of report:</h1>
                    <h1>{report.dateReport}</h1>
                    </div>
                </div>
                <p class="mb-10">{report.description}</p>
                <div class="flex justify-between">
                    <div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Patroller's name:</h1>
                            <h1>{report.patrollerName}</h1>
                        </div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Location:</h1>
                            <h1>{report.location}</h1>
                        </div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Date of incident:</h1>
                            <h1>{report.date}</h1>
                        </div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Time of incident:</h1>
                            <h1>{report.time}</h1>
                        </div>
                    </div>
                    <div class="flex items-end">
                        <button 
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-xl"
                        onClick={updateReport}
                        >
                        Edit
                        </button>
                        <button 
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-xl"
                        onClick={() => {deleteReport(report.id)}}
                        >
                        Delete
                        </button>
                    </div>
                </div>
            </div>
            })}
            
        </main>
    )
}

export default IncidentReportPage;