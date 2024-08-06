import { collection, addDoc, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useState, useEffect } from "react";
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
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState("");
    const [newAlbumName, setNewAlbumName] = useState("");
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
            const albumRef = await addDoc(collection(db, "albums"), {
                name: newAlbumName,
                images: [] // Initialize with an empty array
            });
            toast.success("New album created successfully.");
            setSelectedAlbum(albumRef.id);
            setNewAlbumName("");
            // Refresh the list of albums
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
            console.error("Please select or create an album.");
            return;
        }

        if (imageUploads.length === 0) {
            console.error("Please select at least one image to upload.");
            return;
        }

        if (titles.some(title => title.trim() === "")) {
            console.error("Please provide a title for each image.");
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
                                To create an album add the album's name into the New album input and click Create New Album.
                                To select an album to add image's to select the album in the dropdown and add the image's to the Image input.
                                To upload multiple image's at once, Ctrl + click on the images you want to upload. Inputs will appear for the titles once images have been added to the image input.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form action="#">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white lg:px-4 lg:pt-5 lg:pb-4 sm:p-6">
                                    <div>
                                        <label htmlFor="album" className="block text-sm font-medium text-gray-700 underline mb-3">
                                            Select Album
                                        </label>
                                        <div className="mb-4">
                                            <select
                                                id="album"
                                                name="album"
                                                onChange={(e) => setSelectedAlbum(e.target.value)}
                                                value={selectedAlbum}
                                                className="mt-1 p-2 w-1/3 border rounded-md mb-5"
                                            >
                                                <option value="" disabled>Select an album</option>
                                                {albums.map(album => (
                                                    <option key={album.id} value={album.id}>{album.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <label htmlFor="album" className="block text-sm font-medium text-gray-700 underline mb-3">
                                            New Album
                                        </label>
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                placeholder="New album name"
                                                value={newAlbumName}
                                                onChange={(e) => setNewAlbumName(e.target.value)}
                                                className="mt-1 p-2 w-1/3 border rounded-md mb-5"
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
                                        <div className="flex">
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
                                <div className="bg-white px-4 pb-3 sm:px-6">
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
