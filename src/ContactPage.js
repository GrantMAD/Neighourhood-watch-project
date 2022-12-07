import emailjs from 'emailjs-com'

const ContactPage = () => {

  const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_eclqt7c', 'Neighbourhood_rw0it3m', e.target, 'soAbfXEvIO-hm50JH')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
  };

  
    return (
      <div className="h-screen bg-zinc-200 flex min-h-screen items-center justify-start">
        <div className="mx-auto w-full max-w-lg">
          <h1 className="text-4xl font-medium">Contact us</h1>
          <p className="mt-3"><a className="font-bold" href="mailto:Charlies.Coedmore@gmail.com">Email us </a> or message us here:</p>

          <form onSubmit={sendEmail} className="mt-10">
            <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" /> 
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative z-0">
                <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your name</label>
              </div>
              <div className="relative z-0">
                <input type="text" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your email</label>
              </div>
              <div className="relative z-0 col-span-2">
                <textarea name="message" rows="5" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" "></textarea>
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your message</label>
              </div>
            </div>
            <button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white shadow-xl">Send Message</button>
          </form>
        </div>
      </div>
    )
}

export default ContactPage