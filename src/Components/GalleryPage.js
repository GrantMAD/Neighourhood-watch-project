import { useEffect, useState } from "react";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { storage, auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import SkeletonImage from "../Skeletons/SkeletonImage";
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GalleryPage = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState('userRole');
    // const [selectedImages, setSelectedImages] = useState([]);
    const [isImageFullscreen, setIsImageFullscreen] = useState(false);
    const [fullscreenImageUrl, setFullscreenImageUrl] = useState("");
    const pageSize = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentImages = imageUrls.slice(startIndex, endIndex);
    const usersCollectionRef = collection(db, "users");
    const navigate = useNavigate();

    useEffect(() => {
        const imageRef = ref(storage, 'galleryImages/');
        listAll(imageRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url])
                    setIsLoading(false);
                })
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem('userRole', userRole);
    }, [userRole]);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userEmail = currentUser.email;
            const userRef = query(usersCollectionRef, where("email", "==", userEmail));
            onSnapshot(userRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    const userData = doc.data();
                    setUserRole(userData.role);
                });
            });
        }
    }, [usersCollectionRef]);

    const addImage = () => {
        navigate('../AddImage')
    }
    // Will reativate delete function in the future
    /*
    const handleDelete = () => {
        selectedImages.forEach((url) => {
            const imageRef = ref(storage, `galleryImages/${url.split('/').pop()}`);
            deleteObject(imageRef)
                .then(() => {
                    setImageUrls((prev) => prev.filter((imageUrl) => imageUrl !== url));
                    setSelectedImages((prev) => prev.filter((selectedUrl) => selectedUrl !== url));
                })
                .catch((error) => {
                    if (error.code === 'storage/object-not-found') {
                        console.log(`File ${url} not found in Firebase Storage`);
                        setImageUrls((prev) => prev.filter((imageUrl) => imageUrl !== url));
                        setSelectedImages((prev) => prev.filter((selectedUrl) => selectedUrl !== url));
                    } else {
                        console.log(error);
                    }
                });
        });
    };
    */
    const handleImageClick = (url) => {
        setIsImageFullscreen(true);
        setFullscreenImageUrl(url);
    };

    const closeFullscreenImage = () => {
        setIsImageFullscreen(false);
        setFullscreenImageUrl("");
    };

    return (
        <main className="min-h-screen bg-zinc-200">
            <div className="grid pt-20 md:pt-24 place-content-center mb-3">
                <h1 className="text-2xl md:text-4xl text-gray-800 font-semibold underline underline-offset-8 decoration-2 decoration-blue-700">Gallery</h1>
            </div>

            <div className="overflow-hidden text-gray-700">
                <div className="container px-4 py-2 mx-auto md:px-6 lg:px-12 xl:px-32 mb-10">
                    {/*
                    <button className="h-full bg-red-500 text-white font-bold py-2 px-4 rounded ml-2 mr-2 md:mr-0 shadow-xl hover:scale-125" onClick={handleDelete} disabled={!selectedImages.length}>
                                Delete
                            </button>
                    */}
                    <div className="flex justify-between">
                        <p className="mt-5 mb-5">The images displayed here are all from past events that have happened. All images are posted by admins only. To enlarge an image, hover over it.{/*{userRole === "admin" && (
                        <p className="font-semibold">To delete an image select the image/images and click the delete button</p>
                    )}*/}</p>
                        {userRole === "admin" && (
                            <div className="flex flex-wrap justify-center md:justify-end mb-5">
                                <button className="h-full bg-gradient-to-l from-blue-800 to-violet-600 hover:bg-gradient-to-r hover:scale-105 text-white font-bold py-2 px-4 rounded mr-2 mb-2 md:mb-0 md:mr-0 md:ml-2 shadow-xl" onClick={addImage}>
                                    Add new image
                                </button>

                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap -m-1 md:-m-2">
                        {isLoading ? (
                            <SkeletonImage />
                        ) : (
                            currentImages.map((url, index) => {
                                return (
                                    <div className="w-full py-2 md:px-10 lg:px-2 lg:w-1/2 xl:w-1/3" key={url + index}>
                                        <div className="h-72 rounded-xl shadow-lg shadow-gray-500 hover:scale-150 border-2 overflow-hidden">
                                            <img
                                                alt="gallery"
                                                src={url}
                                                className={`w-full h-full object-cover md:mr-[5%] md:ml-[5%]"
                                                    }`}
                                                // ${selectedImages.includes(url) ? "opacity-25 border-red-500" : "border-gray-800
                                                onClick={() => {
                                                    /*
                                                    if (selectedImages.includes(url)) {
                                                        setSelectedImages(selectedImages.filter((selectedUrl) => selectedUrl !== url));
                                                    } else {
                                                        setSelectedImages([...selectedImages, url]);
                                                    }
                                                    */
                                                    handleImageClick(url);
                                                }}
                                            />
                                        </div>
                                        {isImageFullscreen && fullscreenImageUrl === url && ( // Show fullscreen image
                                            <div className="fixed z-50 inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 py-8" onClick={closeFullscreenImage}>
                                                <img
                                                    alt="fullscreen"
                                                    src={url}
                                                    className="max-h-full max-w-full border-2 border-white"
                                                />
                                                <h1 className="text-white mt-1 font-semibold">Click anywhere outside of image to minimise</h1>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
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
                            {endIndex < imageUrls.length && ( 
                                <button
                                    className="w-full md:w-auto h-full bg-gradient-to-r from-blue-800 to-violet-600 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded ml-2 shadow-xl"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next <FontAwesomeIcon icon={faArrowCircleRight} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );

}

export default GalleryPage;