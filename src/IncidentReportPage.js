import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const IncidentReportPage = (props) => {
    const [reports, setReports] = useState([]);
    const usersCollectionRef = collection(db, 'reports');
    const navigate = useNavigate();

    const deleteReport = async (id) => {
        const reportDoc = doc(db, "reports", id);
        await deleteDoc(reportDoc);
      };

    const updateReport = async (id, title, description, patrollerName, location, date, time, dateReport) => {
        const userDoc = doc(db, 'reports', id, title, description, patrollerName, location, date, time, dateReport);
        await updateDoc(userDoc);
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
        <main className="flex flex-col bg-zinc-200 min-h-screen">
            <div className="pt-10">
                <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10">Incident Report's</h1>
            </div>
            {reports.map((report) => { 
                return <div 
                            className="bg-white p-10 mb-10 ml-[25%] mr-[25%] rounded-lg shadow-xl shadow-gray-500"
                            key={report.id}
                            >
                    {" "}
                <div className="flex justify-between">
                    <h1 className="text-2xl mb-6 font-semibold underline underline-offset-8 decoration-1">{report.title}</h1>
                    <div className="flex items-end pb-4">
                    <h1 className="font-semibold mr-2">Date of report:</h1>
                    <h1>{report.dateReport}</h1>
                    </div>
                </div>
                <p className="mb-10">{report.description}</p>
                <div className="flex justify-between">
                    <div>
                        <div className="flex">
                            <h1 className="font-semibold mr-2">Patroller's name:</h1>
                            <h1>{report.patrollerName}</h1>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold mr-2">Location:</h1>
                            <h1>{report.location}</h1>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold mr-2">Date of incident:</h1>
                            <h1>{report.date}</h1>
                        </div>
                        <div className="flex">
                            <h1 className="font-semibold mr-2">Time of incident:</h1>
                            <h1>{report.time}</h1>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-xl "
                        onClick={updateReport}
                        >
                        Edit
                        </button>
                        <button 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-xl"
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