import { useState, useEffect } from "react"
import { db, auth } from "../firebase";
import { collection, getDocs, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from "react-router-dom";
import SkeletonStory from "../Skeletons/SkeletonStory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
  const [storys, setStorys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();

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

  const addStory = () => {
    navigate('../AddStory')
  }

  const handleStoryClick = (story) => {
    navigate('/StoryPage', { state: { story: story } });
  }

  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <main className="pt-20 pb-10 pr-10 md:pr-20 lg:pr-60 pl-10 md:pl-20 lg:pl-60 bg-zinc-200">
      <img
        alt=""
        src="/images/Seaview.PNG"
        className="w-full shadow-xl shadow-gray-500 rounded-md"
      />
      <div className="mt-10 p-5 bg-gray-800 text-white rounded-md shadow-lg shadow-gray-500 w-full">
        <h1 className="text-5xl text-zinc-200 mb-3 font-semibold">WELCOME</h1>
        <hr></hr>
        <div className="flex flex-col md:flex-row">
          <div className="sm:w-1/2 md:w-3/4">
            <p className="mt-3 mb-3 text-zinc-200">Alpha's - Coedmore Sector 2 CPF Neighbourhood Watch is voluntary group of men & woman who work in conjunction with the SAPS in the eradication of crime.
              Our neighbourhood Watch is about people getting together with their neighbours to take action to reduce crime.
              The community initiatives are owned and run by our members which are supported by the police.
              We work by developing a close relationship between community members and the local police.
            </p>
            <h1 className="text-lg font-semibold underline underline-offset-8 mb-3 text-zinc-200">How to join a Watch scheme</h1>
            <p className="text-zinc-200">Go to the contact us tab and send us a message, for more information on how these schemes work the benefits of the schemes advice on running a scheme in your local
              area.
            </p>
          </div>
          <img
            className="h-1/4 w-1/4 md:w-1/4 md:h-1/4 py-2 px-3"
            alt=""
            src="/images/Sector-2-logo.png"
          />
        </div>
      </div>
      <div className="mt-10 p-5 bg-gray-800 text-white rounded-md shadow-lg shadow-gray-500">
        <div className="flex justify-between">
          <h1 className="text-5xl text-zinc-200 mb-3 font-semibold">NEWS</h1>
          {userRole === "admin" && (
            <button
              className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 text-zinc-200 font-bold lg:py-2 lg:px-4 py-1 px-2 rounded mr-2 h-1/4 mt-2 lg:mt-1"
              onClick={addStory}
            >
              Add Story
            </button>
          )}
        </div>
        {isLoading ? (
          <SkeletonStory />
        ) : storys.length === 0 ? (
          <p className="text-zinc-200 text-2xl">No Stories currently</p>
        ) : (
          <>
            {storys.slice(0, 3).map((story) => {
              return (
                <div key={story.id}>
                  {" "}
                  <hr></hr>
                  <div className="w-full mt-5">
                    <h1 className="text-3xl text-zinc-200 mb-2 decoration-1 font-semibold">{story.storyTitle}</h1>
                    <hr className="w-1/4"></hr>
                    <div className="flex flex-col md:flex-row mb-5">
                      <div className="flex flex-col md:w-1/2 md:pr-5">
                        <p className="text-base mt-5 text-zinc-200">{story.contents.slice(0, 500) + "..."} <button className="text-blue-600 hover:text-blue-600 font-semibold" onClick={() => handleStoryClick(story)}>...Read More</button></p>
                        <p className="text-gray-500 text-sm mt-2"><FontAwesomeIcon icon={faClock} className="mr-1" /> {timeAgo(story.timestamp)} </p>
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
                          className="w-full lg:max-h-[250px] lg:min-h-[250px] lg:object-cover md:object-contain md:float-left md:mr-5 lg:max-h-md lg:max-w-md lg:border lg:border-zinc-200 rounded-md "
                          alt=""
                          src={story.image}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-center">
              <button
                className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 text-zinc-200 font-bold lg:py-2 lg:px-4 py-1 px-2 rounded mr-2 h-1/4 mt-2 lg:mt-1"
                onClick={() => navigate('/MainStoryPage')}
              >
                View All Stories
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default LandingPage;
