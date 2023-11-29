import { collection, addDoc } from "firebase/firestore";
import { useState } from "react"
import { storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Toaster, toast } from 'sonner';

const AddImage = () => {
    const [imageUploads, setImageUploads] = useState([]);
    const [titles, setTitles] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const navigate = useNavigate();

    const uploadImages = (e) => {
        e.preventDefault();

        // Validate images
        if (imageUploads.length === 0) {
            console.error("Please select at least one image to upload.");
            return;
        }

        // Validate titles
        if (titles.some(title => title.trim() === "")) {
            console.error("Please provide a title for each image.");
            return;
        }

        const promises = [];
        const imagesData = [];

        imageUploads.forEach((imageUpload, index) => {
            const imageRef = ref(storage, `galleryImages/${imageUpload.name + v4()}`);
            promises.push(uploadBytes(imageRef, imageUpload).then((snapshot) => {
                // Get the download URL
                return getDownloadURL(snapshot.ref);
            }).then((url) => {
                // Save image URL and title to Firestore
                const imageTitle = titles[index] || "-";
                imagesData.push({ imageUrl: url, title: imageTitle });
            }));
        });

        Promise.all(promises)
            .then(() => {
                // Save imagesData to Firestore collection
                const imagesCollectionRef = collection(db, "images");
                imagesData.forEach((data) => {
                    addDoc(imagesCollectionRef, data);
                });

                setIsAdded(!isAdded);
                navigate('/GalleryPage');
            })
            .catch((error) => {
                console.error("Error uploading images: ", error);
            });
    };

    const handleTitleChange = (e, index) => {
        const newTitles = [...titles];
        newTitles[index] = e.target.value;
        setTitles(newTitles);
    };


    return (
        <main className="min-h-screen p-10 bg-zinc-200">
            <h1 className="grid text-gray-800 text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10 mt-16">Add Image</h1>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Add Images to Gallery</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                To upload multiple images at once, Ctrl + click on the images you want to upload. An input/inputs will appear for the title/titles once images have been added to the image input.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <div>
                                        {imageUploads.map((_, index) => (
                                            <div key={index}>
                                                <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700 underline mb-3">
                                                    Image Title
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`title-${index}`}
                                                    name={`title-${index}`}
                                                    onChange={(e) => handleTitleChange(e, index)}
                                                    value={titles[index] || ""}
                                                    className="mt-1 p-2 w-1/3 border rounded-md mb-5"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700 underline mb-3">
                                            Image Input
                                        </label>
                                        <div className="flex justify-center">
                                            <div className="mb-3 w-96">
                                                <input
                                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    type="file"
                                                    id="formFileMultiple"
                                                    multiple
                                                    onChange={(event) => {
                                                        const files = event.target.files;
                                                        const newImageUploads = [];
                                                        for (let i = 0; i < files.length; i++) {
                                                            newImageUploads.push(files[i]);
                                                        }
                                                        setImageUploads(newImageUploads);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white px-4 py-3 text-right sm:px-6">
                                    <Toaster richColors />
                                    <button
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={(e) => {
                                            uploadImages(e);
                                            toast.success('Images have been added, please wait.');
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
    );
};

export default AddImage;
