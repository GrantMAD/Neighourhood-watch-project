
const LandingPage = () => {

    return (
      <main className="pt-10 pb-10 pr-60 pl-60 bg-zinc-200">
        <img 
          alt="" 
          src="/images/Seaview.PNG"
          className="w-screen shadow-xl shadow-gray-500 rounded-md"
          />
        <div className="mt-10 p-5 bg-gray-800 text-white rounded-md">
          <h1 className="text-5xl mb-3 font-semibold">WELCOME</h1>
          <hr></hr>
          <div className="flex flex-row">
            <div>
            <p className="mt-3 mb-3">Alpha's - Coedmore Sector 2 CPF Neighbourhood Watch is voluntary group of men & woman who work in conjunction with the SAPS in the eradication of crime. 
              Our neighbourhood Watch is about people getting together with their neighbours to take action to reduce crime.
              The community initiatives are owned and run by our members which are supported by the police.
              We work by developing a close relationship between community members and the local police.
            </p>
            <h1 className="text-lg font-semibold underline">How to join a Watch scheme</h1>
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
        <div className="mt-10 p-5 bg-gray-800 text-white rounded-md">
          <h1 className="text-5xl mb-3 font-semibold">NEWS</h1>
          <hr></hr>
          <div className="mt-5">
            <h1 className="text-3xl underline">Title</h1>
            <div className="flex flex-row">
              <p className="mt-5 mr-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
                printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
                printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <img 
                className="h-1/4 w-1/4 mt-5 rounded-md" 
                alt="" 
                src="/images/aboutUsImage.jpg"
              />
            </div>
          </div>
            <hr className="mt-10"></hr>
          <div className="mt-5">
            <h1 className="text-3xl underline">Title</h1>
            <div className="flex flex-row">
              <p className="mt-5 mr-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
                printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown 
                printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <img 
                className="h-1/4 w-1/4 mt-5 rounded-md" 
                alt="" 
                src="/images/aboutUsImage.jpg"
              />
            </div>
          </div>
        </div>
    
       </main>
    )
}

export default LandingPage;