
import { Toaster, toast } from 'sonner';
import { useState } from 'react';
import { db } from "../firebase";
import { doc, setDoc } from 'firebase/firestore';

const SectorContent = () => {
    const [welcomeText, setWelcomeText] = useState('');
    const [howToJoinText, setHowToJoinText] = useState('');

    const saveSectorData = async () => {
        try {
            // Assuming you have a 'sectorData' collection
            const sectorDataRef = doc(db, 'sectorData', 'uniqueDocId');
            await setDoc(sectorDataRef, {
                welcomeText: welcomeText,
                howToJoinText: howToJoinText
            });

            toast.success('Sector data saved successfully.');
        } catch (error) {
            console.error('Error saving sector data:', error);
            toast.error('An error occurred while saving sector data.');
        }
    };

    return (
        <main className="min-h-screen p-4 md:p-8 lg:p-10  mx-auto bg-zinc-200">
            <div>
                <h1 className="grid text-4xl place-content-center font-semibold underline underline-offset-8 decoration-2 decoration-blue-700 mb-10 mt-8 pt-10">Sector Data</h1>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Landing Page</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                This information will be displayed on the landing page in the welcome section.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700 after:content-none">
                                            Welcome Paragraph
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                type="text"
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                placeholder="About your sector"
                                                value={welcomeText}
                                                onChange={(e) => setWelcomeText(e.target.value)}

                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description of your sector.
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700 after:content-none">
                                            How to join
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                type="text"
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                placeholder="How community members can join"
                                                value={howToJoinText}
                                                onChange={(e) => setHowToJoinText(e.target.value)}

                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description on how to join your sector.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <Toaster richColors />
                                    <button
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            saveSectorData();
                                            toast.success('Profile Updating, Please wait.');
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-5 md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">About Us</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                This information will be displayed on the About Us component.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700 after:content-none">
                                            Our Vision
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                type="text"
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                placeholder="About your sectors vision"
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description of your sector's vision.
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700 after:content-none">
                                            Our Mission
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                type="text"
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                placeholder="About your sectors mission"


                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description on your sector's mission.
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700 after:content-none">
                                            Our Values
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                type="text"
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                placeholder="About your sectors values"


                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description on your sector's values.
                                        </p>
                                    </div>
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700 after:content-none">
                                            Our Objectives
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                type="text"
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"
                                                placeholder="About your sectors objectives"


                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Brief description on your sector's objectives.
                                        </p>
                                    </div>
                                    <div>
                                        <div className='flex justify-between mb-3'>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 after:content-none underline">Sector Admin's Image</label>
                                                <div className="mt-1 flex items-center">
                                                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 mt-5">
                                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    </span>
                                                    <div className="mb-3 ml-5 w-96 text-center">
                                                        <label for="formFileMultiple" class="form-label inline-block mb-2 text-gray-700 underline underline-offset-2 after:content-none">Input Image here</label>
                                                        <input
                                                            className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-500
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                            type="file"
                                                            id="formFileMultiple"
                                                            multiple

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-5 sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-none underline">
                                                        Name
                                                    </label>
                                                    <input

                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"


                                                    />
                                                </div>
                                                <div className="col-span-5 sm:col-span-3 mt-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-none underline">
                                                        Position
                                                    </label>
                                                    <input

                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"


                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 after:content-none underline">Sector Admin's Image</label>
                                                <div className="mt-1 flex items-center">
                                                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 mt-5">
                                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    </span>
                                                    <div className="mb-3 ml-5 w-96 text-center">
                                                        <label for="formFileMultiple" class="form-label inline-block mb-2 text-gray-700 underline underline-offset-2 after:content-none">Input Image here</label>
                                                        <input
                                                            className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-500
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                            type="file"
                                                            id="formFileMultiple"
                                                            multiple

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-5 sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-none underline">
                                                        Name
                                                    </label>
                                                    <input

                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"


                                                    />
                                                </div>
                                                <div className="col-span-5 sm:col-span-3 mt-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-none underline">
                                                        Position
                                                    </label>
                                                    <input

                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"


                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 after:content-none underline">Sector Admin's Image</label>
                                                <div className="mt-1 flex items-center">
                                                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 mt-5">
                                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    </span>
                                                    <div className="mb-3 ml-5 w-96 text-center">
                                                        <label for="formFileMultiple" class="form-label inline-block mb-2 text-gray-700 underline underline-offset-2 after:content-none">Input Image here</label>
                                                        <input
                                                            className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-500
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                            type="file"
                                                            id="formFileMultiple"
                                                            multiple

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-5 sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-none underline">
                                                        Name
                                                    </label>
                                                    <input

                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"


                                                    />
                                                </div>
                                                <div className="col-span-5 sm:col-span-3 mt-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-none underline">
                                                        Position
                                                    </label>
                                                    <input

                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"


                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 after:content-none underline">Sector Admin's Image</label>
                                                <div className="mt-1 flex items-center">
                                                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 mt-5">
                                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg>
                                                    </span>
                                                    <div className="mb-3 ml-5 w-96 text-center">
                                                        <label for="formFileMultiple" class="form-label inline-block mb-2 text-gray-700 underline underline-offset-2 after:content-none">Input Image here</label>
                                                        <input
                                                            className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-500
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                            type="file"
                                                            id="formFileMultiple"
                                                            multiple

                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-5 sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-none underline">
                                                        Name
                                                    </label>
                                                    <input

                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"


                                                    />
                                                </div>
                                                <div className="col-span-5 sm:col-span-3 mt-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 after:content-none underline">
                                                        Position
                                                    </label>
                                                    <input

                                                        type="text"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm"


                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <Toaster richColors />
                                    <button
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={(e) => {
                                            e.preventDefault();

                                            toast.success('Profile Updating, Please wait.');
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-5 md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Sector Logo</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                This logo will be displayed on the Landing and About Us components.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 after:content-none">Sector logo</label>
                                        <div className="mt-1 flex items-center">
                                            <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100 mt-5">
                                                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </span>
                                            <div className="mb-3 ml-5 w-96 text-center">
                                                <label for="formFileMultiple" class="form-label inline-block mb-2 text-gray-700 underline underline-offset-2 after:content-none">Input Image here</label>
                                                <input
                                                    className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-500
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    type="file"
                                                    id="formFileMultiple"
                                                    multiple

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <Toaster richColors />
                                    <button
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={(e) => {
                                            e.preventDefault();

                                            toast.success('Profile Updating, Please wait.');
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default SectorContent;