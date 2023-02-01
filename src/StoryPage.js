import { useLocation, useNavigate } from "react-router-dom";

const StoryPage = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const story = state.story;

  if (!story) {
    return null;
  }

  const returnToLanding = async (id) => {
    navigate('/LandingPage')
  }

  return (
    <main className="h-window pt-10 pb-10 pr-60 pl-60 bg-zinc-200">
      <div className="mt-10 mb-10 p-10 text-gray-800 rounded-md shadow-lg shadow-gray-500">
        <div className="flex justify-center">
          <h1 className="text-5xl mb-5 font-semibold text-gray-800">{story.storyTitle}</h1>
        </div>
        <div className="flex justify-center">
          <hr className="mb-10 border-gray-800 w-1/4"></hr>
        </div>
        <div className="flex flex-row">
          <p className="text-gray-800 whitespace-pre-line ...">{story.contents}</p>
          <img
            className="h-1/4 w-1/4 mt-5 mb-8 rounded-md shadow-lg shadow-gray-500 ml-5 hover:scale-150"
            alt=""
            src={story.image}
          />
        </div>
        <div className="pt-5 pb-10">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-xl float-right"
            onClick={returnToLanding}
          >
            Return 
          </button>
        </div>
      </div>
    </main>
  )
}

export default StoryPage;