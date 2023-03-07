import emailjs from 'emailjs-com'
import { useState } from 'react';

const ContactPage = () => {
  const [showAlert, setShowAlert] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_eclqt7c', 'Neighbourhood_rw0it3m', e.target, 'soAbfXEvIO-hm50JH')
      .then((result) => {
        setShowAlert(true)
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset();
  };


  return (
    <div className="h-screen bg-zinc-200 flex min-h-screen items-center justify-start">

      <div className="mx-4 sm:mx-auto w-full max-w-screen-md">
        {showAlert &&
          <div>
            <div class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert">
              <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <div>
                <span class="font-medium">Success!</span> We will be in contact shortly
              </div>
            </div>
          </div>
        }
        <div className='p-4'>
        <h1 className="text-gray-800 text-4xl font-medium">Contact us</h1>
        <p className="mt-3"><a className="font-bold" href="mailto:Charlies.Coedmore@gmail.com">Email us </a> or message us here:</p>
        </div>
        <div className='p-4 sm:p-0'>
        <form onSubmit={sendEmail} className="mt-10">
          <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
          <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative z-0">
              <input type="text" name="name" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your name</label>
            </div>
            <div className="relative z-0">
              <input type="text" name="email" className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your email</label>
            </div>
            <div className="relative z-0 col-span-2">
              <textarea name="message" rows="5" className="resize peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" "></textarea>
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your message</label>
            </div>
          </div>
          <h1 className='text-gray-500 text-sm'>Click and drag bottom right cornner to make larger</h1>
          <button type="submit" className="mt-3 rounded-md bg-gray-800 px-10 py-2 text-white shadow-xl hover:bg-gray-600">Send Message</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage