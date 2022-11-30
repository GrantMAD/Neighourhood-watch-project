import { useEffect } from "react";

const IncidentReportPage = (props) => {
    useEffect(() => {
        if (props.funcNav) {
          props.funcNav(true)
        }
      })
    

    return (
        <main class="flex flex-col bg-zinc-200 min-h-screen">
            <div class="pt-10">
                <h1 class="grid text-4xl place-content-center font-semibold underline underline-offset-8">Incident Report's</h1>
            </div>
            <div class="bg-white p-10 mt-10 ml-[25%] mr-[25%] rounded-lg shadow-xl">
                <div class="flex justify-between">
                    <h1 class="text-2xl mb-6 font-semibold underline underline-offset-8">Title of report</h1>
                    <div class="flex items-end pb-4">
                    <h1 class="font-semibold mr-2">Date of report:</h1>
                    <h1>24/10/12</h1>
                    </div>
                </div>
                <p class="mb-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div class="flex justify-between">
                    <div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Patroller's name:</h1>
                            <h1>Rohan Davidson</h1>
                        </div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Location:</h1>
                            <h1>Ballarat Road</h1>
                        </div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Date of incident:</h1>
                            <h1>23/10/12</h1>
                        </div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Time of incident:</h1>
                            <h1>08:00</h1>
                        </div>
                    </div>
                    <div class="flex items-end">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-xl">
                        Edit
                        </button>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-xl">
                        Delete
                        </button>
                    </div>
                </div>
            </div>
            <div class="bg-white p-10 mt-10 ml-[25%] mr-[25%] rounded-lg shadow-xl">
                <div class="flex justify-between">
                    <h1 class="text-2xl mb-6 font-semibold underline underline-offset-8">Title of report</h1>
                    <div class="flex items-end pb-4">
                    <h1 class="font-semibold mr-2">Date of report:</h1>
                    <h1>24/10/12</h1>
                    </div>
                </div>
                <p class="mb-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div class="flex justify-between">
                    <div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Patroller's name:</h1>
                            <h1>Rohan Davidson</h1>
                        </div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Location:</h1>
                            <h1>Ballarat Road</h1>
                        </div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Date of incident:</h1>
                            <h1>23/10/12</h1>
                        </div>
                        <div class="flex">
                            <h1 class="font-semibold mr-2">Time of incident:</h1>
                            <h1>08:00</h1>
                        </div>
                    </div>
                    <div class="flex items-end">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 shadow-xl">
                        Edit
                        </button>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-xl">
                        Delete
                        </button>
                    </div>
                </div>
            </div>
            
        </main>
    )
}

export default IncidentReportPage;