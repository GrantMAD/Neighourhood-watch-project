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
    <main className="h-screen pt-10 pb-10 lg:pr-60 lg:pl-60 md:pr-20 md:pl-20 sm:pr-10 sm:pl-10 bg-zinc-200">
      <div className="flex flex-col mt-10 mb-10 p-10 text-zinc-200 rounded-md shadow-lg shadow-gray-500 bg-gray-800">
        <div className="flex justify-center">
          <h1 className="text-5xl mb-5 font-semibold text-zinc-200 underline underline-offset-8">{story.storyTitle}</h1>
        </div>
        <div className="flex justify-center">
          <hr className="mb-10 border-gray-800 w-1/4"></hr>
        </div>
        <div>
        <img
            className="lg:h-1/4 lg:w-1/4 mt-2 mb-5 rounded-md ml-5 hover:scale-150 border-2 border-zinc-200 float-right"
            alt=""
            src={story.image}
          />
          <p className="text-zinc-200 whitespace-pre-line">{story.contents}</p>
        </div>
        <div className="pt-5 pb-2">
          <button
            className="bg-blue-600 text-zinc-200 font-bold py-2 px-4 rounded mr-2 float-right hover:scale-125"
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