import { useEffect, useState } from "react";
import { collection, query, onSnapshot, doc, getDoc, updateDoc, where, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import SkeletonImage from "../Skeletons/SkeletonImage";
import { faArrowCircleLeft, faArrowCircleRight, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, Toaster } from 'sonner';

const GalleryPage = () => {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState("");
    const [isImageFullscreen, setIsImageFullscreen] = useState(false);
    const [fullscreenImageUrl, setFullscreenImageUrl] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [editedAlbumName, setEditedAlbumName] = useState("");
    const [editedImageTitles, setEditedImageTitles] = useState({});
    const usersCollectionRef = collection(db, "users");
    const pageSize = 12;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const totalImages = selectedAlbum ? selectedAlbum.images.length : 0;
    const currentImages = selectedAlbum ? selectedAlbum.images.slice(startIndex, endIndex) : [];
    const navigate = useNavigate();

    useEffect(() => {
        const albumsCollectionRef = collection(db, "albums");
        onSnapshot(albumsCollectionRef, (snapshot) => {
            const albumsData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                const albumId = doc.id;
                const coverImage = data.images.length > 0
                    ? data.images[0]?.imageUrl
                    : null; // No image for album, use icon
                albumsData.push({ id: albumId, name: data.name, coverImage, userId: data.userId });
            });

            setAlbums(albumsData);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userEmail = currentUser.email;
            const userRef = query(usersCollectionRef, where('email', '==', userEmail));
            const unsubscribe = onSnapshot(userRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    const userData = doc.data();
                    setUserRole(userData.role);
                });
            });

            // Cleanup the listener when the component unmounts
            return () => unsubscribe();
        }
    }, [usersCollectionRef]);

    const handleAlbumClick = async (albumId) => {
        const albumRef = doc(db, "albums", albumId);
        const albumSnap = await getDoc(albumRef);
        if (albumSnap.exists()) {
            const albumData = albumSnap.data();
            setSelectedAlbum({
                ...albumData,
                id: albumId,
            });
            setEditedAlbumName(albumData.name);
            setEditedImageTitles(
                albumData.images.reduce((acc, image) => {
                    acc[image.imageUrl] = image.title || '';
                    return acc;
                }, {})
            );
        }
    };

    const handleBackClick = () => {
        setSelectedAlbum(null);
        setCurrentPage(1);
        setIsEditing(false);
    };

    const handleImageClick = (url) => {
        setIsImageFullscreen(true);
        setFullscreenImageUrl(url);
    };

    const closeFullscreenImage = () => {
        setIsImageFullscreen(false);
        setFullscreenImageUrl("");
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        if (selectedAlbum) {
            const albumRef = doc(db, "albums", selectedAlbum.id);
            await updateDoc(albumRef, {
                name: editedAlbumName,
                images: selectedAlbum.images.map(image => ({
                    ...image,
                    title: editedImageTitles[image.imageUrl] || image.title
                }))
            });
            setIsEditing(false);
        }
    };

    const handleAlbumNameChange = (e) => {
        setEditedAlbumName(e.target.value);
    };

    const handleImageTitleChange = (url, e) => {
        setEditedImageTitles(prevTitles => ({
            ...prevTitles,
            [url]: e.target.value
        }));
    };

    const handleDeleteImage = async (imageUrl) => {
        if (selectedAlbum) {
            try {
                // Create a reference to the file to delete
                const imageRef = ref(storage, imageUrl);

                // Delete the file from Firebase Storage
                await deleteObject(imageRef);

                // Filter out the deleted image from the album's images array
                const updatedImages = selectedAlbum.images.filter(image => image.imageUrl !== imageUrl);

                // Update the album's document in Firestore
                const albumRef = doc(db, "albums", selectedAlbum.id);
                await updateDoc(albumRef, {
                    images: updatedImages
                });

                // Update the state to reflect the changes
                setSelectedAlbum(prevAlbum => ({
                    ...prevAlbum,
                    images: updatedImages
                }));
                setEditedImageTitles(prevTitles => {
                    const newTitles = { ...prevTitles };
                    delete newTitles[imageUrl];
                    return newTitles;
                });
            } catch (error) {
                console.error("Error deleting image: ", error);
                // Optionally, you can add a UI notification here to inform the user of the error
            }
        }
    };

    const handleDeleteAlbum = async () => {
        if (selectedAlbum) {
            try {
                // Loop through all images in the album and delete them from Firebase Storage
                const deletePromises = selectedAlbum.images.map(image => {
                    const imageRef = ref(storage, image.imageUrl);
                    return deleteObject(imageRef);
                });
    
                // Wait for all delete operations to complete
                await Promise.all(deletePromises);
    
                // Delete the album document from Firestore
                const albumRef = doc(db, "albums", selectedAlbum.id);
                await deleteDoc(albumRef);
    
                // Update state to remove the album from the UI
                setAlbums(prevAlbums => prevAlbums.filter(album => album.id !== selectedAlbum.id));
                setSelectedAlbum(null);
                setIsEditing(false);
    
                // Show a success toast notification
                toast.success("Album deleted successfully.");
    
            } catch (error) {
                console.error("Error deleting album: ", error);
                toast.error("Error deleting album.");
            }
        }
    };
    
    

    const renderContent = () => {
        if (isLoading) return <SkeletonImage />;
        if (selectedAlbum) {
            return selectedAlbum.images.length === 0 ? (
                <p className="w-full text-center lg:text-2xl md:text-2xl text-lg font-semibold">
                    No Images in This Album
                </p>
            ) : (
                currentImages.map((image, index) => (
                    <div className="w-full py-2 md:px-10 lg:px-2 lg:w-1/2 xl:w-1/3" key={image.imageUrl + index}>
                        <div className="h-72 rounded-xl shadow-lg shadow-gray-500 hover:scale-105 border-2 border-blue-500 overflow-hidden">
                            <img
                                alt={image.title || 'gallery'}
                                src={image.imageUrl}
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() => handleImageClick(image.imageUrl)}
                            />
                        </div>
                        <div className="flex flex-col items-center mt-2">
                            <p className={`text-center text-xl text-gray-800 font-semibold ${isEditing ? 'underline-none' : 'underline'}`}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedImageTitles[image.imageUrl] || ''}
                                        onChange={(e) => handleImageTitleChange(image.imageUrl, e)}
                                        className="text-xl font-semibold bg-white border-2 border-blue-600 rounded-md outline-none"
                                    />
                                ) : (
                                    image.title
                                )}
                            </p>
                            {isEditing && (
                                <button
                                    className="bg-red-600 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-red-800"
                                    onClick={() => handleDeleteImage(image.imageUrl)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                        {isImageFullscreen && fullscreenImageUrl === image.imageUrl && (
                            <div
                                className="fixed z-50 inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 py-8"
                                onClick={closeFullscreenImage}
                            >
                                <img
                                    alt="fullscreen"
                                    src={fullscreenImageUrl}
                                    className="max-h-full max-w-full border-2 border-white"
                                />
                                <h1 className="text-white mt-1 font-semibold">
                                    Click anywhere outside of the image to minimize
                                </h1>
                            </div>
                        )}
                    </div>
                ))
            );
        } else {
            return albums.length === 0 ? (
                <p className="w-full text-center lg:text-2xl md:text-2xl text-lg font-semibold">
                    No Albums Currently Available
                </p>
            ) : (
                albums.map((album) => (
                    <div className="w-full py-2 md:px-10 lg:px-2 lg:w-1/2 xl:w-1/3" key={album.id} onClick={() => handleAlbumClick(album.id)}>
                        <div className="h-72 rounded-xl shadow-lg shadow-gray-500 border-2 border-blue-500 overflow-hidden cursor-pointer flex items-center justify-center bg-gray-200 hover:scale-105">
                            {album.coverImage ? (
                                <img
                                    alt={album.name}
                                    src={album.coverImage}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faFolder}
                                    size="6x"
                                    className="text-gray-400"
                                />
                            )}
                        </div>
                        <p className="text-center mt-2 text-xl text-gray-800 font-bold underline underline-offset-2">
                            {album.name}
                        </p>
                    </div>
                ))
            );
        }
    };


    return (
        <main className="min-h-screen bg-zinc-200">
            <div className="grid pt-20 md:pt-24 place-content-center mb-3">
                <h1 className="text-2xl md:text-4xl text-gray-800 font-semibold underline underline-offset-8 decoration-2 decoration-gray-800">
                    {selectedAlbum ? (
                        isEditing ? (
                            <input
                                type="text"
                                value={editedAlbumName}
                                onChange={handleAlbumNameChange}
                                className="text-2xl md:text-4xl font-semibold underline underline-offset-8 decoration-2 decoration-gray-800 bg-white border-2 border-blue-600 rounded-md outline-none"
                            />
                        ) : (
                            selectedAlbum.name
                        )
                    ) : 'Gallery'}
                </h1>
            </div>

            <div className="overflow-hidden text-gray-700">
                <div className="container px-4 py-2 mx-auto md:px-6 lg:px-12 xl:px-32 mb-10">
                    <div className="flex lg:justify-between lg:flex-row lg:px-0 md:px-8 flex-col">
                        {selectedAlbum ? (
                            <button
                                className="h-full bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-white font-bold py-2 px-4 rounded mb-5"
                                onClick={handleBackClick}
                            >
                                Back to Albums
                            </button>
                        ) : (
                            <p className="mt-5 mb-5">
                                To view images, click on an album below.
                            </p>
                        )}
                        <div className="flex flex-wrap justify-center lg:justify-end mb-5">
                            {selectedAlbum && userRole === "admin" && selectedAlbum.userId === auth.currentUser?.uid && (
                                <button
                                    className={`h-full hover:scale-105 ${isEditing ? 'bg-green-600' : 'bg-green-600'} hover:${isEditing ? 'bg-green-800' : 'bg-green-800'} text-white font-bold py-2 px-4 rounded shadow-xl`}
                                    onClick={isEditing ? handleSaveClick : handleEditClick}
                                >
                                    {isEditing ? 'Save' : 'Edit'}
                                </button>
                            )}
                            <Toaster richColors />
                            {selectedAlbum && userRole === "admin" && selectedAlbum.userId === auth.currentUser?.uid && (
                                <button
                                    className="h-full bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded shadow-xl ml-2"
                                    onClick={handleDeleteAlbum}
                                >
                                    Delete Album
                                </button>
                            )}
                            {userRole === "admin" && !isEditing && (
                                <button
                                    className="h-full bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 text-white font-bold py-2 px-4 rounded mr-2 mb-2 md:mb-0 md:mr-0 md:ml-2 shadow-xl"
                                    onClick={() => navigate('../AddImage')}
                                >
                                    Add new image
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        {renderContent()}
                    </div>
                    {selectedAlbum && (
                        <div className="max-w-screen-lg mx-auto mt-5">
                            <div className="flex justify-center">
                                {currentPage > 1 && (
                                    <button
                                        className="w-full md:w-auto h-full bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r text-white font-bold py-2 px-4 rounded ml-2 shadow-xl"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        <FontAwesomeIcon icon={faArrowCircleLeft} /> Previous
                                    </button>
                                )}
                                {endIndex < totalImages && (
                                    <button
                                        className="w-full md:w-auto h-full bg-gradient-to-r from-blue-800 to-violet-600 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded ml-2 shadow-xl"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        Next <FontAwesomeIcon icon={faArrowCircleRight} />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default GalleryPage;
