import { useState } from "react"
import { db } from "../firebase";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

const AddNeighbourhoodRequest = () => {
    const [userName, setUserName] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [postalCode, setPostalCode] = useState();
    const [neighbourhoodName, setNeighbourhoodName] = useState();
    const [roadNames, setRoadNames] = useState();
    const usersCollecctionRef = collection(db, "requests");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const roadNamesArray = roadNames.split(',').map(name => name.trim());
    
        try {
            await addDoc(usersCollecctionRef, {
                userName: userName,
                contactNumber: contactNumber,
                postalCode: postalCode,
                neighbourhoodName: neighbourhoodName,
                roadNames: roadNamesArray
            });
    
            setUserName("");
            setContactNumber("");
            setPostalCode("");
            setNeighbourhoodName("");
            setRoadNames("");
    
            // Create a notification for admins
            const auth = getAuth();
            const user = auth.currentUser;
            const notificationsCollectionRef = collection(db, "notifications");
    
            if (user && user.uid) {
                const notificationDocRef = await addDoc(notificationsCollectionRef, {
                    title: "New Neighbourhood Request",
                    message: `${userName} has submitted a new neighbourhood request.`,
                    createdAt: new Date(),
                    createdBy: user.uid,
                    role: "admin",
                    type: 'neighbourhoodRequest'
                });
    
                const notificationId = notificationDocRef.id;
                console.log("New notification ID:", notificationId);
    
                await updateDoc(notificationDocRef, { notificationId });
            }
    
            toast.success('Request sent!');
            navigate('/ProfilePage');
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };
    

    return (
        <div className="min-h-screen bg-zinc-200 md:p-10 lg:pt-24 lg:pb-24 lg:px-10">
            <div className="flex justify-center pt-20 md:pt-10">
                <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold underline underline-offset-8 decoration-2 decoration-gray-800">Neighbourhood Request</h1>
            </div>
            <div className="mt-10">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Request</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Here you can request for your neighbourhood to be added to the Sector 2 group. Please fill in all of the input's as all of the information will be required to verify and approve the addtion of your neighbourhood to Sector 2. An Admin will contact the member or owner registering the neighbourhood by phone. Once an admin is able to verify all of the information your neighbourhood will be added to the list.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <div className="bg-white">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="UserName" className="block text-sm font-medium text-gray-700 after:content-none">
                                                    User Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="UserName"
                                                    id="UserName"
                                                    autoComplete="UserName"
                                                    className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                    value={userName}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="ContactNumber" className="block text-sm font-medium text-gray-700 after:content-none">
                                                    Contact number
                                                </label>
                                                <input
                                                    type="number"
                                                    name="ContactNumber"
                                                    id="ContactNumber"
                                                    autoComplete="ContactNumber"
                                                    className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                    value={contactNumber}
                                                    onChange={(e) => setContactNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="PostalCode" className="block text-sm font-medium text-gray-700 after:content-none">
                                                    Postal code of Area
                                                </label>
                                                <input
                                                    type="number"
                                                    name="number"
                                                    id="number"
                                                    autoComplete="number"
                                                    className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                    value={postalCode}
                                                    onChange={(e) => setPostalCode(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="NeighbourhoodName" className="block text-sm font-medium text-gray-700 after:content-none">
                                                    Neighbourhood Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="NeighbourhoodName"
                                                    id="NeighbourhoodName"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                    value={neighbourhoodName}
                                                    onChange={(e) => setNeighbourhoodName(e.target.value)}
                                                />
                                                <p className="text-gray-500 text-sm mt-1">Add the Neighbourhood name you would like to add to Sector 2</p>
                                            </div>
                                            <div className="col-span-6 sm:col-span-4">
                                                <div className="mb-3 xl:w-96">
                                                    <label htmlFor="RoadNames" className="block text-sm font-medium text-gray-700 after:content-none">Road names to be covered</label>
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
                                mt-1
                            "
                                                        id="RoadNames"
                                                        rows="5"
                                                        placeholder="Ballarat Road, Unit Avenue, Armadale Road"
                                                        value={roadNames}
                                                        onChange={(e) => setRoadNames(e.target.value)}
                                                    ></textarea>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <Toaster richColors />
                                    <button
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={handleSubmit}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddNeighbourhoodRequest;