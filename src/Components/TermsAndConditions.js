import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const TermsAndConditions = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.funcNav) {
            props.funcNav(false)
        }
    },)

const Return = () => {
    navigate('/SignUpPage');
}

    return (
        <main className="min-h-screen bg-gray-800 bg-opacity-80 text-zinc-200">
            <div className="bg-gray-800 w-11/12 md:w-3/4 lg:w-4/5 xl:w-3/5 2xl:w-2/5 mx-auto rounded shadow-lg z-50 overflow-y-auto relative p-6 border-2 border-zinc-200">
                <div className="text-center mb-10">
                    <h1 className="font-bold text-2xl underline text-blue-600">Neighbourhood Watch App</h1>
                    <h1 className="font-bold text-2xl underline text-blue-600">Terms and Conditions</h1>
                </div>

                <h1 className="font-bold underline text-blue-600">Acceptance of Terms</h1>
                <p className="mb-5">By accessing and using Neighbourhood Watch App services, website, or mobile application (collectively referred to as "the Service"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not use the Service.</p>

                <h1 className="font-bold underline text-blue-600">Intellectual Property Rights</h1>
                <p className="mb-5">All content and materials on the Service, including but not limited to text, graphics, logos, images, and software, are the property of Neighbourhood Watch App and are protected by intellectual property laws. You may not use, reproduce, distribute, or modify any content without the express written consent of Neighbourhood Watch App.</p>

                <h1 className="font-bold underline text-blue-600">User Conduct</h1>
                <h1 className="font-semibold mb-1">You agree not to:</h1>

                <p>a. Use the Service for any unlawful or unauthorized purpose;</p>
                <p>b. Interfere with or disrupt the Service or servers connected to the Service;</p>
                <p>c. Violate any applicable laws or regulations;</p>
                <p>d. Attempt to gain unauthorized access to any portion of the Service.</p>

                <h1 className="font-bold mt-5 underline text-blue-600">Privacy Policy</h1>
                <p className="mb-5">Our Privacy Policy governs the collection, use, and disclosure of personal information submitted through the Service. By using the Service, you consent to the practices described in our Privacy Policy.</p>

                <h1 className="font-bold underline text-blue-600">Disclaimer of Warranties</h1>
                <p className="mb-5">The Service is provided on an "as-is" and "as-available" basis, without warranties of any kind, either expressed or implied, including but not limited to, warranties of merchantability, fitness for a particular purpose, and non-infringement. Neighbourhood Watch App does not warrant that the Service will be error-free or uninterrupted.</p>

                <h1 className="font-bold underline text-blue-600">Limitation of Liability</h1>
                <p className="mb-5">In no event shall Neighbourhood Watch App be liable for any direct, indirect, incidental, special, or consequential damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses arising from the use or inability to use the Service.</p>

                <h1 className="font-bold underline text-blue-600">Indemnification</h1>
                <p className="mb-5">You agree to indemnify and hold harmless Neighbourhood Watch App, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable attorneys' fees and costs, arising out of or in any way connected with your use of the Service.</p>

                <h1 className="font-bold underline text-blue-600">Changes to Terms and Conditions</h1>
                <p className="mb-5">Neighbourhood Watch App reserves the right to modify or update these Terms and Conditions at any time without prior notice. Your continued use of the Service after any such changes shall constitute your consent to such modifications.</p>

                <h1 className="font-bold underline text-blue-600">Governing Law</h1>
                <p className="mb-5">These Terms and Conditions shall be governed by and construed in accordance with the laws of South Africa.</p>

                <h1 className="font-bold underline text-blue-600">Severability</h1>
                <p className="mb-5">If any provision of these Terms and Conditions is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions of these Terms and Conditions shall remain in full force and effect.</p>
            
                <button 
                className="bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-zinc-200 font-bold py-2 px-4 rounded mr-2 float-right hover:scale-105"
                onClick={Return}

                >
                    Return
                </button>
            </div>
        </main>
    )
}

export default TermsAndConditions;