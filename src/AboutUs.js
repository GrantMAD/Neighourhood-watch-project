
const AboutUs = () => {

    return (
      <div class="bg-zinc-200 p-10">
        <h1 class="grid text-4xl place-content-center font-semibold mb-9 underline underline-offset-8">About us</h1>
            <div class="grid grid-cols-2">
                <div class="pr-[25%] pl-[25%] w-full">
                    <h1 class="grid text-2xl place-content-center font-semibold underline underline-offset-8 mb-10 mt-10">Our Vision</h1>
                    <p class="text-center mb-10">Our vision is a society where neighbours come together to help create a safer, stronger and active community.</p>
                    <h1 class="grid text-2xl place-content-center font-semibold underline underline-offset-8 mb-10">Our Mission</h1>
                    <p class="text-center mb-10">Our mission is to support and enable individuals and communities to be connected, active and safe, which increases wellbeing and minimises crime.</p>
                    <h1 class="grid text-2xl place-content-center font-semibold underline underline-offset-8 mb-10">Our Values</h1>
                    <p class="text-center mb-10">In all our work and relationships, we will be relevant, accountable and inclusive. We aspire to be: Neighbourly, We aspire to be good neighbours, Community focused, We bring people together, Inclusive, Proactive when possable, We are active within communities and we are relevant in today’s world, Trusted, We are dependable, caring, respectable, approachable and supportive, Collaborative, We work as a team, in partnerships with others and within our communities.</p>
                    <h1 class="grid text-2xl place-content-center font-semibold underline underline-offset-8 mb-10 mt-10">Our Objectives</h1>
                    <p class="text-center mb-10">Minimise the incidence of preventable crime, Deter criminal activity by increasing the probability of apprehension, Reduce the fear of crime, Increase the reporting of crime and suspicious behaviour, Improve the degree of personal and household security through education, Expand the program’s involvement in wider community safety and crime prevention initiatives,.</p>
                    <hr class="border-1.5 border-black"/>
                    <div class="flex justify-around mt-10">
                        <img class="w-10 h-10" src="/images/sponsor-1.png" alt=""></img>
                        <img class="w-10 h-10" src="/images/sponsor-2.png" alt=""></img>
                        <img class="w-10 h-10" src="/images/sponsor-3.png" alt=""></img>
                        <img class="w-10 h-10" src="/images/sponsor-4.png" alt=""></img>
                    </div>
                </div>
                <div>
                    <img class="w-full pl-10 mt-28" src="/images/ALPHAS-LOGO.png" alt=""></img>
                </div>
            </div>
      </div>
    )
}

export default AboutUs;