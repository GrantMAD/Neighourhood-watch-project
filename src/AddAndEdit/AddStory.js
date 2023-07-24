import { useState } from "react"
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Toaster, toast } from 'sonner';

const AddStory = () => {
    const [newStoryTitle, setNewStoryTitle] = useState();
    const [newStoryContent, setNewStoryContent] = useState();
    const [storyImageUpload, setStoryImageUpload] = useState();
    const [isAdded, setIsAdded] = useState(false);
    const navigate = useNavigate();

    const usersCollecctionRef2 = collection(db, "storys");

    const addStory = async (e) => {
        e.preventDefault();
        const URL = await uploadStoryImage();
        const timestamp = new Date();
        await addDoc(usersCollecctionRef2, { storyTitle: newStoryTitle, contents: newStoryContent, image: URL, timestamp: timestamp.toISOString(), });
        setIsAdded(!isAdded)
        navigate('/LandingPage')
    }

    const uploadStoryImage = async (e) => {
        if (storyImageUpload == null) return;
        const storyImageRef = ref(storage, `storyImages/${storyImageUpload.name + v4()}`);
        return uploadBytes(storyImageRef, storyImageUpload).then((uploadResult) => {
            return getDownloadURL(uploadResult.ref).then((downloadURL) => {
                return downloadURL
            })
        })
    };

    return (
        <main className="h-screen p-10 bg-zinc-200">
            <h1 className="grid text-gray-800 text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10 mt-16">Add Story</h1>
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">News Story</h3>
                            <p className="mt-1 text-sm text-gray-600">To create news storys add information in inputs</p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#">
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="title"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                autoComplete="title"
                                                placeholder="Story Title"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                onChange={(event) => {
                                                    setNewStoryTitle(event.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <div className="flex">
                                                <div className="xl:w-96">
                                                    <label for="storyDesciption" className="form-label inline-block mb-2 font-medium text-gray-700">Story Description</label>
                                                    <textarea
                                                        type="text"
                                                        className="
                                  form-control
                                  block
                                  w-full
                                  px-3
                                  py-1.5
                                  text-base
                                  font-normal
                                  text-gray-700
                                  bg-white bg-clip-padding
                                  border border-solid border-gray-300
                                  rounded
                                  transition
                                  ease-in-out
                                  m-0
                                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                  resize 
                                  whitespace-pre-wrap
                              "
                                                        id="storyDesciption"
                                                        rows="10"
                                                        placeholder="Story Contents"
                                                        onChange={(event) => {
                                                            setNewStoryContent(event.target.value);
                                                        }}
                                                    ></textarea>
                                                    <h1 className="text-xs">To make the window larger click and drag the bottem right corner</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">
                                                Image Input
                                            </label>
                                            <div className="flex flex-row">
                                                <div className="w-96">
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
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        type="file"
                                                        id="formFileMultiple"
                                                        multiple
                                                        onChange={(event) => {
                                                            setStoryImageUpload(event.target.files[0]);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <h1 className="text-xs">Input image here</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white px-4 py-3 text-right sm:px-6">
                                    <Toaster richColors />
                                    <button
                                        className="mr-5 inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={(e) => {
                                            addStory(e);
                                            toast.success('Story has been added')
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

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>
        </main>
    )
}

export default AddStory
