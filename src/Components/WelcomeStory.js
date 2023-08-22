import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const WelcomeStory = () => {
    const navigate = useNavigate();
    const mainContainerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        mainContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    const returnToLanding = async () => {
        navigate('/LandingPage')
    }

    return (
        <div className="flex-container flex flex-col min-h-screen"
            ref={mainContainerRef}
        >
            <div className="flex-grow pt-10 pb-10 lg:pr-60 lg:pl-60 md:pr-20 md:pl-20 sm:pr-10 sm:pl-10 bg-zinc-200">
                <div className="flex flex-col mt-10 mb-10 p-10 text-zinc-200 rounded-md shadow-lg shadow-gray-500 bg-gray-800">
                    <div className="flex justify-center mb-5">
                        <h1 className="text-5xl mb-5 font-semibold text-zinc-200 underline underline-offset-4 decoration-2 decoration-zinc-200 md:text-center text-center">Neighbourhood Watch App</h1>
                    </div>
                    <div>
                        <img
                            className="lg:h-2/5 lg:w-2/5 mt-2 mb-5 rounded-md ml-5 p-10 bg-zinc-200 float-right border-2 border-blue-800"
                            alt=""
                            src="/images/nwLogo.png"
                        />
                        <div>
                        <p className="text-zinc-200 ">Introducing "The Neighbourhood Watch App" – your community's ultimate companion for safety, awareness, and unity, currently in beta. This user-friendly and innovative application empowers residents to come together and actively participate in safeguarding their neighbourhood.</p>
                        <p className="text-zinc-200 mt-3">Stay informed and up-to-date with the latest happenings in your community through the comprehensive news area. The app curates local news, events, and updates, ensuring that every member remains well-informed and connected to what matters most in their area.</p>
                        <p className="text-zinc-200 mt-3">The gallery feature allows users to share and appreciate neighbourhood highlights, promoting a sense of pride and camaraderie within the community. From breathtaking scenery to exciting local events, the gallery showcases the best moments that bring neighbours together.</p>
                        <p className="text-zinc-200 mt-3">Registered members gain exclusive access to critical incident reports posted by patrollers, keeping everyone informed about any safety concerns or issues in real-time. By fostering an open channel for communication, residents can respond promptly to incidents, contributing to a safer environment for all.</p>
                        <p className="text-zinc-200 mt-3">The "check-in" and "check-out" system enhances the app's functionality, allowing members to log their presence during neighbourhood patrols or events. This feature helps coordinate efforts, ensuring that no corner of the community is overlooked and that everyone feels secure and protected.</p>
                        <p className="text-zinc-200 mt-3">The members' page serves as a comprehensive directory, displaying essential details about each member within their sector. Easily connect with neighbours, foster friendships, and build a network of support in times of need.</p>
                        <p className="text-zinc-200 mt-3">The Neighbourhood Watch App redefines community engagement, transforming neighbours into active guardians of their shared spaces. Together, we build a stronger, safer, and more tightly-knit community, making our neighbourhood a place we are proud to call home. Join us today and be a part of this transformative movement.</p>
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

export default WelcomeStory;