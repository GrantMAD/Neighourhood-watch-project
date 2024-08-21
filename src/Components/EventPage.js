import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { faCalendarDay, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventPage = (props) => {
  const navigate = useNavigate();
  const mainContainerRef = useRef(null);
  const location = useLocation();
  const event = location.state?.event;

  useEffect(() => {
    window.scrollTo(0, 0);
    mainContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const returnToLanding = async () => {
    navigate('/Events')
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex-container flex flex-col min-h-screen"
      ref={mainContainerRef}
    >
      <div className="flex-grow pt-10 pb-10 lg:pr-60 lg:pl-60 md:pr-20 md:pl-20 sm:pr-10 sm:pl-10 bg-zinc-200">
        <div className="flex flex-col mt-10 mb-10 p-10 text-zinc-200 rounded-md shadow-lg shadow-gray-500 bg-gray-800">
          <div className="flex justify-center mb-5">
            <h1 className="text-5xl mb-5 font-semibold text-zinc-200 underline underline-offset-4 decoration-3 decoration-blue-600">{event?.eventTitle}</h1>
          </div>
          <div>
            <img
              className="lg:h-2/5 lg:w-2/5 mt-2 mb-5 rounded-md ml-5 border-2 border-zinc-200 float-right"
              alt={event?.eventTitle}
              src={event?.image}
            />
            <div className="flex mb-3">
              <FontAwesomeIcon icon={faCalendarDay} className="mr-2 mt-1 text-blue-500" />
              <h1 className="text-md text-gray-400">{formatDate(event.eventStartDate)} - {formatDate(event.eventEndDate)}</h1>
            </div>
            <h1 className="text-2xl underline underline-offset-4 mb-2">Event Description</h1>
            <div className="flex mt-8">
            <FontAwesomeIcon icon={faFileAlt} className="mr-2 mt-1 text-blue-500" />
            <p className="text-zinc-200 whitespace-pre-line">{event?.contents}</p>
            </div>
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

export default EventPage;