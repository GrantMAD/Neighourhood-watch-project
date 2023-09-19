
const AddNeighbourhoodRequest = () => {

    return (
        <div className="min-h-screen bg-zinc-200 md:p-10 lg:pt-24 lg:pb-24 lg:px-10">
            <div className="flex justify-center pt-20 md:pt-10">
                <h1 className="text-3xl md:text-4xl text-gray-800 font-semibold underline underline-offset-8 decoration-2 decoration-gray-800">Neighbourhood Request</h1>
            </div>
            <div className="mt-10">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Request</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Here you can request for your neighbourhood to be added to the Sector 2 group. Please fill in all of the input's as all of the information will be required to verify and approve the addtion of your neighbourhood to Sector 2. Once an admin is able to verify all of the information your neighbourhood will be added to the list.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <div className="bg-white">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="number" className="block text-sm font-medium text-gray-700 after:content-none">
                                                    Name
                                                </label>
                                                <input
                                                    type="number"
                                                    name="number"
                                                    id="number"
                                                    autoComplete="number"
                                                    className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-none">
                                                    Neighbourhood Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="NeighbourhoodName"
                                                    id="NeighbourhoodName"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                />
                                                <p className="text-gray-500 text-sm mt-1">Add the Neighbourhood name you would like to add to Sector 2</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddNeighbourhoodRequest;