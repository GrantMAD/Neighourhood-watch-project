
const AboutUs = () => {

    return (
        <div className="bg-zinc-200 md:p-10 lg:p-24">
           <div className="grid pt-20 md:pt-5 place-content-center">
                <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold underline underline-offset-8 decoration-1">About us</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="pr-[25%] pl-[25%] w-full">
                    <h1 className="grid text-2xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10 mt-10  text-blue-800">Our Vision</h1>
                    <p className="text-center mb-10">Our vision is a society where neighbours come together to help create a safer, stronger and active community.</p>
                    <h1 className="grid text-2xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10 text-blue-800">Our Mission</h1>
                    <p className="text-center mb-10">Our mission is to support and enable individuals and communities to be connected, active and safe, which increases wellbeing and minimises crime.</p>
                    <h1 className="grid text-2xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10 text-blue-800">Our Values</h1>
                    <p className="text-center mb-10">In all our work and relationships, we will be relevant, accountable and inclusive. We aspire to be: Neighbourly, We aspire to be good neighbours, Community focused, We bring people together, Inclusive, Proactive when possable, We are active within communities and we are relevant in today’s world, Trusted, We are dependable, caring, respectable, approachable and supportive, Collaborative, We work as a team, in partnerships with others and within our communities.</p>
                    <h1 className="grid text-2xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10 mt-10 text-blue-800">Objectives</h1>
                    <p className="text-center mb-10">Minimise the incidence of preventable crime, Deter criminal activity by increasing the probability of apprehension, Reduce the fear of crime, Increase the reporting of crime and suspicious behaviour, Improve the degree of personal and household security through education, Expand the program’s involvement in wider community safety and crime prevention initiatives,.</p>
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
                <div className="md:mt-10">
                    <img className="pl-4 md:mt-28 drop-shadow-2xl" src="/images/ALPHAS-LOGO.png" alt=""></img>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;