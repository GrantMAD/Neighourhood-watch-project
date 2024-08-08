import { collection, addDoc, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useState, useEffect } from "react";
import { storage, db, auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Toaster, toast } from 'sonner';

const AddImage = () => {
    const [imageUploads, setImageUploads] = useState([]);
    const [titles, setTitles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isAdded, setIsAdded] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState("");
    const [newAlbumName, setNewAlbumName] = useState("");
    const [showNewAlbumSection, setShowNewAlbumSection] = useState(true);
    const [showImageInput, setShowImageInput] = useState(false); // New state variable
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlbums = async () => {
            const albumsCollection = collection(db, "albums");
            const albumsSnapshot = await getDocs(albumsCollection);
            const albumsList = albumsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAlbums(albumsList);
        };

        fetchAlbums();
    }, []);

    const createNewAlbum = async () => {
        if (newAlbumName.trim() === "") {
            toast.error("Please provide a name for the new album.");
            return;
        }

        try {
            const userUid = auth.currentUser.uid;
            const albumRef = await addDoc(collection(db, "albums"), {
                name: newAlbumName,
                images: [],
                userId: userUid
            });

            toast.success("New album created successfully.");
            setSelectedAlbum(albumRef.id);
            setNewAlbumName("");
            setShowNewAlbumSection(false);
            setShowImageInput(true); // Show image input when a new album is created
            const albumsCollection = collection(db, "albums");
            const albumsSnapshot = await getDocs(albumsCollection);
            const albumsList = albumsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAlbums(albumsList);
        } catch (error) {
            console.error("Error creating album: ", error);
            toast.error("Error creating album.");
        }
    };

    const uploadImages = async (e) => {
        e.preventDefault();

        if (!selectedAlbum) {
            toast.error("Please select or create an album.");
            return;
        }

        if (imageUploads.length === 0) {
            toast.error("Please select at least one image to upload.");
            return;
        }

        if (titles.some(title => title.trim() === "")) {
            toast.error("Please provide a title for each image.");
            return;
        }

        const promises = [];
        const imagesData = [];

        imageUploads.forEach((imageUpload, index) => {
            const imageRef = ref(storage, `galleryImages/${imageUpload.name + v4()}`);
            promises.push(uploadBytes(imageRef, imageUpload).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            }).then((url) => {
                const imageTitle = titles[index] || "-";
                imagesData.push({ imageUrl: url, title: imageTitle });
            }));
        });

        Promise.all(promises)
            .then(async () => {
                const albumDocRef = doc(db, "albums", selectedAlbum);
                await updateDoc(albumDocRef, {
                    images: arrayUnion(...imagesData)
                });

                toast.success("Images uploaded successfully.");
                setIsAdded(!isAdded);
                navigate('/GalleryPage');
            })
            .catch((error) => {
                console.error("Error uploading images: ", error);
                toast.error("Error uploading images.");
            });
    };

    const handleTitleChange = (e, index) => {
        const newTitles = [...titles];
        newTitles[index] = e.target.value;
        setTitles(newTitles);
    };

    const handleAlbumChange = (e) => {
        setSelectedAlbum(e.target.value);
        if (e.target.value) {
            setShowNewAlbumSection(false);
            setShowImageInput(true); // Show image input when an album is selected
        } else {
            setShowNewAlbumSection(true);
            setShowImageInput(false); // Hide image input if no album is selected
        }
    };

    const handleShowNewAlbumSection = () => {
        setShowNewAlbumSection(true);
        setSelectedAlbum("");
        setShowImageInput(false); // Hide image input when creating a new album
    };

    useEffect(() => {
        const newPreviewUrls = [];
        imageUploads.forEach(image => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviewUrls.push(reader.result);
                if (newPreviewUrls.length === imageUploads.length) {
                    setPreviewUrls(newPreviewUrls);
                }
            };
            reader.readAsDataURL(image);
        });
    }, [imageUploads]);

    const imageInputClass = selectedAlbum
        ? "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-blue-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        : "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

    return (
        <main className="min-h-screen p-10 bg-zinc-200">
            <h1 className="grid text-gray-800 text-4xl place-content-center font-semibold underline underline-offset-8 decoration-1 mb-10 mt-16">Add Image</h1>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 underline underline-offset-8">Add Image's to Gallery</h3>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white lg:px-4 lg:pt-5 lg:pb-4 sm:p-6">
                                    <div>
                                        <label htmlFor="album" className="block text-md font-medium text-gray-700 underline mb-3">
                                            Select Album
                                        </label>
                                        <div className="mb-3">
                                            {selectedAlbum ? (
                                                <>
                                                    To select an album to add images to, select the album in the dropdown and add the images to the Image Input.
                                                    <br/>
                                                    To add a new album click on the <span className="font-bold">New Album</span> button.
                                                </>
                                            ) : (
                                                "To select an album to add images to, select the album in the dropdown and add the images to the Image Input."
                                            )}
                                        </div>
                                        <div className="mb-4 flex items-center">
                                            <select
                                                id="album"
                                                name="album"
                                                onChange={handleAlbumChange}
                                                value={selectedAlbum}
                                                className="mt-1 p-2 w-1/3 border rounded-md mb-5"
                                            >
                                                <option value="" disabled>Select an album</option>
                                                {albums.map(album => (
                                                    <option key={album.id} value={album.id}>{album.name}</option>
                                                ))}
                                            </select>
                                            {!showNewAlbumSection && (
                                                <button
                                                    type="button"
                                                    onClick={handleShowNewAlbumSection}
                                                    className="ml-4 mb-4 inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 py-2 px-4 text-md font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    New Album
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {showNewAlbumSection && (
                                        <div>
                                            <label htmlFor="new-album" className="block text-md font-medium text-gray-700 underline mb-3">
                                                New Album
                                            </label>
                                            <div className="mb-3">
                                                <p className="mb-3">To create an album, enter the album's name into the New Album input and click Create New Album.</p>
                                            </div>
                                            <div className="mb-4">
                                                <input
                                                    type="text"
                                                    placeholder="New album name"
                                                    value={newAlbumName}
                                                    onChange={(e) => setNewAlbumName(e.target.value)}
                                                    className="mt-1 p-2 w-1/3 border rounded-md mb-3"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <button
                                                    type="button"
                                                    onClick={createNewAlbum}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Create New Album
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {showImageInput && (
                                        <>
                                            {imageUploads.length > 0 && (
                                                <label className="block text-md font-medium text-gray-700 underline mb-3">
                                                    Image Title
                                                </label>
                                            )}
                                            {imageUploads.map((_, index) => (
                                                <div key={index} className="flex items-center mb-4">
                                                    <div className="w-12 h-12 mr-4">
                                                        {previewUrls[index] && (
                                                            <img
                                                                src={previewUrls[index]}
                                                                alt={`Preview ${index}`}
                                                                className="w-full h-full object-cover rounded-md"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            id={`title-${index}`}
                                                            name={`title-${index}`}
                                                            onChange={(e) => handleTitleChange(e, index)}
                                                            value={titles[index] || ""}
                                                            className="mt-1 p-2 border rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <div>
                                                <label htmlFor="about" className="block text-md font-medium text-gray-700 underline mb-3">
                                                    Image Input
                                                </label>
                                                <div className="mb-3">
                                                    <p className="mb-3">To upload multiple image's at once, Ctrl + click on the image's you want to upload. Inputs will appear for the titles once images have been added to the image input.</p>
                                                </div>
                                                <div className="flex">
                                                    <div className="mb-3 w-96">
                                                        <input
                                                            className={imageInputClass}
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
                                                <div className="bg-white pb-3 mt-4">
                                                    <Toaster richColors />
                                                    <button
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        onClick={(e) => {
                                                            uploadImages(e);
                                                            toast.success('Images are being added, please wait while uploading.');
                                                        }}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
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
