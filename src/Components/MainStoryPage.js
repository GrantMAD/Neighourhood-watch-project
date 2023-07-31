import { useState, useEffect, useRef } from "react"
import { db, auth } from "../firebase";
import { collection, getDocs, deleteDoc, doc, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { getStorage, deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import SkeletonStory from "../Skeletons/SkeletonStory";
import { formatDistanceToNow } from 'date-fns';
import { Toaster, toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const MainStoryPage = () => {
    const storage = getStorage();
    const navigate = useNavigate();
    const mainContainerRef = useRef(null);
    const [storys, setStorys] = useState([]);
    const [userRole, setUserRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [hoveredDeleteButtonId, setHoveredDeleteButtonId] = useState(null);
    const usersCollectionRef = collection(db, "users");

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

      useEffect(() => {
        const fetchStorys = async () => {
          const storyCollectionRef = collection(db, 'storys');
          const storyQuery = query(storyCollectionRef, orderBy('timestamp', 'desc'));
          const storyData = await getDocs(storyQuery);
          setStorys(storyData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setIsLoading(false);
        };
    
        fetchStorys();
      }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        mainContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    const deleteStory = async (id, imageRef) => {
        const storyDoc = doc(db, "storys", id);
        await deleteDoc(storyDoc);

        // Delete the story's image from storage
        const storageRef = ref(storage, imageRef);
        await deleteObject(storageRef);

        setStorys(storys.filter((story) => story.id !== id));
        setIsDeleted(!isDeleted);
    };

    const handleStoryClick = (story) => {
        navigate('/StoryPage', { state: { story: story } });
    }

    const addStory = () => {
        navigate('../AddStory')
    }

    const handleMouseEnter = (storyId) => {
        setHoveredDeleteButtonId(storyId);
    };

    const handleMouseLeave = () => {
        setHoveredDeleteButtonId(null);
    };

    const timeAgo = (timestamp) => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    };

    const handleWelcomeStoryClick = () => {
    navigate('/WelcomeStory');
  }

    const Content = `Introducing "The Neighbourhood Watch App" – your community's ultimate companion for safety, awareness, and unity. This user-friendly and innovative application empowers residents to come together and actively participate in safeguarding their neighborhood. Stay informed and up-to-date with the latest happenings in your community through the comprehensive news area. The app curates local news, events, and updates, ensuring that every member remains well-informed and connected to what matters most in their area.
  The gallery feature allows users to share and appreciate neighborhood highlights, promoting a sense of pride and camaraderie within the community. From breathtaking scenery to exciting local events, the gallery showcases the best moments that bring neighbors together.
  Registered members gain exclusive access to critical incident reports posted by patrollers, keeping everyone informed about any safety concerns or issues in real-time. By fostering an open channel for communication, residents can respond promptly to incidents, contributing to a safer environment for all.
  The "check-in" and "check-out" system enhances the app's functionality, allowing members to log their presence during neighborhood patrols or events. This feature helps coordinate efforts, ensuring that no corner of the community is overlooked and that everyone feels secure and protected.
  The members' page serves as a comprehensive directory, displaying essential details about each member within their sector. Easily connect with neighbors, foster friendships, and build a network of support in times of need.
  The Neighbourhood Watch App redefines community engagement, transforming neighbors into active guardians of their shared spaces. Together, we build a stronger, safer, and more tightly-knit community, making our neighborhood a place we are proud to call home. Join us today and be a part of this transformative movement.`;

  const limitedContent = Content.slice(0, 500);

    return (
        <main className="pt-20 pb-10 pr-10 md:pr-20 lg:pr-60 pl-10 md:pl-20 lg:pl-60 bg-zinc-200 min-h-screen"
            ref={mainContainerRef}>
            <div className="mt-10 p-5 bg-gray-800 text-white rounded-md shadow-lg shadow-gray-500">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-semibold mb-3">Stories</h1>
                    {userRole === "admin" && (
                        <button
                            className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 font-bold lg:py-2 lg:px-4 py-1 px-2 rounded mr-2 h-1/4 mt-2 lg:mt-1 hover:scale-105"
                            onClick={addStory}
                        >
                            Add Story
                        </button>
                    )}
                </div>
                {isLoading ? (
                    <SkeletonStory />
                ) : storys.length === 0 ? (
                    <div>
            <hr></hr>
            <div className="w-full mt-5">
              <h1 className="text-3xl text-zinc-200 mb-2 font-semibold underline underline-offset-4 decoration-2 decoration-blue-600">Neighbourhood Watch App</h1>
              <div className="flex flex-col md:flex-row mb-5">
                <div className="flex flex-col md:w-1/2 md:pr-5">
                  <p className="text-base mt-3 text-zinc-200">{limitedContent}<button className="text-blue-600 hover:text-blue-600 font-semibold" onClick={() => handleWelcomeStoryClick()}>...Read More</button></p>
                  <div className="flex mt-10">
                    {/*
                              <button
                                className="bg-gray-800 hover:bg-blue-500 text-zinc-200 font-bold py-2 px-4 rounded mr-2 shadow-sm shadow-blue-500 border-2 border-blue-500 hover:scale-125"
                                onClick={updateReport}
                              >
                                Edit
                              </button>
                            */}
                  </div>
                </div>
                <div className="flex justify-end md:w-1/2 mt-5 sm:ml-5">
                  <img
                    className="w-full bg-zinc-200 p-10 lg:max-h-[250px] lg:min-h-[250px] lg:object-cover md:object-contain md:float-left md:mr-5 lg:max-h-md lg:max-w-md rounded-md "
                    alt=""
                    src="/images/nwLogo.png"
                  />
                </div>
              </div>
            </div>
          </div>
                ) :
                    storys.map((story) => {
                        return <div key={story.id}>
                            {" "}
                            <hr></hr>
                            <div className="w-full mt-5">
                                <h1 className="text-3xl text-zinc-200 mb-2 decoration-1 font-semibold">{story.storyTitle}</h1>
                                <hr className="w-1/4"></hr>
                                <div className="flex flex-col md:flex-row mb-5">
                                    <div className="flex flex-col md:w-1/2 md:pr-5">
                                        <p className="text-base mt-3 text-zinc-200">{story.contents.slice(0, 500) + "..."} <button className="text-blue-600 hover:text-blue-600 font-semibold" onClick={() => handleStoryClick(story)}>...Read More</button></p>
                                        <p className="text-gray-500 text-sm mt-2"><FontAwesomeIcon icon={faClock} className="mr-1" /> {timeAgo(story.timestamp)} </p>
                                        {userRole === "admin" && (
                                            <div className="flex mt-10">
                                                {/*
                        <button
                          className="bg-gray-800 hover:bg-blue-500 text-zinc-200 font-bold py-2 px-4 rounded mr-2 shadow-sm shadow-blue-500 border-2 border-blue-500 hover:scale-125"
                          onClick={updateReport}
                        >
                          Edit
                        </button>
                    */}
                                                <Toaster richColors />
                                                <div>
                                                    <button
                                                        className="bg-gray-800 hover:bg-red-500 hover:border-red-700 text-zinc-200 font-bold py-2 px-4 rounded shadow-sm shadow-red-500 border-2 border-red-500 hover:scale-105"
                                                        onMouseEnter={() => handleMouseEnter(story.id)}
                                                        onMouseLeave={handleMouseLeave}
                                                        onClick={() => {
                                                            deleteStory(story.id, story.image);
                                                            toast.error('Story has been deleted');
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                    {hoveredDeleteButtonId === story.id && (
                                                        <div className="absolute bg-zinc-200 rounded-md px-2 py-1 mt-3 text-gray-800 border border-gray-800 whitespace-nowrap left-56 font-semibold">
                                                            By clicking Delete you will be deleting the selected story from the database.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-end md:w-1/2 mt-5 sm:ml-5">
                                        <img
                                            className="w-full max-h-[250px] min-h-[250px] lg:object-cover md:object-contain md:float-left md:mr-5 lg:max-h-md lg:max-w-md lg:border lg:border-zinc-200 rounded-md "
                                            alt=""
                                            src={story.image}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
            </div>

        </main>
    )
}

export default MainStoryPage;