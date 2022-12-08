import { useState, useEffect } from "react"
import { db } from "./firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [storys, setStorys] = useState([]);
  const usersCollectionRef = collection(db, 'storys');
  const navigate = useNavigate();
  
  useEffect(() => {
    const getStorys = async () => {
        const storyData = await getDocs(usersCollectionRef);
        setStorys(storyData.docs.map((doc) => ({...doc.data(), id: doc.id })));     
    };

    getStorys();
},)

const deleteReport = async (id) => {
  const storyDoc = doc(db, "storys", id);
  await deleteDoc(storyDoc);
};

const updateReport = async (id) => {
  navigate('/Dashboard')
}

const addStory = () => {
  navigate('/Dashboard')
}

    return (
      <main className="pt-10 pb-10 pr-60 pl-60 bg-zinc-200">
        <img 
          alt="" 
          src="/images/Seaview.PNG"
          className="w-screen shadow-xl shadow-gray-500 rounded-md"
          />
        <div className="mt-10 p-5 bg-gray-800 text-white rounded-md shadow-lg shadow-gray-500">
          <h1 className="text-5xl mb-3 font-semibold">WELCOME</h1>
          <hr></hr>
          <div className="flex flex-row">
            <div>
            <p className="mt-3 mb-3">Alpha's - Coedmore Sector 2 CPF Neighbourhood Watch is voluntary group of men & woman who work in conjunction with the SAPS in the eradication of crime. 
              Our neighbourhood Watch is about people getting together with their neighbours to take action to reduce crime.
              The community initiatives are owned and run by our members which are supported by the police.
              We work by developing a close relationship between community members and the local police.
            </p>
            <h1 className="text-lg font-semibold underline underline-offset-8 mb-3">How to join a Watch scheme</h1>
            <p>Go to the contact us tab and send us a message, for more information on how these schemes work the benefits of the schemes advice on running a scheme in your local
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
          <div className="mt-10 p-5 bg-gray-800 text-white rounded-md shadow-lg shadow-gray-500">
          <div className="flex justify-between">
            <h1 className="text-5xl mb-3 font-semibold">NEWS</h1>
            <button 
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-xl h-1/4 mt-1"
                        onClick={addStory}
                        >
                        Add Story
                        </button>
          </div>
          {storys.map((story) => {
            return <div key={story.id}>
              {" "}
              <hr></hr>
              <div className="mt-5">
                <h1 className="text-3xl underline underline-offset-8 decoration-1">{story.storyTitle}</h1>
                <div className="flex flex-row">
                  <p className="mt-5 mr-5">{story.contents}</p>
                  <img 
                    className="h-1/4 w-1/4 mt-5 rounded-md" 
                    alt="" 
                    src={story.image}
                  />
                </div>
                <div className="flex items-end mb-5">
                        <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-xl"
                        onClick={updateReport}
                        >
                        Edit
                        </button>
                        <button 
                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-xl"
                        onClick={() => {deleteReport(story.id)}}
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