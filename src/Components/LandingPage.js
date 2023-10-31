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

  const handleWelcomeStoryClick = () => {
    navigate('/WelcomeStory');
  }

  const handleContactPage = () => {
    navigate('/ContactPage');
  }

  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const Content = `Introducing "The Neighbourhood Watch App" – your community's ultimate companion for safety, awareness, and unity, currently in beta. This user-friendly and innovative application empowers residents to come together and actively participate in safeguarding their neighborhood. Stay informed and up-to-date with the latest happenings in your community through the comprehensive news area. The app curates local news, events, and updates, ensuring that every member remains well-informed and connected to what matters most in their area.
  The gallery feature allows users to share and appreciate neighborhood highlights, promoting a sense of pride and camaraderie within the community. From breathtaking scenery to exciting local events, the gallery showcases the best moments that bring neighbors together.
  Registered members gain exclusive access to critical incident reports posted by patrollers, keeping everyone informed about any safety concerns or issues in real-time. By fostering an open channel for communication, residents can respond promptly to incidents, contributing to a safer environment for all.
  The "check-in" and "check-out" system enhances the app's functionality, allowing members to log their presence during neighborhood patrols or events. This feature helps coordinate efforts, ensuring that no corner of the community is overlooked and that everyone feels secure and protected.
  The members' page serves as a comprehensive directory, displaying essential details about each member within their sector. Easily connect with neighbors, foster friendships, and build a network of support in times of need.
  The Neighbourhood Watch App redefines community engagement, transforming neighbors into active guardians of their shared spaces. Together, we build a stronger, safer, and more tightly-knit community, making our neighborhood a place we are proud to call home. Join us today and be a part of this transformative movement.`;

  const limitedContent = Content.slice(0, 500);

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
          <div className="sm:w-1/2 md:w-full">
            <p className="mt-3 mb-3 text-zinc-200">Sector 2 is an area that starts from Bellair down through Seaview and into Rossburgh.
              It has what we call neighbourhood Watch groups of which are a voluntary group of men & woman who work in conjunction with SAPS
              and security companies in the eradication of crime. The neighbourhood Watch groups are about people getting together with their
              neighbours to take action to help reduce crime and form Neighbourhood Watch groups from with in the Sector 2 Area
              The community initiatives are owned and run by our members which are supported by the police.
              The Sector 2 Exco Member's work together by developing a close relationship between community members, Neighbourhood Watch groups, Security Companies and the local police.
            </p>
            <div className="pt-5">
              <h1 className="text-3xl font-semibold underline underline-offset-8 mb-3 decoration-1 decoration-zinc-200 text-zinc-200">Contact Us</h1>
              <p className="text-zinc-200 mb-3">To find out more information on how these groups work and the benefits of creating a group in your road or your local sector click on the contact us button and send us a message.
              </p>
              <div>
                <button
                  className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 text-zinc-200 font-bold lg:py-2 lg:px-4 py-1 px-2 rounded mr-2 h-1/4 mt-2 lg:mt-1"
                  onClick={handleContactPage}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
          <img
            className="h-1/4 w-1/4 md:w-1/4 md:h-1/4 py-2 px-3 lg:flex hidden"
            alt=""
            src="/images/Sector-2-logo.png"
          />
        </div>
      </div>
      <div className="mt-10 p-5 bg-gray-800 text-white rounded-md shadow-lg shadow-gray-500 w-full">
        <div className="flex justify-between">
          <h1 className="text-5xl text-zinc-200 mb-3 font-semibold">EVENTS</h1>
          {userRole === "admin" && (
            <button
              className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 text-zinc-200 font-bold lg:py-2 lg:px-4 py-1 px-2 rounded mr-2 h-1/4 mt-2 lg:mt-1"
              onClick={addStory}
            >
              Add Event
            </button>
          )}
        </div>
        <hr className="mb-5"></hr>
        <h1 className="text-2xl font-semibold underline underline-offset-8 mb-3 decoration-1 decoration-zinc-200 text-zinc-200">Ongoing events</h1>
        <div className="flex flex-row">
          <div className="text-center my-5 mx-10">
            <img
              className="lg:h-52  border border-blue-600 rounded-md"
              alt=""
              src="/images/Seaview.PNG"
            />
            <h1 className="font-semibold text-lg mt-3">This is the Event title.</h1>
          </div>
          <div className="text-center my-5 mx-10">
            <img
              className="lg:h-52 border border-blue-600 rounded-md"
              alt=""
              src="/images/Seaview.PNG"
            />
            <h1 className="font-semibold text-lg mt-3">This is the Event title.</h1>
          </div>
          <div className="text-center my-5 mx-10">
            <img
              className="lg:h-52 border border-blue-600 rounded-md"
              alt=""
              src="/images/Seaview.PNG"
            />
            <h1 className="font-semibold text-lg mt-3">This is the Event title.</h1>
          </div>
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
          <div>
            <hr></hr>
            <div className="w-full mt-5">
              <h1 className="text-3xl text-zinc-200 mb-1 font-semibold underline underline-offset-4 decoration-1 decoration-zinc-200">Neighbourhood Watch App</h1>
              <div className="flex lg:flex-row md:flex-col flex-col mb-5">
                <div className="flex flex-col lg:w-1/2 md:pr-5">
                  <p className="text-base mt-5 text-zinc-200">{limitedContent}<button className="text-blue-600 hover:text-blue-600 font-semibold" onClick={() => handleWelcomeStoryClick()}>...Read More</button></p>
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
                <div className="flex lg:justify-end md:justify-center lg:w-1/2 mt-5 sm:ml-5">
                  <img
                    className="lg:w-full md:w-3/4 bg-zinc-200 lg:max-h-[250px] lg:min-h-[250px] lg:object-cover md:object-contain md:float-left md:mr-5 lg:max-h-md lg:max-w-md lg:border-2 lg:border-blue-600 rounded-md p-10"
                    alt=""
                    src="/images/nwLogo.png"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {storys.slice(0, 3).map((story) => {
              return (
                <div key={story.id}>
                  {" "}
                  <hr></hr>
                  <div className="w-full mt-5">
                    <h1 className="text-3xl text-zinc-200 mb-1 font-semibold underline underline-offset-4 decoration-1 decoration-blue-600">{story.storyTitle}</h1>
                    <div className="flex lg:flex-row md:flex-col flex-col mb-5">
                      <div className="flex flex-col lg:w-1/2 md:pr-5">
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
                      <div className="flex lg:justify-end md:justify-center lg:w-1/2 mt-5 sm:ml-5">
                        <img
                          className="lg:w-full md:w-3/4 lg:max-h-[250px] lg:min-h-[250px] md:max-h-[250px] lg:object-cover md:mr-5 lg:max-h-md lg:max-w-md lg:border-2 lg:border-zinc-200 rounded-md "
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
