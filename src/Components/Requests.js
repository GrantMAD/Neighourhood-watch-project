import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toaster, toast } from 'sonner';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [roadNamesArray, setRoadNamesArray] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            const requestsCollection = collection(db, "requests");
            const snapshot = await getDocs(requestsCollection);
            const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequests(requestsData);

            const roadNames = requestsData.map(request => request.roadNames);
            const roadNamesArray = roadNames.join(',').split(',').map(name => name.trim());
            setRoadNamesArray(roadNamesArray);
        };

        fetchRequests();
        setRefresh(false);
    }, [refresh]);


    const approveRequest = async () => {
        try {
            const sectorOptionsRef = doc(db, "SectorOptions", "kEbia4X43HuZk6d1FsBp");
            const sectorOptionsSnapshot = await getDoc(sectorOptionsRef);
            const sectorOptionsData = sectorOptionsSnapshot.data();

            const updatedNeighbourhoodOptions = [
                ...sectorOptionsData.NeighbourhoodOptions,
                selectedReport.neighbourhoodName
            ];

            await updateDoc(sectorOptionsRef, {
                NeighbourhoodOptions: updatedNeighbourhoodOptions
            });

            const requestRef = doc(db, "requests", selectedReport.id);
            await deleteDoc(requestRef);

            setRefresh(true);
            toast.success('Approved');
        } catch (error) {
            console.error("Error approving request:", error);
        }
    };

    const declineRequest = async (requestId) => {
        try {
            const requestRef = doc(db, "requests", requestId);
            await deleteDoc(requestRef);
            
            // Trigger a refresh of the data
            setRefresh(true);
    
            toast.success('Request declined');
        } catch (error) {
            console.error("Error declining request:", error);
        }
    };
    

    return (
        <div className="min-h-screen bg-zinc-200 md:p-10 lg:pt-24 lg:pb-24 lg:px-10">
            <div className="flex justify-center pt-20 md:pt-10">
                <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold underline underline-offset-8 decoration-2 decoration-gray-800">Requests</h1>
            </div>
            <p className="text-center mt-5">Requests below are from users for the addition of new neighborhoods to the Sector 2 group.</p>

            <div className="mt-5">
            {requests.length === 0 ? (
                    <p className="text-center lg:text-2xl md:text-2xl text-lg font-semibold">There are currently no requests</p>
                ) : (
                    requests.map((request, index) => (
                        <div class="flex flex-col items-center mb-3 lg:mr-[25%] lg:ml-[25%] md:ml-[4%] md:mr-[4%]">
                        <div class="w-full pr-10 pl-10">
                            <div key={request.id}>
                                <input type="checkbox" name="panel" id={`panel-${index + 1}`} class="hidden" />
                                <label
                                    for={`panel-${index + 1}`}
                                    class="relative block bg-gray-800  text-zinc-200 p-4 shadow-md accordion rounded-tl-lg rounded-tr-lg hover:bg-gray-700 font-semibold"
                                    onClick={() => {
                                        setSelectedReport(request);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faFileAlt} className="mr-4" />
                                    Neighbourhood addition request - {request.neighbourhoodName}
                                </label>
                                {selectedReport?.id === request.id && (
                                    <div class="accordion__content overflow-hidden bg-gray-100 transition duration-500 ease-in-out">
                                        <div class="bg-white p-5 md:p-10 rounded-br-lg rounded-bl-lg shadow-xl shadow-gray-500 border border-blue-800">
                                            <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                                                <h1 class="text-xl md:text-2xl mb-3 md:mb-5 font-semibold underline underline-offset-4 decoration-1 text-black text-center">{request.neighbourhoodName}</h1>
                                            </div>
                                            <div class="flex flex-col md:flex-row justify-between">
                                                <div class="mb-5 md:mb-0 md:mr-5">
                                                    <p><strong>{request.userName}</strong> has requested for the addition of <strong>{request.neighbourhoodName}</strong> to Sector 2</p>
                                                    <div>
                                                        <h1 className="mt-3 underline font-semibold">Road Name's</h1>
                                                        <p className="text-sm text-gray-600 mt-1">These are road names associated with the newly requested Neighbourhood addition</p>
                                                        <ul className="list-disc pl-4 mt-2">
                                                            {roadNamesArray.map((roadName, index) => (
                                                                <li key={index}>{roadName}</li>
                                                            ))}
                                                        </ul>
                                                        <div class="flex flex-col">
                                                            <h1 class="mt-3 underline font-semibold">Postal Code:</h1>
                                                            <h1>{request.postalCode}</h1>
                                                        </div>
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
                                            <div className="flex justify-end mt-5">
                                                <Toaster richColors />
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 hover:scale-105 hover:drop-shadow-2xl text-zinc-200 font-bold py-2 px-4 rounded mr-3"
                                                    onClick={() => declineRequest(request.id)}
                                                >
                                                    Decline
                                                </button>
                                                <button
                                                    className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 hover:drop-shadow-2xl text-zinc-200 font-bold py-2 px-4 rounded"
                                                    onClick={approveRequest}
                                                >
                                                    Approve
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Requests;
