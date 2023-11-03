import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import SkeletonStory from "../Skeletons/SkeletonStory";

const Events = () => {
    const storage = getStorage();
    const [events, setEvents] = useState([]);
    const [userRole, setUserRole] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const usersCollectionRef = collection(db, "users");
    const [hoveredDeleteButtonId, setHoveredDeleteButtonId] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsCollectionRef = collection(db, "events");
            const q = query(eventsCollectionRef);
            const snapshot = await getDocs(q);

            const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setEvents(eventsData);
            setIsLoading(false);
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userEmail = currentUser.email;
            const userRef = query(usersCollectionRef, where('email', '==', userEmail));
            const unsubscribe = onSnapshot(userRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    const userData = doc.data();
                    setUserRole(userData.role);
                });
            });

            // Cleanup the listener when the component unmounts
            return () => unsubscribe();
        }
    }, [usersCollectionRef]);

    const deleteEvent = async (id, imageRef) => {
        const eventDoc = doc(db, "events", id);
        await deleteDoc(eventDoc);

        // Delete the story's image from storage
        const storageRef = ref(storage, imageRef);
        await deleteObject(storageRef);

        setEvents(events.filter((event) => event.id !== id));
        setIsDeleted(!isDeleted);
    };

    const addEvent = () => {
        navigate('../AddEvent')
    }

    const handleEventClick = (event) => {
        navigate('/EventPage', { state: { event: event } });
    }

    const handleMouseEnter = (eventId) => {
        setHoveredDeleteButtonId(eventId);
    };

    const handleMouseLeave = () => {
        setHoveredDeleteButtonId(null);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

    return (
        <main className="pt-20 pb-10 pr-10 md:pr-20 lg:pr-60 pl-10 md:pl-20 lg:pl-60 bg-zinc-200 min-h-screen">
            <div className="mt-10 p-10 pt-6 bg-gray-800 text-white rounded-md shadow-lg shadow-gray-500">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-semibold mb-3">Events</h1>
                    {userRole === "admin" && (
                        <button
                            className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 font-bold lg:py-2 lg:px-4 py-1 px-2 rounded mr-2 h-1/4 mt-2 lg:mt-1 hover:scale-105"
                            onClick={addEvent}
                        >
                            Add Event
                        </button>
                    )}
                </div>
                <hr></hr>
                <div className="mt-8">
                    {isLoading ? (
                        // Show skeleton loader while loading
                        <SkeletonStory />
                    ) : events.length > 0 ? (
                        <ul className="w-full mt-5">
                            {events.map(event => (
                                <ul className="w-full mt-5">
                                {events.map(event => (
                                    <li
                                        className="flex md:flex-row flex-col justify-between mb-10"
                                        key={event.id}>
                                        <div className="w-full md:w-3/5">
                                            <h3 className="text-2xl text-zinc-200 mb-2 decoration-1 underline underline-offset-2 font-semibold">{event.eventTitle}</h3>
                                            <h1>{formatDate(event.eventStartDate)} - {formatDate(event.eventEndDate)}</h1>
                                            <p className="text-base mt-3 text-zinc-200">{event.contents} <button className="text-blue-600 hover:text-blue-600 font-semibold" onClick={() => handleEventClick(event)}>...Read More</button></p>
                                            <Toaster richColors />
                                            <div className="mt-5">
                                                <button
                                                    className="bg-gray-800 hover:bg-red-500 hover:border-red-700 text-zinc-200 font-bold py-2 px-4 rounded shadow-sm shadow-red-500 border-2 border-red-500 hover:scale-105"
                                                    onMouseEnter={() => handleMouseEnter(event.id)}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={() => {
                                                        deleteEvent(event.id, event.image);
                                                        toast.error('Event has been deleted');
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                                {hoveredDeleteButtonId === event.id && (
                                                    <div className="absolute bg-zinc-200 rounded-md px-2 py-1 mt-3 text-gray-800 border border-gray-800 whitespace-nowrap left-56 font-semibold">
                                                        By clicking Delete you will be deleting the selected event from the database.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-end w-full md:w-2/5 mt-5 sm:ml-5">
                                            <img
                                                src={event.image}
                                                alt={event.eventTitle}
                                                className="w-full lg:max-h-[250px] lg:min-h-[250px] lg:object-cover md:object-contain md:float-left md:mr-5 lg:max-h-md lg:max-w-md rounded-md lg:border"
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-5 mb-5 text-xl">Currently no events scheduled</p>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Events;