
const AboutUs = () => {

    return (
      <div class="h-screen bg-zinc-200 p-20">
        <h1 class="grid text-4xl place-content-center font-semibold mb-9 underline underline-offset-8">About us</h1>
            <div class="grid grid-cols-2">
                <div class="pr-[25%] pl-[25%] w-full">
                    <h1 class="grid text-2xl place-content-center font-semibold underline underline-offset-8 mb-20">Our Values</h1>
                    <p class="text-center mb-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <hr class="border-1.5 border-black"/>
                    <div class="flex justify-around mt-10">
                        <img class="w-10 h-10" src="/images/sponsor-1.png" alt=""></img>
                        <img class="w-10 h-10" src="/images/sponsor-2.png" alt=""></img>
                        <img class="w-10 h-10" src="/images/sponsor-3.png" alt=""></img>
                        <img class="w-10 h-10" src="/images/sponsor-4.png" alt=""></img>
                    </div>
                </div>
                <div>
                    <img class="w-full pl-10 mt-28" src="/images/aboutUsImage.jpg" alt=""></img>
                </div>
            </div>
      </div>
    )
}

export default AboutUs;