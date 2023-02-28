import { useState, useEffect } from "react"
import { db } from "./firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SkeletonStory from "./Skeletons/SkeletonStory";
import { Toaster, toast} from  'sonner';

const LandingPage = () => {
  const [storys, setStorys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getStorys = async () => {
      const usersCollectionRef = collection(db, 'storys');
      const storyData = await getDocs(usersCollectionRef);
      setStorys(storyData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };
    getStorys();
  }, [])

  const deleteReport = async (id) => {
    const storyDoc = doc(db, "storys", id);
    await deleteDoc(storyDoc);
    setStorys(storys.filter((story) => story.id !== id));
    setIsDeleted(!isDeleted);
  };

  const updateReport = async (id) => {
    navigate('/Dashboard')
  }

  const addStory = () => {
    navigate('/Dashboard')
  }

  const handleStoryClick = (story) => {
    navigate('/StoryPage', { state: { story: story } });
  }

  return (
    <main className="pt-10 pb-10 pr-60 pl-60 bg-zinc-200">
      <img
        alt=""
        src="/images/Seaview.PNG"
        className="w-screen shadow-xl shadow-gray-500 rounded-md"
      />
      <div className="mt-10 p-5 bg-gray-800 text-white rounded-md shadow-lg shadow-gray-500">
        <h1 className="text-5xl text-zinc-200 mb-3 font-semibold">WELCOME</h1>
        <hr></hr>
        <div className="flex flex-row">
          <div>
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
            className="h-1/4 w-1/4"
            alt=""
            src="/images/ALPHAS-LOGO.png"
          />
        </div>
      </div>
      <div className="mt-10 p-5 bg-gray-800 text-white rounded-md shadow-lg shadow-gray-500"
      >
        <div className="flex justify-between">
          <h1 className="text-5xl text-zinc-200 mb-3 font-semibold">NEWS</h1>
          <button
            className="bg-gray-800 hover:bg-gray-600 text-zinc-200 font-bold py-2 px-4 rounded mr-2 shadow-sm shadow-zinc-200 h-1/4 mt-1 border-2 border-zinc-200 hover:scale-125 ..."
            onClick={addStory}
          >
            Add Story
          </button>
        </div>
        {isLoading ? (
          <SkeletonStory />
        ) :
          storys.map((story) => {
            return <div key={story.id}>
              {" "}
              <hr></hr>
              <div className="mt-5">
                <h1 className="text-3xl text-zinc-200 mb-2 decoration-1 font-semibold">{story.storyTitle}</h1>
                <hr className="w-1/4"></hr>
                <div
                  className="flex flex-row"
                >
                  <p className="mt-5 mr-5 text-zinc-200">{story.contents.slice(0, 500) + "..."} <button className="text-blue-500 hover:text-blue-400 font-semibold" onClick={() => handleStoryClick(story)}>...Read More</button></p>
                  <img
                    className="max-h-xs max-w-xs mt-5 rounded-md border border-zinc-200 shadow-md shadow-black"
                    alt=""
                    src={story.image}
                  />
                </div>
                <div className="flex items-end mb-5 mt-5">
                  <button
                    className="bg-gray-800 hover:bg-gray-600 text-zinc-200 font-bold py-2 px-4 rounded mr-2 shadow-sm shadow-zinc-200 border-2 border-zinc-200 hover:scale-125 ..."
                    onClick={updateReport}
                  >
                    Edit
                  </button>
                  <Toaster richColors/>
                  <button
                    className="bg-gray-800 hover:bg-gray-600 text-zinc-200 font-bold py-2 px-4 rounded shadow-sm shadow-zinc-200 border-2 border-zinc-200 hover:scale-125 ..."
                    onClick={() => { 
                      deleteReport(story.id);
                        toast.error('Story has been deleted');  
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          })}
      </div>

    </main>
  )
}

export default LandingPage;