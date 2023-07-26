import { useLocation, useNavigate } from "react-router-dom";

const StoryPage = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const story = state.story;

  if (!story) {
    return null;
  }

  const returnToLanding = async () => {
    navigate('/MainStoryPage')
  }

  return (
    <div className="flex-container flex flex-col min-h-screen">
      <div className="flex-grow pt-10 pb-10 lg:pr-60 lg:pl-60 md:pr-20 md:pl-20 sm:pr-10 sm:pl-10 bg-zinc-200">
        <div className="flex flex-col mt-10 mb-10 p-10 text-zinc-200 rounded-md shadow-lg shadow-gray-500 bg-gray-800">
          <div className="flex justify-center mb-5">
            <h1 className="text-5xl mb-5 font-semibold text-zinc-200 underline underline-offset-8 decoration-2 decoration-white">{story.storyTitle}</h1>
          </div>
          <div>
            <img
              className="lg:h-2/5 lg:w-2/5 mt-2 mb-5 rounded-md ml-5 border-2 border-zinc-200 float-right"
              alt=""
              src={story.image}
            />
            <p className="text-zinc-200 whitespace-pre-line">{story.contents}</p>
          </div>
          <div className="pt-5 pb-2">
            <button
              className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 font-bold py-2 px-4 rounded mr-2 float-right hover:scale-105"
              onClick={returnToLanding}
            >
              Return
            </button>
            
          </div>
        </div>
      </div>
    </div>

  )
}

export default StoryPage;