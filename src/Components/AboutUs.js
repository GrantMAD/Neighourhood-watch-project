
const AboutUs = () => {

    return (
        <div className="bg-zinc-200 md:p-10 lg:p-24">
            <div className="flex justify-center pt-20 md:pt-10">
                <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold underline underline-offset-8 decoration-2 decoration-gray-800">About us</h1>
            </div>
            <div className="flex lg:flex-row md:flex-col flex-col px-[20%]">
                <div className="lg:w-1/2 md:w-full">
                    <h1 className="grid text-2xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-gray-800 mb-6 mt-10  text-gray-800">Our Vision</h1>
                    <p className="text-center mb-10">Our vision is a society where neighbours come together to help create a safer, stronger and active community.</p>
                    <h1 className="grid text-2xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-gray-800 mb-6  text-gray-800">Our Mission</h1>
                    <p className="text-center mb-10">Our mission is to support and enable individuals and communities to be connected, active and safe, which increases wellbeing and minimises crime.</p>
                    <h1 className="grid text-2xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-gray-800 mb-6  text-gray-800">Our Values</h1>
                    <p className="text-center mb-10">In all our work and relationships, we will be relevant, accountable and inclusive. We aspire to be: Neighbourly, We aspire to be good neighbours, Community focused, We bring people together, Inclusive, Proactive when possable, We are active within communities and we are relevant in today’s world, Trusted, We are dependable, caring, respectable, approachable and supportive, Collaborative, We work as a team, in partnerships with others and within our communities.</p>
                    <h1 className="grid text-2xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-gray-800 mb-6 mt-10  text-gray-800">Objectives</h1>
                    <p className="text-center mb-10">Minimise the incidence of preventable crime, Deter criminal activity by increasing the probability of apprehension, Reduce the fear of crime, Increase the reporting of crime and suspicious behaviour, Improve the degree of personal and household security through education, Expand the program’s involvement in wider community safety and crime prevention initiatives.</p>
                    {/*
                    <hr className="border-1.5 border-black" />
                    <div class="flex justify-around mt-10">
                        <img class="w-10 h-10" src="/images/sponsor-1.png" alt=""></img>
                        <img class="w-10 h-10" src="/images/sponsor-2.png" alt=""></img>
                        <img class="w-10 h-10" src="/images/sponsor-3.png" alt=""></img>
                        <img class="w-10 h-10" src="/images/sponsor-4.png" alt=""></img>
                    </div>
    */}
                </div>
                <div className="flex justify-center items-center lg:w-1/2">
                    <img className="pl-4 drop-shadow-2xl h-96 w-96 object-contain" src="/images/Sector-2-logo.png" alt=""></img>
                </div>
            </div>
            <div className="lg:block md:hidden hidden">
                <hr className="mx-auto border border-gray-800  mb-5 mt-5 w-2/4"></hr>
                <h1 className="text-center mb-8 text-3xl font-semibold underline underline-offset-8 decoration-2 decoration-gray-800 text-gray-800">Sector 2 Admin's</h1>
                <div className="flex justify-center">
                    <span className="mr-10">
                        <img
                            className="h-44 w-44 rounded-full border border-blue-600"
                            src="/images/profileAvatar.png"
                            alt="" />
                        <h1 className="mt-3 text-center text-lg font-semibold">Petros Mtambo</h1>
                        <h1 className="text-center text-gray-500">Chairman</h1>
                    </span>
                    <span className="mr-10">
                        <img
                            className="h-44 w-44 rounded-full border border-blue-600"
                            src="/images/Rohan.png"
                            alt="" />
                        <h1 className="mt-3 text-center text-lg font-semibold">Rohan Davidson</h1>
                        <h1 className="text-center text-gray-500">Vice Chairman</h1>
                    </span>
                    <span className="mr-10">
                        <img
                            className="h-44 w-44 rounded-full border border-blue-600"
                            src="/images/Brian-TREASURY.jpg"
                            alt="" />
                        <h1 className="mt-3 text-center text-lg font-semibold">Brain Cousins</h1>
                        <h1 className="text-center text-gray-500">Treasurer</h1>
                    </span>
                    <span className="mr-10">
                        <img
                            className="h-44 w-44 rounded-full border border-blue-600"
                            src="/images/Carey-DEPUTY SECRETARY.jpg"
                            alt="" />
                        <h1 className="mt-3 text-center text-lg font-semibold">Carey-Ann Potgieter</h1>
                        <h1 className="text-center text-gray-500">Deputy Treasurer</h1>
                    </span>
                    <span className="mr-10">
                        <img
                            className="h-44 w-44 rounded-full border border-blue-600"
                            src="/images/Kyara-SECRETARY.jpg"
                            alt="" />
                        <h1 className="mt-3 text-center text-lg font-semibold">Kyara Naicker</h1>
                        <h1 className="text-center text-gray-500">Secretary</h1>
                    </span>
                    <span className="mr-10">
                        <img
                            className="h-44 w-44 rounded-full border border-blue-600"
                            src="/images/Johann.jpg"
                            alt="" />
                        <h1 className="mt-3 text-center text-lg font-semibold">Johan Van Zyl</h1>
                        <h1 className="text-center text-gray-500">Executive</h1>
                    </span>
                    <span className="mr-10">
                        <img
                            className="h-44 w-44 rounded-full border border-blue-600"
                            src="/images/Trish.jpg"
                            alt="" />
                        <h1 className="mt-3 text-center text-lg font-semibold">Trish Du Plessis</h1>
                        <h1 className="text-center text-gray-500">Executive</h1>
                    </span>
                    <span className="mr-10">
                        <img
                            className="h-44 w-44 rounded-full border border-blue-600"
                            src="/images/Wendy.jpg"
                            alt="" />
                        <h1 className="mt-3 text-center text-lg font-semibold">Wendy Govender</h1>
                        <h1 className="text-center text-gray-500">PRO</h1>
                    </span>
                    <span className="mr-10">
                        <img
                            className="h-44 w-44 rounded-full border border-blue-600"
                            src="/images/BERYL-GOLDSTONE.jpg"
                            alt="" />
                        <h1 className="mt-3 text-center text-lg font-semibold">Beryl Goldstone</h1>
                        <h1 className="text-center text-gray-500">Executive</h1>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;